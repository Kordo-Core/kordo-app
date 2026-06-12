import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, ListRenderItem, useWindowDimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  BoulderBadge,
  Header,
  Icon,
  ListRow,
  SegmentedControl,
  Tag,
  Text,
  theme,
  UserInfo,
} from 'kordo-ui';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Styled from './GymScreen.styles';
import { GymMap } from './GymMap';
import { RootStackParamList } from '../../../App';
import {
  BlocDetail,
  GYMS,
  RankingEntry,
  RankingTrend,
  getBlocsByGym,
  getGymRanking,
  getSectorsByGym,
} from '../../../fake_data';

const SEGMENTS = [
  { text: 'Classement', color: theme.colors.secondary.base },
  { text: 'Les blocs', color: theme.colors.secondary.base },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

// Lignes aplaties de la FlatList blocs : en-têtes de date + blocs (pour virtualisation)
type BlocRow =
  | { type: 'header'; key: string; date: string }
  | { type: 'bloc'; key: string; detail: BlocDetail };

function PodiumBar({
  height,
  delay = 0,
  scrollY,
  shrinkEnd,
  children,
}: {
  height: number;
  delay?: number;
  scrollY: SharedValue<number>;
  shrinkEnd: number;
  children: ReactNode;
}) {
  const mount = useSharedValue(0);

  useEffect(() => {
    mount.value = withDelay(
      delay,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, mount]);

  const animatedStyle = useAnimatedStyle(() => {
    const shrink = interpolate(scrollY.value, [0, shrinkEnd], [1, 0.45], Extrapolation.CLAMP);
    return { height: height * mount.value * shrink };
  });

  return <Styled.PodiumBar style={animatedStyle}>{children}</Styled.PodiumBar>;
}

function TrendIcon({ trend }: { trend: RankingTrend }) {
  if (trend === 'up') {
    return <Icon name="TriangleUpFilled" size="lg" color={theme.colors.success.base} />;
  }
  return <Icon name="TriangleDownFilled" size="lg" color={theme.colors.error.base} />;
}

export default function GymScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Gym'>>();
  const gym = GYMS.find((g) => g.id === params.gymId);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  const ranking = getGymRanking(params.gymId);
  const blocs = getBlocsByGym(params.gymId);
  const sectors = getSectorsByGym(params.gymId);

  // Blocs filtrés par secteur sélectionné, regroupés par date
  const blocsGrouped = useMemo(() => {
    const source = selectedSectorId
      ? blocs.filter((detail) => detail.sector.id === selectedSectorId)
      : blocs;
    const groups = new Map<string, typeof blocs>();
    source.forEach((detail) => {
      const date = detail.bloc.createdAt;
      if (!groups.has(date)) groups.set(date, []);
      groups.get(date)!.push(detail);
    });
    return Array.from(groups.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, items]) => ({ date, items }));
  }, [blocs, selectedSectorId]);

  const podium = [
    { entry: ranking[1], bar: 140, delay: 120, label: '2' },
    { entry: ranking[0], bar: 210, delay: 0, label: '1' },
    { entry: ranking[2], bar: 90, delay: 240, label: '3' },
  ].filter((p) => p.entry);

  const { height } = useWindowDimensions();
  // Hauteur du "hero" (podium / carte des secteurs) et son chevauchement avec la card
  const heroHeight = height * 0.42;
  const heroOverlap = 6;
  const shadowGap = 6; // marge sous le header une fois la card dockée
  const phase1End = heroHeight * 0.45;

  const [headerHeight, setHeaderHeight] = useState(0);
  const onHeaderLayout = (e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height);

  const [segmentedHeight, setSegmentedHeight] = useState(0);
  const onSegmentedLayout = (e: LayoutChangeEvent) =>
    setSegmentedHeight(e.nativeEvent.layout.height);

  const topInset = headerHeight + segmentedHeight;

  const [listHeight, setListHeight] = useState(0);
  const [listHeightBlocs, setListHeightBlocs] = useState(0);
  // La carte n'est cliquable que tant qu'elle est visible (avant que la card ne la recouvre)
  const [mapInteractive, setMapInteractive] = useState(true);

  const cardHeight = height - headerHeight - shadowGap;

  // Position de repos / docké de la card. Les deux onglets partagent le même slot hero
  // (podium et carte des secteurs ont la hauteur heroHeight), donc la même géométrie —
  // connue dès le 1er rendu, d'où aucune téléportation au chargement de la carte SVG.
  const cardRest = segmentedHeight + heroHeight - heroOverlap;
  const cardDock = Math.max(0, cardRest - shadowGap);

  // La FlatList interne occupe toute la hauteur de la card (viewport = cardHeight) ;
  // son padding vertical est dans contentContainerStyle, donc inclus dans listHeight.
  const innerScroll = Math.max(0, listHeight - cardHeight);
  const scrollRange = height + cardDock + innerScroll;

  const innerScrollBlocs = Math.max(0, listHeightBlocs - cardHeight);
  const scrollRangeBlocs = height + cardDock + innerScrollBlocs;

  // Refs des FlatList internes : pilotées en phase 2 via scrollTo (thread UI), donc virtualisées
  const rankingListRef = useAnimatedRef<Animated.FlatList<RankingEntry>>();
  const blocsListRef = useAnimatedRef<Animated.FlatList<BlocRow>>();

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(
    (event) => {
      scrollY.value = event.contentOffset.y;
      // Phase 2 : la card est bloquée sous le header, la FlatList interne prend le relais
      const inner = Math.min(Math.max(scrollY.value - cardDock, 0), innerScroll);
      scrollTo(rankingListRef, 0, inner, false);
    },
    [cardDock, innerScroll],
  );

  const scrollYBlocs = useSharedValue(0);
  const lastMapInteractive = useSharedValue(true);
  const onScrollBlocs = useAnimatedScrollHandler(
    (event) => {
      scrollYBlocs.value = event.contentOffset.y;
      // Phase 2 : relais du scroll vers la FlatList interne des blocs
      const inner = Math.min(Math.max(scrollYBlocs.value - cardDock, 0), innerScrollBlocs);
      scrollTo(blocsListRef, 0, inner, false);
      // Coupe les taps dès que la card commence à recouvrir la carte des secteurs
      const interactive = event.contentOffset.y < Math.max(1, cardDock) * 0.4;
      if (interactive !== lastMapInteractive.value) {
        lastMapInteractive.value = interactive;
        runOnJS(setMapInteractive)(interactive);
      }
    },
    [cardDock, innerScrollBlocs],
  );

  useEffect(() => {
    scrollY.value = 0;
    scrollYBlocs.value = 0;
  }, [activeTab, scrollY, scrollYBlocs]);

  // Étape 1 : carte monte — Étape 2 : liste remonte dans la carte
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(shadowGap, cardRest - scrollY.value) }],
  }));

  const cardStyleBlocs = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(shadowGap, cardRest - scrollYBlocs.value) }],
  }));

  // La carte des secteurs s'efface et remonte légèrement quand la card monte par-dessus (comme le podium)
  const mapStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollYBlocs.value,
      [0, Math.max(1, cardDock) * 0.6],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          scrollYBlocs.value,
          [0, Math.max(1, cardDock)],
          [0, -60],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const podiumStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [phase1End, heroHeight * 0.95],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      { translateY: interpolate(scrollY.value, [0, phase1End], [0, -140], Extrapolation.CLAMP) },
      {
        scale: interpolate(
          scrollY.value,
          [phase1End, heroHeight],
          [1, 0.85],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  // Aplatissement des groupes (en-tête de date + blocs) pour la FlatList virtualisée
  const blocsData = useMemo<BlocRow[]>(() => {
    const rows: BlocRow[] = [];
    blocsGrouped.forEach(({ date, items }) => {
      rows.push({ type: 'header', key: `header-${date}`, date });
      items.forEach((detail) => rows.push({ type: 'bloc', key: detail.bloc.id, detail }));
    });
    return rows;
  }, [blocsGrouped]);

  // Réinitialise le secteur sélectionné en quittant l'onglet blocs
  useEffect(() => {
    if (activeTab !== 1) setSelectedSectorId(null);
  }, [activeTab]);

  const rankingKey = useCallback((entry: RankingEntry) => entry.user.id, []);
  const blocKey = useCallback((row: BlocRow) => row.key, []);

  const renderRankingItem = useCallback<ListRenderItem<RankingEntry>>(
    ({ item: entry }) => (
      <ListRow
        left={
          <Text size="lg" bold>
            {String(entry.rank).padStart(2, '0')}
          </Text>
        }
        primaryText={
          <UserInfo
            user={entry.user}
            onPressUser={() => {}}
            tertiaryText={
              <Text appearance="primary" bold>
                {entry.totalPoints} pts
              </Text>
            }
          />
        }
        right={<TrendIcon trend={entry.trend} />}
      />
    ),
    [],
  );

  const renderBlocItem = useCallback<ListRenderItem<BlocRow>>(
    ({ item }) =>
      item.type === 'header' ? (
        <Styled.SectionHeader>
          <Text appearance="gray" size="sm" bold>
            {formatDate(item.date)}
          </Text>
        </Styled.SectionHeader>
      ) : (
        <ListRow
          left={
            <BoulderBadge avatarUrl={item.detail.bloc.blocUrl} grade={item.detail.bloc.grade} />
          }
          primaryText={<Text bold>{item.detail.bloc.name}</Text>}
          secondaryText={
            <Text appearance="gray" size="sm">
              {item.detail.tags.map((t) => t.name).join(' · ')}
            </Text>
          }
          right={<Tag title={`${item.detail.bloc.points} pts`} appearance="primary" />}
        />
      ),
    [],
  );

  return (
    <Styled.Container>
      <Styled.Background pointerEvents="none">
        <SvgUri
          width={height}
          height={height}
          uri="https://res.cloudinary.com/dqmegz5dn/image/upload/v1781135028/topo-primary-dark_wdsvmf.svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </Styled.Background>

      {/* ── Classement ── */}
      {activeTab === 0 && (
        <>
          <Styled.PodiumContainer
            pointerEvents="none"
            style={[{ top: topInset, height: heroHeight }, podiumStyle]}
          >
            <Styled.Podium>
              {podium.map(({ entry, bar, delay, label }) => (
                <Styled.PodiumColumn key={entry.user.id}>
                  <UserInfo
                    user={entry.user}
                    layout="column"
                    onPressUser={() => {}}
                    primaryText={
                      <Text size="md" bold>
                        {entry.user.firstName}
                      </Text>
                    }
                    tertiaryText={
                      <Text appearance="gray" bold>
                        {entry.totalPoints} pts
                      </Text>
                    }
                  />
                  <PodiumBar height={bar} delay={delay} scrollY={scrollY} shrinkEnd={phase1End}>
                    <Text appearance="white" size="lg" extraBold>
                      {label}
                    </Text>
                  </PodiumBar>
                </Styled.PodiumColumn>
              ))}
            </Styled.Podium>
          </Styled.PodiumContainer>
          <Styled.CardFrame
            pointerEvents="none"
            style={[{ top: headerHeight, height: cardHeight }, cardStyle]}
          >
            <Animated.FlatList
              ref={rankingListRef}
              data={ranking}
              scrollEnabled={false}
              keyExtractor={rankingKey}
              renderItem={renderRankingItem}
              onContentSizeChange={(_w, h) => setListHeight(h)}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{ gap: theme.spacing.md, paddingBlock: theme.spacing.lg }}
            />
          </Styled.CardFrame>
          <Styled.GhostScroll
            contentContainerStyle={{ height: scrollRange }}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      {/* ── Les blocs — même mécanique que classement, carte des secteurs à la place du podium ── */}
      {activeTab === 1 && (
        <>
          {/* Scroll fantôme rendu en premier (sous la carte dans l'arbre) pour que les secteurs captent le tap */}
          <Styled.GhostScroll
            contentContainerStyle={{ height: scrollRangeBlocs }}
            onScroll={onScrollBlocs}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
          {/* Carte des secteurs : même emplacement/hauteur que le podium (slot fixe) */}
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
          <Styled.CardFrame
            pointerEvents="none"
            style={[{ top: headerHeight, height: cardHeight }, cardStyleBlocs]}
          >
            <Animated.FlatList
              ref={blocsListRef}
              data={blocsData}
              scrollEnabled={false}
              keyExtractor={blocKey}
              renderItem={renderBlocItem}
              onContentSizeChange={(_w, h) => setListHeightBlocs(h)}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBlock: theme.spacing.lg }}
            />
          </Styled.CardFrame>
        </>
      )}

      {/* Sélecteur figé sous le header */}
      <Styled.SegmentedWrapper
        pointerEvents="box-none"
        onLayout={onSegmentedLayout}
        style={{ top: headerHeight }}
      >
        <SegmentedControl segments={SEGMENTS} selectedIndex={activeTab} onSelect={setActiveTab} />
      </Styled.SegmentedWrapper>

      {/* Header figé tout en haut */}
      <Header
        onLayout={onHeaderLayout}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: 'transparent',
        }}
        centerChildren
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
      >
        <Text bold size="lg">
          {gym?.name}
        </Text>
      </Header>
    </Styled.Container>
  );
}
