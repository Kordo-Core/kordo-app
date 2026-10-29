import { useCallback, useMemo, useState } from 'react';
import { ListRenderItem, useWindowDimensions } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import * as Shell from '../GymScreen.styles';
import * as Styled from './BlocsTab.styles';
import { GymMap } from './components/GymMap/GymMap';
import { BlocSwipeRow } from './components/BlocSwipeRow/BlocSwipeRow';
import { useBlocSwipe } from './components/useBlocSwipe/useBlocSwipe';
import { BlocRow } from './utils/BlocRow.types';
import { BlocsTabProps } from './BlocsTab.types';
import { getBlocsByGym, getSectorsByGym } from '../../../../fake_data';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

// Onglet Blocs : carte des secteurs en hero + liste de blocs swipables (validation/annulation).
export function BlocsTab({ gymId, geometry, onBoulderSelected }: BlocsTabProps) {
  const theme = useTheme();
  const { height, headerHeight, heroHeight, topInset, cardHeight, cardRest, cardDock, shadowGap } =
    geometry;
  const { width: screenWidth } = useWindowDimensions();

  const blocs = useMemo(() => getBlocsByGym(gymId), [gymId]);
  const sectors = useMemo(() => getSectorsByGym(gymId), [gymId]);

  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  // Blocs filtrés par secteur sélectionné, regroupés par date, puis aplatis (en-tête + blocs)
  const blocsData = useMemo<BlocRow[]>(() => {
    const source = selectedSectorId
      ? blocs.filter((detail) => detail.sector.id === selectedSectorId)
      : blocs;
    const groups = new Map<string, typeof blocs>();
    source.forEach((detail) => {
      const date = detail.bloc.createdAt;
      if (!groups.has(date)) groups.set(date, []);
      groups.get(date)!.push(detail);
    });
    const rows: BlocRow[] = [];
    Array.from(groups.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .forEach(([date, items]) => {
        rows.push({ type: 'header', key: `header-${date}`, date });
        items.forEach((detail) => rows.push({ type: 'bloc', key: detail.bloc.id, detail }));
      });
    return rows;
  }, [blocs, selectedSectorId]);

  const [listHeight, setListHeight] = useState(0);
  const [mapInteractive, setMapInteractive] = useState(true);
  const listRef = useAnimatedRef<Animated.FlatList<BlocRow>>();
  const scrollY = useSharedValue(0);
  const lastMapInteractive = useSharedValue(true);

  const innerScroll = Math.max(0, listHeight - cardHeight);
  const scrollRange = height + cardDock + innerScroll;

  const onScroll = useAnimatedScrollHandler(
    (event) => {
      scrollY.value = event.contentOffset.y;
      const inner = Math.min(Math.max(scrollY.value - cardDock, 0), innerScroll);
      scrollTo(listRef, 0, inner, false);
      // Coupe les taps de la carte dès qu'elle commence à être recouverte par la card
      const interactive = event.contentOffset.y < Math.max(1, cardDock) * 0.4;
      if (interactive !== lastMapInteractive.value) {
        lastMapInteractive.value = interactive;
        runOnJS(setMapInteractive)(interactive);
      }
    },
    [cardDock, innerScroll],
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(shadowGap, cardRest - scrollY.value) }],
  }));

  // La carte des secteurs s'efface et remonte légèrement quand la card monte par-dessus
  const mapStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, Math.max(1, cardDock) * 0.6],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, Math.max(1, cardDock)],
          [0, -60],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  // Le geste/hook ne connaît que l'id ; on résout ici en bloc complet (la donnée vit ici)
  const onSelect = useCallback(
    (id: string) => {
      const row = blocsData.find((r) => r.type === 'bloc' && r.detail.bloc.id === id);
      if (row && row.type === 'bloc') onBoulderSelected(row.detail);
    },
    [blocsData, onBoulderSelected],
  );

  const {
    gesture,
    statuses,
    onRowLayout,
    getInitialOffset,
    activeId,
    activeDragX,
    register,
    unregister,
  } = useBlocSwipe({ blocsData, scrollY, geometry, innerScroll, screenWidth, onSelect });

  const keyExtractor = useCallback((row: BlocRow) => row.key, []);
  const renderItem = useCallback<ListRenderItem<BlocRow>>(
    ({ item }) =>
      item.type === 'header' ? (
        <Styled.SectionHeader onLayout={(e) => onRowLayout(item.key, e.nativeEvent.layout.height)}>
          <Text appearance="gray" size="sm" bold>
            {formatDate(item.date)}
          </Text>
        </Styled.SectionHeader>
      ) : (
        <BlocSwipeRow
          id={item.detail.bloc.id}
          detail={item.detail}
          status={statuses[item.detail.bloc.id]}
          getInitialOffset={getInitialOffset}
          activeId={activeId}
          activeDragX={activeDragX}
          register={register}
          unregister={unregister}
          onRowLayout={onRowLayout}
        />
      ),
    [statuses, getInitialOffset, activeId, activeDragX, register, unregister, onRowLayout],
  );

  return (
    <>
      {/* Pan + tap posés sur le ghost (même surface tactile) : le scroll vertical reste intact */}
      <GestureDetector gesture={gesture}>
        <Shell.GhostScroll
          contentContainerStyle={{ height: scrollRange }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      </GestureDetector>
      <Styled.MapContainer
        pointerEvents={mapInteractive ? 'auto' : 'none'}
        style={[{ top: topInset, height: heroHeight }, mapStyle]}
      >
        <GymMap
          sectors={sectors}
          selectedSectorId={selectedSectorId}
          onSelectSector={setSelectedSectorId}
        />
      </Styled.MapContainer>
      <Shell.CardFrame
        pointerEvents="none"
        style={[{ top: headerHeight, height: cardHeight }, cardStyle]}
      >
        <Animated.FlatList
          ref={listRef}
          data={blocsData}
          extraData={statuses}
          scrollEnabled={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onContentSizeChange={(_w, h) => setListHeight(h)}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBlock: theme.spacing.lg }}
        />
      </Shell.CardFrame>
    </>
  );
}
