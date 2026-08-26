import { useCallback, useMemo, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useTheme } from '@emotion/react';
import {} from 'kordo-ui';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import * as Styled from '../GymScreen.styles';
import { Podium } from './components/Podium/Podium';
import { PodiumStep } from './components/Podium/Podium.types';
import { RankingRow } from './components/RankingRow/RankingRow';
import { RankingTabProps } from './RankingTab.types';
import { RankingEntry, getGymRanking } from '../../../../fake_data';

// Onglet Classement : podium en hero + liste de classement, mêmes mécaniques de scroll
// (ghost scroll qui dock la card puis relaie le scroll à la FlatList interne).
export function RankingTab({ gymId, geometry }: RankingTabProps) {
  const theme = useTheme();
  const { height, headerHeight, cardHeight, cardRest, cardDock, shadowGap } = geometry;

  const ranking = useMemo(() => getGymRanking(gymId), [gymId]);
  const podium = useMemo<PodiumStep[]>(
    () =>
      [
        { entry: ranking[1], bar: 140, delay: 120, label: '2' },
        { entry: ranking[0], bar: 210, delay: 0, label: '1' },
        { entry: ranking[2], bar: 90, delay: 240, label: '3' },
      ].filter((p) => p.entry),
    [ranking],
  );

  const [listHeight, setListHeight] = useState(0);
  const listRef = useAnimatedRef<Animated.FlatList<RankingEntry>>();
  const scrollY = useSharedValue(0);

  const innerScroll = Math.max(0, listHeight - cardHeight);
  const scrollRange = height + cardDock + innerScroll;

  const onScroll = useAnimatedScrollHandler(
    (event) => {
      scrollY.value = event.contentOffset.y;
      // Phase 2 : la card est dockée sous le header, la FlatList interne prend le relais
      const inner = Math.min(Math.max(scrollY.value - cardDock, 0), innerScroll);
      scrollTo(listRef, 0, inner, false);
    },
    [cardDock, innerScroll],
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(shadowGap, cardRest - scrollY.value) }],
  }));

  const keyExtractor = useCallback((entry: RankingEntry) => entry.user.id, []);
  const renderItem = useCallback<ListRenderItem<RankingEntry>>(
    ({ item }) => <RankingRow entry={item} />,
    [],
  );

  return (
    <>
      <Podium podium={podium} scrollY={scrollY} geometry={geometry} />
      <Styled.CardFrame
        pointerEvents="none"
        style={[{ top: headerHeight, height: cardHeight }, cardStyle]}
      >
        <Animated.FlatList
          ref={listRef}
          data={ranking}
          scrollEnabled={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onContentSizeChange={(_w, h) => setListHeight(h)}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            gap: theme.spacing.md,
            paddingBlock: theme.spacing.lg,
            paddingInline: theme.spacing.lg,
          }}
        />
      </Styled.CardFrame>
      <Styled.GhostScroll
        contentContainerStyle={{ height: scrollRange }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
