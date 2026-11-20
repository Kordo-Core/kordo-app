import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItem,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import { CollapsibleCard, IconButton, LiveBadge, ProgressTile, Text } from 'kordo-ui';
import * as Styled from './BlocsTab.styles';
import { GymMap } from './components/GymMap/GymMap';
import { BlocSwipeRow } from './components/BlocSwipeRow/BlocSwipeRow';
import { useBlocSwipe } from './components/useBlocSwipe/useBlocSwipe';
import { ValidationToast } from './components/ValidationToast/ValidationToast';
import { BLOC_HEADER_HEIGHT, BLOC_ROW_HEIGHT, BlocRow, RowStatus } from './utils/BlocRow.types';
import { BlocsTabProps } from './BlocsTab.types';
import {
  TAGS,
  getBlocsByGym,
  getSectorsByGym,
  getTopCount,
  getValidatedBlocIds,
} from '../../../../fake_data';
import { BlocFilters } from './components/BlocFilters/BlocFilters';
import { BlocSort, LEVEL_LABELS } from './components/BlocFilters/BlocFilters.types';
import { EmptyState } from '../../../../components/EmptyState/EmptyState';

const TOAST_DURATION = 1800;
const GRADES_PER_ROW = 3;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

// Onglet Blocs : une page qui défile. Ta progression par couleur (qui sert de filtre), le plan
// des secteurs repliable, puis les blocs, à valider en glissant ou en touchant la case.
export function BlocsTab({ gymId, header, onBoulderSelected }: BlocsTabProps) {
  const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const blocs = useMemo(() => getBlocsByGym(gymId), [gymId]);
  const sectors = useMemo(() => getSectorsByGym(gymId), [gymId]);
  const initialValidated = useMemo(() => getValidatedBlocIds(), []);

  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  // Filtre par couleur de prise (paliers de 5 cotations, comme BoulderBadge)
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const gradeColors = useMemo(
    () => [
      { label: 'Jaune', color: theme.colors.boulderGrade.yellow },
      { label: 'Vert', color: theme.colors.boulderGrade.green },
      { label: 'Bleu', color: theme.colors.boulderGrade.blue },
      { label: 'Rouge', color: theme.colors.boulderGrade.red },
      { label: 'Noir', color: theme.colors.boulderGrade.black },
      { label: 'Violet', color: theme.colors.boulderGrade.purple },
    ],
    [theme],
  );
  const gradeIndex = (grade: number) => Math.min(5, Math.floor((Math.max(1, grade) - 1) / 5));

  // Filtres avancés (volet « Filtres ») : tri, étiquettes, palier maximum
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<BlocSort>('date');
  const [tagIds, setTagIds] = useState<Set<string>>(() => new Set());
  const [maxLevel, setMaxLevel] = useState(LEVEL_LABELS.length - 1);
  const activeFilters = tagIds.size + (maxLevel < LEVEL_LABELS.length - 1 ? 1 : 0);

  // Blocs qui passent les filtres. Étiquettes : au moins une par famille cochée.
  const filtered = useMemo(() => {
    const checkedGroups = new Map<string, Set<string>>();
    TAGS.filter((t) => tagIds.has(t.id)).forEach((t) => {
      if (!checkedGroups.has(t.group)) checkedGroups.set(t.group, new Set());
      checkedGroups.get(t.group)!.add(t.id);
    });
    return blocs.filter(
      (detail) =>
        (!selectedSectorId || detail.sector.id === selectedSectorId) &&
        (selectedGrade === null || gradeIndex(detail.bloc.grade) === selectedGrade) &&
        gradeIndex(detail.bloc.grade) <= maxLevel &&
        Array.from(checkedGroups.values()).every((ids) => detail.tags.some((t) => ids.has(t.id))),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocs, selectedSectorId, selectedGrade, tagIds, maxLevel]);

  // Numéro d'un secteur, le même que sur le plan
  const sectorNumber = (id: string) => sectors.findIndex((x) => x.id === id) + 1;

  // Regroupés selon le tri choisi, puis aplatis (en-tête + blocs)
  const blocsData = useMemo<BlocRow[]>(() => {
    const groupOf = (detail: (typeof blocs)[number]): { key: string; title: string } => {
      switch (sort) {
        case 'sector':
          return { key: detail.sector.id, title: `Secteur ${sectorNumber(detail.sector.id)}` };
        case 'level': {
          const tier = gradeIndex(detail.bloc.grade);
          return { key: String(tier), title: LEVEL_LABELS[tier] };
        }
        case 'tops':
          return { key: 'tops', title: 'Les plus réussis' };
        case 'setter': {
          const name = detail.setter?.firstName ?? 'Ouvreur inconnu';
          return { key: name, title: `Par ${name}` };
        }
        default:
          return { key: detail.bloc.createdAt, title: formatDate(detail.bloc.createdAt) };
      }
    };
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'sector':
          return sectorNumber(a.sector.id) - sectorNumber(b.sector.id);
        case 'level':
          return a.bloc.grade - b.bloc.grade;
        case 'tops':
          return getTopCount(b.bloc.id) - getTopCount(a.bloc.id);
        case 'setter':
          return (a.setter?.firstName ?? '').localeCompare(b.setter?.firstName ?? '');
        default:
          return b.bloc.createdAt.localeCompare(a.bloc.createdAt);
      }
    });
    const rows: BlocRow[] = [];
    let current: string | null = null;
    sorted.forEach((detail) => {
      const g = groupOf(detail);
      if (g.key !== current) {
        current = g.key;
        rows.push({ type: 'header', key: `header-${g.key}`, title: g.title });
      }
      rows.push({ type: 'bloc', key: detail.bloc.id, detail });
    });
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, sort]);

  // Position de chaque ligne, calculée une fois : la liste n'a plus besoin de les mesurer. Le haut
  // de page change de hauteur quand le plan se replie : il vit dans une référence pour ne pas
  // refaire le rendu de la liste à chaque image de l'animation.
  const rowOffsets = useMemo(() => {
    let y = 0;
    return blocsData.map((row) => {
      const length = row.type === 'header' ? BLOC_HEADER_HEIGHT : BLOC_ROW_HEIGHT;
      const layout = { length, offset: y };
      y += length;
      return layout;
    });
  }, [blocsData]);
  const pageTopHeight = useRef(0);
  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: rowOffsets[index].length,
      offset: pageTopHeight.current + rowOffsets[index].offset,
      index,
    }),
    [rowOffsets],
  );

  // Le geste ne connaît que l'id ; on résout ici en bloc complet (la donnée vit ici)
  const onSelect = useCallback(
    (id: string) => {
      const detail = blocs.find((d) => d.bloc.id === id);
      if (detail) onBoulderSelected(detail);
    },
    [blocs, onBoulderSelected],
  );

  // Message bref après une validation
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onStatusChange = useCallback(
    (id: string, status: RowStatus) => {
      const name = blocs.find((d) => d.bloc.id === id)?.bloc.name ?? 'Bloc';
      setToast(status === 'validated' ? `${name} validé !` : 'Validation retirée');
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), TOAST_DURATION);
    },
    [blocs],
  );

  const { gestureFor, statuses, getInitialOffset, activeId, activeDragX, register, unregister } =
    useBlocSwipe({ initialValidated, screenWidth, onSelect, onStatusChange });

  // Progression : blocs validés et points, au total et par couleur
  const progress = useMemo(() => {
    const totals = gradeColors.map(() => ({ total: 0, done: 0 }));
    let done = 0;
    let points = 0;
    blocs.forEach(({ bloc }) => {
      const tier = totals[gradeIndex(bloc.grade)];
      tier.total += 1;
      if (statuses[bloc.id] === 'validated') {
        tier.done += 1;
        done += 1;
        points += bloc.points;
      }
    });
    return { totals, done, points };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocs, statuses, gradeColors]);

  const keyExtractor = useCallback((row: BlocRow) => row.key, []);
  const renderItem = useCallback<ListRenderItem<BlocRow>>(
    ({ item }) =>
      item.type === 'header' ? (
        <Styled.SectionHeader>
          <Text variant="eyebrow">{item.title}</Text>
        </Styled.SectionHeader>
      ) : (
        <BlocSwipeRow
          id={item.detail.bloc.id}
          detail={item.detail}
          status={statuses[item.detail.bloc.id]}
          gesture={gestureFor(item.detail.bloc.id)}
          getInitialOffset={getInitialOffset}
          activeId={activeId}
          activeDragX={activeDragX}
          register={register}
          unregister={unregister}
        />
      ),
    [statuses, gestureFor, getInitialOffset, activeId, activeDragX, register, unregister],
  );

  const onWhite = { color: theme.colors.neutral.white };
  const onGreen = { color: theme.colors.soft };
  const gradeRows = [gradeColors.slice(0, GRADES_PER_ROW), gradeColors.slice(GRADES_PER_ROW)];

  const pageTop = (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        pageTopHeight.current = e.nativeEvent.layout.height;
      }}
      style={{ gap: 14, marginBottom: theme.spacing.xs }}
    >
      {header}

      {/* Ta progression : chaque couleur est aussi un filtre de la liste */}
      <LinearGradient
        colors={theme.colors.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          marginHorizontal: 14,
          padding: theme.spacing.lg,
          gap: theme.spacing.md,
          borderRadius: 12,
          boxShadow: `0px 16px 32px ${theme.mode === 'dark' ? 'rgba(0, 163, 111, 0.25)' : 'rgba(0, 132, 90, 0.25)'}`,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text variant="eyebrow" size={12} style={onGreen}>
              Ta progression
            </Text>
            <Text
              variant="display"
              size={screenWidth < 375 ? 28 : 35}
              style={[onWhite, { textTransform: 'none', lineHeight: screenWidth < 375 ? 28 : 35 }]}
            >
              {progress.done} validés · {progress.points.toLocaleString('fr-FR')} pts
            </Text>
          </View>
          <IconButton
            icon="options"
            variant="tint"
            size={42}
            accessibilityLabel={`Filtres, ${activeFilters} actifs`}
            badge={activeFilters > 0 ? activeFilters : undefined}
            badgeTone="accent"
            onPress={() => setFiltersOpen(true)}
          />
        </View>
        <View accessibilityRole="radiogroup" style={{ gap: 6 }}>
          {gradeRows.map((row, r) => (
            <View key={r} style={{ flexDirection: 'row', gap: 6 }}>
              {row.map((g, c) => {
                const i = r * GRADES_PER_ROW + c;
                const { done, total } = progress.totals[i];
                return (
                  <ProgressTile
                    key={g.label}
                    label={`${done} / ${total}`}
                    color={g.color}
                    value={total ? done / total : 0}
                    selected={selectedGrade === i}
                    accessibilityLabel={`Couleur ${g.label}, ${done} validés sur ${total}`}
                    onPress={() => setSelectedGrade(selectedGrade === i ? null : i)}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </LinearGradient>

      <CollapsibleCard
        title="Plan de la salle"
        right={<LiveBadge label="47 en séance" />}
        style={{ marginHorizontal: 14 }}
      >
        <GymMap
          sectors={sectors}
          selectedSectorId={selectedSectorId}
          onSelectSector={setSelectedSectorId}
        />
      </CollapsibleCard>

      <Text size="xs" appearance="gray" style={{ marginHorizontal: 20 }}>
        Glisse un bloc vers la droite (ou touche ✓) pour le valider.
      </Text>
    </View>
  );

  return (
    <>
      <FlatList
        data={blocsData}
        extraData={statuses}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ListHeaderComponent={pageTop}
        ListEmptyComponent={
          <EmptyState
            icon="OptionsRegular"
            title="Aucun bloc"
            text="Aucun bloc ne correspond à ces filtres. Essaie d’en retirer un ou d’élargir le niveau."
            actionLabel="Réinitialiser les filtres"
            onAction={() => {
              setSelectedSectorId(null);
              setSelectedGrade(null);
              setSort('date');
              setTagIds(new Set());
              setMaxLevel(LEVEL_LABELS.length - 1);
            }}
          />
        }
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={60}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 22 }}
      />
      <ValidationToast message={toast} points={progress.points} />
      <BlocFilters
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        sort={sort}
        onSortChange={setSort}
        tagIds={tagIds}
        onTagIdsChange={setTagIds}
        maxLevel={maxLevel}
        onMaxLevelChange={setMaxLevel}
        resultCount={filtered.length}
      />
    </>
  );
}
