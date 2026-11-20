import { useCallback, useMemo, useRef, useState } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue, withTiming, SharedValue } from 'react-native-reanimated';
import { RowStatus } from '../../utils/BlocRow.types';
import { UseBlocSwipeParams, UseBlocSwipeReturn } from './useBlocSwipe.types';

const SNAP_DURATION = 180; // durée des snaps (timing, sans rebond)
const COMMIT_OUT = 320; // bandeau qui prend tout l'écran
const COMMIT_BACK = 380; // puis retour à 0 avant validation
const OPEN_TRIGGER = 56; // au-delà : la ligne reste ouverte (bouton révélé)
const OPEN_SNAP = 88; // largeur d'ouverture au repos
const COMMIT_RATIO = 0.5; // au-delà de 50% de l'écran : validation/annulation directe
const CHECK_ZONE = 70; // bord droit de la ligne : la case de validation

type ReleaseKind = 'commit' | 'open' | 'close';

// Machine à états du swipe des lignes de blocs.
// Chaque ligne a son geste. Pendant le drag, la ligne sous le doigt suit `activeDragX` (valeur
// unique, perf). Au relâchement on passe le relais à l'offset PROPRE de la ligne (via le
// registre) : chaque ligne anime sa propre valeur, donc plusieurs animations tournent en
// parallèle sans s'annuler. `restOffsets` garde la position de repos (persistance + tap).
export function useBlocSwipe({
  initialValidated,
  screenWidth,
  onSelect,
  onStatusChange,
}: UseBlocSwipeParams): UseBlocSwipeReturn {
  const [statuses, setStatuses] = useState<Record<string, RowStatus>>(() =>
    Object.fromEntries(Array.from(initialValidated, (id) => [id, 'validated' as RowStatus])),
  );
  const statusesRef = useRef(statuses);
  const applyStatus = useCallback(
    (id: string, status: RowStatus) => {
      statusesRef.current = { ...statusesRef.current, [id]: status };
      setStatuses(statusesRef.current);
      onStatusChange?.(id, status);
    },
    [onStatusChange],
  );

  const activeId = useSharedValue(''); // id de la ligne en cours de drag ('' = aucune)
  const activeDragX = useSharedValue(0);
  const restOffsets = useSharedValue<Record<string, number>>({}); // offsets au repos (worklets)
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
        applyStatus(id, dir > 0 ? 'validated' : 'unvalidated');
        sv.value = withTiming(dir * screenWidth, { duration: COMMIT_OUT }, (f) => {
          'worklet';
          if (f) sv.value = withTiming(0, { duration: COMMIT_BACK });
        });
      }
    },
    [setRest, screenWidth, applyStatus],
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

  // Tap sur la case de validation : bascule le statut sans déplacer la ligne
  const toggleFromTap = useCallback(
    (id: string) => {
      applyStatus(id, statusesRef.current[id] === 'validated' ? 'unvalidated' : 'validated');
    },
    [applyStatus],
  );

  // Un geste par ligne, gardé en mémoire : la liste virtualisée remonte souvent les mêmes lignes
  const gestures = useMemo(() => new Map<string, ReturnType<typeof Gesture.Exclusive>>(), []);
  const gestureFor = useCallback(
    (id: string) => {
      const existing = gestures.get(id);
      if (existing) return existing;
      const pan = Gesture.Pan()
        // N'active QUE l'horizontal franc ; échoue dès que le mouvement part en vertical
        // → le défilement de la liste reprend la main (pas de conflit).
        .activeOffsetX([-16, 16])
        .failOffsetY([-12, 12])
        // À l'activation : on prend la main sur la ligne, départ depuis sa position de repos
        .onStart((e) => {
          startX.value = e.translationX;
          const from = restOffsets.value[id] ?? 0;
          baseX.value = from;
          activeDragX.value = from; // évite un saut au 1er frame avant onUpdate
          activeId.value = id;
        })
        .onUpdate((e) => {
          if (activeId.value !== id) return;
          const dx = baseX.value + (e.translationX - startX.value);
          activeDragX.value = Math.max(-screenWidth, Math.min(screenWidth, dx));
        })
        .onEnd(() => {
          if (activeId.value !== id) return;
          const x = activeDragX.value;
          const dir = x > 0 ? 1 : -1;
          const commitX = screenWidth * COMMIT_RATIO;
          let kind: ReleaseKind = 'close';
          if (Math.abs(x) > commitX) kind = 'commit';
          else if (Math.abs(x) > OPEN_TRIGGER) kind = 'open';
          runOnJS(release)(id, x, kind, dir);
        });
      const tap = Gesture.Tap().onEnd((e) => {
        const off = restOffsets.value[id] ?? 0;
        // Ligne ouverte → valide/annule ; ligne fermée → la case bascule, le reste ouvre le bloc
        if (off > 0) runOnJS(commitFromTap)(id, 1);
        else if (off < 0) runOnJS(commitFromTap)(id, -1);
        else if (e.x > screenWidth - CHECK_ZONE) runOnJS(toggleFromTap)(id);
        else runOnJS(onSelect)(id);
      });
      // Tap prioritaire seulement s'il n'y a pas de drag (le pan gagne au moindre mouvement)
      const gesture = Gesture.Exclusive(pan, tap);
      gestures.set(id, gesture);
      return gesture;
    },
    [
      gestures,
      screenWidth,
      activeId,
      activeDragX,
      restOffsets,
      startX,
      baseX,
      release,
      commitFromTap,
      toggleFromTap,
      onSelect,
    ],
  );

  return {
    gestureFor,
    statuses,
    getInitialOffset,
    activeId,
    activeDragX,
    register,
    unregister,
  };
}
