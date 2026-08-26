import React, { useMemo, useState } from 'react';
import {
  Image,
  InteractionManager,
  LayoutChangeEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTheme } from '@emotion/react';
import { SvgUri } from 'react-native-svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  BoulderBadge,
  Header,
  Icon,
  ListRow,
  Panel,
  SegmentedControl,
  Slider,
  Tag,
  Text,
  VideoStories,
} from 'kordo-ui';
import * as Styled from './GymScreen.styles';
import { RankingTab } from './RankingTab/RankingTab';
import { BlocsTab } from './BlocsTab/BlocsTab';
import { CardGeometry } from './utils/CardGeometry.types';
import { RootStackParamList } from '../../../App';
import { BlocDetail, GYMS, getMediaByBloc, getBlocDetailById } from '../../../fake_data';
import { MethodVideoSlide } from './components/MethodVideoSlide/MethodVideoSlide';

const HERO_OVERLAP = 6; // chevauchement hero / card
const SHADOW_GAP = 6; // marge sous le header une fois la card dockée

// Orchestrateur de l'écran salle : header, sélecteur d'onglet, fond, et géométrie partagée
// de la mécanique "card qui se docke" passée à l'onglet actif (Classement / Blocs).
export default function GymScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  // Dépend du thème : construit dans le composant plutôt qu'au chargement du module.
  const segments = useMemo(
    () => [
      { text: 'Classement', color: theme.colors.secondary.base },
      { text: 'Les blocs', color: theme.colors.secondary.base },
    ],
    [theme],
  );
  const { params } = useRoute<RouteProp<RootStackParamList, 'Gym'>>();
  const gym = GYMS.find((g) => g.id === params.gymId);
  const [activeTab, setActiveTab] = useState(0);

  const { height, width } = useWindowDimensions();

  const [headerHeight, setHeaderHeight] = useState(0);
  const [segmentedHeight, setSegmentedHeight] = useState(0);
  const [selectedBoulder, setSelectedBoulder] = useState<BlocDetail | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // Visionneuse "stories" des vidéos de méthode du bloc sélectionné (null = fermée)
  const [storiesIndex, setStoriesIndex] = useState<number | null>(null);

  // Vidéos de méthode du bloc ouvert, au format attendu par VideoStories
  const blocVideos = useMemo(
    () =>
      selectedBoulder
        ? getMediaByBloc(selectedBoulder.bloc.id).map((e) => ({ id: e.media.id, url: e.media.url }))
        : [],
    [selectedBoulder],
  );

  React.useEffect(() => {
    setIsOpen(!!selectedBoulder);
  }, [selectedBoulder]);

  // Deep-link : arrivée avec un blocId (ex. depuis une activité) → onglet blocs + panneau du bloc ouvert.
  // On diffère l'ouverture après la transition de navigation : sinon l'animation du Panel se joue
  // pendant le push d'écran et n'aboutit pas (le panneau reste fermé).
  React.useEffect(() => {
    if (!params.blocId) return;
    const detail = getBlocDetailById(params.blocId);
    if (!detail) return;
    setActiveTab(1);
    const task = InteractionManager.runAfterInteractions(() => setSelectedBoulder(detail));
    return () => task.cancel();
  }, [params.blocId]);

  // Géométrie commune aux deux onglets (même slot hero, même docking)
  const geometry = useMemo<CardGeometry>(() => {
    const heroHeight = height * 0.42;
    const cardRest = segmentedHeight + heroHeight - HERO_OVERLAP;
    return {
      height,
      headerHeight,
      heroHeight,
      topInset: headerHeight + segmentedHeight,
      cardHeight: height - headerHeight - SHADOW_GAP,
      cardRest,
      cardDock: Math.max(0, cardRest - SHADOW_GAP),
      shadowGap: SHADOW_GAP,
      phase1End: heroHeight * 0.45,
    };
  }, [height, headerHeight, segmentedHeight]);

  return (
    <Styled.Container>
      <Styled.Background pointerEvents="none">
        <SvgUri
          width={height}
          height={height}
          uri="https://res.cloudinary.com/dqmegz5dn/image/upload/v1781135028/topo-primary-dark_wdsvmf.svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </Styled.Background>

      {activeTab === 0 ? (
        <RankingTab gymId={params.gymId} geometry={geometry} />
      ) : (
        <BlocsTab
          gymId={params.gymId}
          geometry={geometry}
          onBoulderSelected={(bloc) => setSelectedBoulder(bloc)}
        />
      )}

      <Panel
        isOpen={!!isOpen}
        onClose={() => {
          setIsOpen(false);
          setTimeout(() => {
            setSelectedBoulder(null);
          }, 300);
        }}
      >
        <>
          <ListRow
            left={
              <BoulderBadge
                avatarUrl={selectedBoulder?.bloc.blocUrl}
                grade={selectedBoulder?.bloc.grade || 1}
              />
            }
            primaryText={
              <Text size="lg" bold>
                {selectedBoulder?.bloc.name}
              </Text>
            }
            secondaryText={
              <Text appearance="primary" size="sm">
                <Text size="sm" appearance="gray">
                  par{' '}
                </Text>
                {selectedBoulder?.setter?.firstName}
              </Text>
            }
            right={
              <Text size="lg" bold appearance="gray">
                {selectedBoulder?.bloc.points}pts
              </Text>
            }
          />
          <Image
            source={{ uri: selectedBoulder?.bloc.blocUrl }}
            style={{
              width: width,
              height: 500,
              backgroundColor: theme.colors.secondary.light,
              marginLeft: -theme.spacing.md,
              marginTop: theme.spacing.sm,
            }}
          />
          <View style={{ gap: theme.spacing.md }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing.sm,
                marginTop: theme.spacing.md,
              }}
            >
              {selectedBoulder?.tags.map((tag) => (
                <Tag key={tag.id} title={tag.name} appearance="secondary" />
              ))}
            </View>
            <Text>{selectedBoulder?.bloc.description}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.sm,
              }}
            >
              <Icon name="calendar" size="md" />
              <Text>{selectedBoulder?.bloc.createdAt}</Text>
            </View>
            <Slider
              height={260}
              gap={theme.spacing.md}
              style={{
                width: width,
                marginLeft: -theme.spacing.md,
              }}
            >
              <View
                style={{
                  width: 180,
                  height: 260,
                  borderRadius: theme.borderRadius.square,
                  borderWidth: 2,
                  borderColor: theme.colors.primary.base,
                  borderStyle: 'dashed',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="image" size="lg" color={theme.colors.primary.base} />
                <Text appearance="primary">Ajouter votre vidéo</Text>
              </View>
              {getMediaByBloc(selectedBoulder?.bloc.id || '').map((entry, index) => (
                <MethodVideoSlide
                  key={entry.media.id}
                  entry={entry}
                  onPress={() => setStoriesIndex(index)}
                />
              ))}
            </Slider>
          </View>
        </>
      </Panel>

      {/* Visionneuse "stories" des vidéos de méthode (tap gauche/droite = vidéo préc./suiv.) */}
      {storiesIndex !== null && (
        <VideoStories
          videos={blocVideos}
          initialIndex={storiesIndex}
          onClose={() => setStoriesIndex(null)}
        />
      )}

      {/* Sélecteur figé sous le header */}
      <Styled.SegmentedWrapper
        pointerEvents="box-none"
        onLayout={(e: LayoutChangeEvent) => setSegmentedHeight(e.nativeEvent.layout.height)}
        style={{ top: headerHeight }}
      >
        <SegmentedControl segments={segments} selectedIndex={activeTab} onSelect={setActiveTab} />
      </Styled.SegmentedWrapper>

      {/* Header figé tout en haut */}
      <Header
        onLayout={(e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height)}
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
