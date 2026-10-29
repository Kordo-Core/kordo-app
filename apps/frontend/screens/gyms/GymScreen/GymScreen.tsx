import React, { useMemo, useState } from 'react';
import {
  Image,
  InteractionManager,
  LayoutChangeEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTheme } from '@emotion/react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  BoulderBadge,
  Header,
  Icon,
  IconButton,
  ListRow,
  Panel,
  SegmentedControl,
  Slider,
  Tag,
  Text,
  VideoStories,
} from 'kordo-ui';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
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

  // Onglets posés sur le dégradé vert du hero : l'indicateur clair est celui du composant.
  const segments = useMemo(() => [{ text: 'Classement' }, { text: 'Les blocs' }], []);
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
    <ScreenLayout>
      {/* Hero vert (design D) derrière l'en-tête, les onglets et le podium / le plan */}
      <LinearGradient
        colors={theme.colors.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: geometry.topInset + geometry.heroHeight + 40,
          borderBottomLeftRadius: 36,
          borderBottomRightRadius: 36,
        }}
      />
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
          {/* Fiche du bloc (design D) : photo arrondie sans repères, titre display, points */}
          <Image
            source={{ uri: selectedBoulder?.bloc.blocUrl }}
            style={{
              width: width - theme.spacing.md * 2,
              height: 380,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: theme.colors.surfaceAlt,
            }}
          />
          <ListRow
            left={
              <BoulderBadge
                avatarUrl={selectedBoulder?.bloc.blocUrl}
                grade={selectedBoulder?.bloc.grade || 1}
              />
            }
            primaryText={
              <Text variant="display" size="sm">
                {selectedBoulder?.bloc.name}
              </Text>
            }
            secondaryText={
              <Text appearance="secondary" size="sm" bold>
                <Text size="sm" appearance="gray">
                  par{' '}
                </Text>
                {selectedBoulder?.setter?.firstName}
              </Text>
            }
            right={<Tag title={`${selectedBoulder?.bloc.points ?? 0} pts`} appearance="primary" />}
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
              <Icon name="calendar" size="md" color={theme.colors.textMuted} />
              <Text appearance="gray" size="sm" bold>
                Ouvert le{' '}
                {selectedBoulder?.bloc.createdAt
                  ? new Date(selectedBoulder.bloc.createdAt).toLocaleDateString('fr-FR')
                  : ''}
              </Text>
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
                  borderRadius: theme.borderRadius.card,
                  borderWidth: 2,
                  borderColor: theme.colors.border,
                  borderStyle: 'dashed',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing.sm,
                }}
              >
                <Icon name="CameraRegular" size="lg" color={theme.colors.primary.base} />
                <Text bold appearance="gray">
                  Ajouter ta vidéo
                </Text>
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
        left={
          <IconButton
            icon="ArrowLeftRegular"
            variant="glass"
            accessibilityLabel="Retour"
            onPress={() => navigation.goBack()}
          />
        }
      >
        <View>
          <Text variant="eyebrow" size={11} appearance="white" style={{ opacity: 0.8 }}>
            {gym?.shortName ?? 'Salle'}
          </Text>
          <Text variant="display" size="sm" appearance="white" numberOfLines={1}>
            {gym?.name}
          </Text>
        </View>
      </Header>
    </ScreenLayout>
  );
}
