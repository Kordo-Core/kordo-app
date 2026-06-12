import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { theme } from 'kordo-ui';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue, withTiming, SharedValue } from 'react-native-reanimated';
import { BlocRow, RowStatus } from '../../utils/BlocRow.types';
import { UseBlocSwipeParams, UseBlocSwipeReturn } from './useBlocSwipe.types';

const SNAP_DURATION = 180; // durée des snaps (timing, sans rebond)
const COMMIT_OUT = 320; // bandeau qui prend tout l'écran
const COMMIT_BACK = 380; // puis retour à 0 avant validation
const OPEN_TRIGGER = 56; // au-delà : la ligne reste ouverte (bouton révélé)
const OPEN_SNAP = 88; // largeur d'ouverture au repos
const COMMIT_RATIO = 0.5; // au-delà de 50% de l'écran : validation/annulation directe

type RowLayout = { y: number; h: number; id: string };
type ReleaseKind = 'commit' | 'open' | 'close';

// Machine à états du swipe des lignes de blocs.
// Pendant le drag, la ligne sous le doigt suit `activeDragX` (valeur unique, perf). Au
// relâchement on passe le relais à l'offset PROPRE de la ligne (via le registre) : chaque
// ligne anime sa propre valeur, donc plusieurs animations tournent en parallèle sans
// s'annuler. `restOffsets` garde la position de repos (persistance + tap).
export function useBlocSwipe({
  blocsData,
  scrollY,
  geometry,
  innerScroll,
  screenWidth,
  onSelect,
}: UseBlocSwipeParams): UseBlocSwipeReturn {
  const { shadowGap, cardRest, cardDock, headerHeight } = geometry;

  const [statuses, setStatuses] = useState<Record<string, RowStatus>>({});

  const activeId = useSharedValue(''); // id de la ligne en cours de drag ('' = aucune)
  const activeDragX = useSharedValue(0);
  const restOffsets = useSharedValue<Record<string, number>>({}); // offsets au repos (worklets)
  const pendingId = useSharedValue(''); // ligne sous le doigt (entre onBegin et onStart)
  const startX = useSharedValue(0); // translation à l'activation (origine = 0)
  const baseX = useSharedValue(0); // offset de départ (re-grab depuis la position ouverte)

  // Miroir JS des offsets au repos : sert à initialiser l'offset d'une ligne au montage SANS
  // lire la shared value pendant le render (interdit par Reanimated en strict mode).
  const restOffsetsRef = useRef<Record<string, number>>({});
  const setRest = useCallback(
    (id: string, val: number) => {
      restOffsetsRef.current = { ...restOffsetsRef.current, [id]: val };
      restOffsets.value = restOffsetsRef.current;
    },
    [restOffsets],
  );
  const getInitialOffset = useCallback((id: string) => restOffsetsRef.current[id] ?? 0, []);

  // Registre des shared values d'offset de chaque ligne (pour animer la bonne ligne depuis le JS)
  const registry = useRef(new Map<string, SharedValue<number>>());
  const register = useCallback((id: string, sv: SharedValue<number>) => {
    registry.current.set(id, sv);
  }, []);
  const unregister = useCallback((id: string) => {
    registry.current.delete(id);
  }, []);

  // Offset Y de chaque ligne dans le contenu de la FlatList (+ son id de bloc), pour retrouver
  // la ligne sous le doigt. Le `y` d'onLayout d'une cellule étant relatif à la cellule (≈ 0),
  // on cumule les hauteurs de toutes les lignes (en-têtes compris).
  const rowLayouts = useSharedValue<Record<number, RowLayout>>({});
  const rowHeights = useRef<Record<string, number>>({});
  const blocsDataRef = useRef<BlocRow[]>(blocsData);
  blocsDataRef.current = blocsData;

  const recomputeOffsets = useCallback(() => {
    let acc = theme.spacing.lg; // paddingTop du contentContainer
    const offsets: Record<number, RowLayout> = {};
    const data = blocsDataRef.current;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const h = rowHeights.current[row.key] ?? 0;
      offsets[i] = { y: acc, h, id: row.type === 'bloc' ? row.detail.bloc.id : '' };
      acc += h;
    }
    rowLayouts.value = offsets;
  }, [rowLayouts]);

  const onRowLayout = useCallback(
    (key: string, height: number) => {
      if (rowHeights.current[key] === height) return;
      rowHeights.current[key] = height;
      recomputeOffsets();
    },
    [recomputeOffsets],
  );

  // Recalcule les offsets quand la liste change (filtre secteur), sans effacer les hauteurs
  useEffect(() => {
    recomputeOffsets();
  }, [blocsData, recomputeOffsets]);

  // Anime l'offset PROPRE de la ligne (indépendant des autres lignes en cours d'animation)
  const animateRow = useCallback(
    (id: string, kind: ReleaseKind, dir: number, fromX: number) => {
      const sv = registry.current.get(id);
      if (!sv) return;
      sv.value = fromX;
      if (kind === 'open') {
        setRest(id, dir * OPEN_SNAP);
        sv.value = withTiming(dir * OPEN_SNAP, { duration: SNAP_DURATION });
      } else if (kind === 'close') {
        setRest(id, 0);
        sv.value = withTiming(0, { duration: SNAP_DURATION });
      } else {
        // commit : statut appliqué tout de suite (robuste si la ligne se démonte), puis
        // bandeau plein écran → retour à 0
        setRest(id, 0);
        setStatuses((prev) => ({ ...prev, [id]: dir > 0 ? 'validated' : 'unvalidated' }));
        sv.value = withTiming(dir * screenWidth, { duration: COMMIT_OUT }, (f) => {
          'worklet';
          if (f) sv.value = withTiming(0, { duration: COMMIT_BACK });
        });
      }
    },
    [setRest, screenWidth],
  );

  // Fin de drag : bascule la ligne sur son offset propre (= position courante) puis anime
  const release = useCallback(
    (id: string, fromX: number, kind: ReleaseKind, dir: number) => {
      const sv = registry.current.get(id);
      if (sv) sv.value = fromX; // offset = position courante AVANT de couper le live (pas de saut)
      if (activeId.value === id) activeId.value = '';
      animateRow(id, kind, dir, fromX);
    },
    [activeId, animateRow],
  );

  // Tap sur une ligne ouverte = validation/annulation directe (sur l'offset propre)
  const commitFromTap = useCallback(
    (id: string, dir: number) => {
      animateRow(id, 'commit', dir, restOffsets.value[id] ?? dir * OPEN_SNAP);
    },
    [animateRow, restOffsets],
  );

  const swipePan = useMemo(
    () =>
      Gesture.Pan()
        // N'active QUE l'horizontal franc ; échoue dès que le mouvement part en vertical
        // → le scroll natif du ghost reprend la main (pas de conflit).
        .activeOffsetX([-16, 16])
        .failOffsetY([-12, 12])
        .onBegin((e) => {
          const sY = scrollY.value;
          const cardTranslate = Math.max(shadowGap, cardRest - sY);
          const innerOffset = Math.min(Math.max(sY - cardDock, 0), innerScroll);
          const yInContent = e.y - headerHeight - cardTranslate + innerOffset;
          let foundId = '';
          const layouts = rowLayouts.value;
          const keys = Object.keys(layouts);
          for (let i = 0; i < keys.length; i++) {
            const l = layouts[Number(keys[i])];
            if (l && l.id !== '' && yInContent >= l.y && yInContent <= l.y + l.h) {
              foundId = l.id;
              break;
            }
          }
          pendingId.value = foundId;
        })
        // À l'activation : on prend la main sur la ligne, départ depuis sa position de repos
        .onStart((e) => {
          const id = pendingId.value;
          if (id === '') return;
          startX.value = e.translationX;
          const from = restOffsets.value[id] ?? 0;
          baseX.value = from;
          activeDragX.value = from; // évite un saut au 1er frame avant onUpdate
          activeId.value = id;
        })
        .onUpdate((e) => {
          if (activeId.value === '') return;
          const dx = baseX.value + (e.translationX - startX.value);
          activeDragX.value = Math.max(-screenWidth, Math.min(screenWidth, dx));
        })
        .onEnd(() => {
          const id = activeId.value;
          if (id === '') return;
          const x = activeDragX.value;
          const dir = x > 0 ? 1 : -1;
          const commitX = screenWidth * COMMIT_RATIO;
          let kind: ReleaseKind = 'close';
          if (Math.abs(x) > commitX) kind = 'commit';
          else if (Math.abs(x) > OPEN_TRIGGER) kind = 'open';
          runOnJS(release)(id, x, kind, dir);
        }),
    [
      scrollY,
      shadowGap,
      cardRest,
      cardDock,
      innerScroll,
      headerHeight,
      screenWidth,
      rowLayouts,
      pendingId,
      activeId,
      activeDragX,
      restOffsets,
      startX,
      baseX,
      release,
    ],
  );

  // Tap sur une ligne OUVERTE = valider/annuler (la CardFrame est en pointerEvents none,
  // donc le tap doit passer par le ghost ; le côté est déduit du signe de restOffsets).
  const blocTap = useMemo(
    () =>
      Gesture.Tap().onEnd((e) => {
        const sY = scrollY.value;
        const cardTranslate = Math.max(shadowGap, cardRest - sY);
        const innerOffset = Math.min(Math.max(sY - cardDock, 0), innerScroll);
        const yInContent = e.y - headerHeight - cardTranslate + innerOffset;
        const layouts = rowLayouts.value;
        const keys = Object.keys(layouts);
        for (let i = 0; i < keys.length; i++) {
          const l = layouts[Number(keys[i])];
          if (l && l.id !== '' && yInContent >= l.y && yInContent <= l.y + l.h) {
            const off = restOffsets.value[l.id] ?? 0;
            // Ligne ouverte → valide/annule ; ligne fermée → sélectionne le bloc
            if (off > 0) runOnJS(commitFromTap)(l.id, 1);
            else if (off < 0) runOnJS(commitFromTap)(l.id, -1);
            else runOnJS(onSelect)(l.id);
            break;
          }
        }
      }),
    [
      scrollY,
      shadowGap,
      cardRest,
      cardDock,
      innerScroll,
      headerHeight,
      rowLayouts,
      restOffsets,
      commitFromTap,
      onSelect,
    ],
  );

  // Tap prioritaire seulement s'il n'y a pas de drag (le pan gagne au moindre mouvement)
  const gesture = useMemo(() => Gesture.Exclusive(swipePan, blocTap), [swipePan, blocTap]);

  return {
    gesture,
    statuses,
    onRowLayout,
    getInitialOffset,
    activeId,
    activeDragX,
    register,
    unregister,
  };
}
