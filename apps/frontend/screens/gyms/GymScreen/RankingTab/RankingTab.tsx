import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ListRenderItem, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
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
import { RootStackParamList } from '../../../../App';

// Position d'une ligne dans le contenu de la liste, pour retrouver celle qui est sous le doigt.
type RowLayout = { y: number; h: number; userId: string };

// Onglet Classement : podium en hero + liste de classement, mêmes mécaniques de scroll
// (ghost scroll qui dock la card puis relaie le scroll à la FlatList interne).
export function RankingTab({ gymId, geometry }: RankingTabProps) {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  // --- Ouverture du profil au clic sur une ligne ---
  //
  // La CardFrame est en `pointerEvents="none"` : sans elle, la carte capterait le geste et le
  // ghost qu'elle recouvre ne défilerait plus. Aucune ligne ne peut donc porter son propre
  // `onPress` — le tap est posé sur le ghost, et la ligne visée est déduite de l'ordonnée du
  // doigt. Même montage que le tap de l'onglet Blocs (cf. `useBlocSwipe`).

  // `paddingBlock` et `gap` du contentContainer de la liste : ils décalent et espacent les lignes.
  const contentPaddingTop = theme.spacing.lg;
  const rowGap = theme.spacing.md;

  const rowLayouts = useSharedValue<Record<number, RowLayout>>({});
  const rowHeights = useRef<Record<string, number>>({});
  const rankingRef = useRef(ranking);
  rankingRef.current = ranking;

  // Le `y` d'onLayout d'une cellule est relatif à la cellule (≈ 0) : on cumule les hauteurs.
  const recomputeOffsets = useCallback(() => {
    let acc = contentPaddingTop;
    const offsets: Record<number, RowLayout> = {};
    rankingRef.current.forEach((entry, i) => {
      const h = rowHeights.current[entry.user.id] ?? 0;
      offsets[i] = { y: acc, h, userId: entry.user.id };
      acc += h + rowGap;
    });
    rowLayouts.value = offsets;
  }, [rowLayouts, contentPaddingTop, rowGap]);

  const onRowLayout = useCallback(
    (userId: string, h: number) => {
      if (rowHeights.current[userId] === h) return;
      rowHeights.current[userId] = h;
      recomputeOffsets();
    },
    [recomputeOffsets],
  );

  useEffect(() => {
    recomputeOffsets();
  }, [ranking, recomputeOffsets]);

  const openProfile = useCallback(
    (userId: string) => navigation.push('UserProfile', { userId }),
    [navigation],
  );

  const rowTap = useMemo(
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
          if (l && l.h > 0 && yInContent >= l.y && yInContent <= l.y + l.h) {
            runOnJS(openProfile)(l.userId);
            break;
          }
        }
      }),
    [scrollY, shadowGap, cardRest, cardDock, innerScroll, headerHeight, rowLayouts, openProfile],
  );

  const keyExtractor = useCallback((entry: RankingEntry) => entry.user.id, []);
  const renderItem = useCallback<ListRenderItem<RankingEntry>>(
    ({ item }) => (
      <View onLayout={(e) => onRowLayout(item.user.id, e.nativeEvent.layout.height)}>
        <RankingRow entry={item} />
      </View>
    ),
    [onRowLayout],
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
            gap: rowGap,
            paddingBlock: contentPaddingTop,
            paddingInline: theme.spacing.lg,
          }}
        />
      </Styled.CardFrame>
      {/* Tap posé sur le ghost, même surface tactile que le scroll : il échoue au moindre
          mouvement, le défilement vertical reste donc intact. */}
      <GestureDetector gesture={rowTap}>
        <Styled.GhostScroll
          contentContainerStyle={{ height: scrollRange }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      </GestureDetector>
    </>
  );
}
