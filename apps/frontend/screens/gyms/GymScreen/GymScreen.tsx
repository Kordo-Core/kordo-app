import React, { useMemo, useState } from 'react';
import { InteractionManager, Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton, Panel, SegmentedControl, Text, VideoStories } from 'kordo-ui';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { RankingTab } from './RankingTab/RankingTab';
import { BlocsTab } from './BlocsTab/BlocsTab';
import { RootStackParamList } from '../../../App';
import { BlocDetail, GYMS, getBlocsByGym, getBlocDetailById } from '../../../fake_data';
import { BlocDetailSheet } from './components/BlocDetailSheet/BlocDetailSheet';

const TAB_FADE = 220; // durée du fondu entre Classement et Les blocs

// Orchestrateur de l'écran salle : Classement et Les blocs restent montés l'un sur l'autre et
// passent de l'un à l'autre en fondu. Rien n'est reconstruit au changement d'onglet.
export default function GymScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const segments = useMemo(() => [{ text: 'Classement' }, { text: 'Les blocs' }], []);
  const { params } = useRoute<RouteProp<RootStackParamList, 'Gym'>>();
  const gym = GYMS.find((g) => g.id === params.gymId);
  const startOnBlocs = params.initialTab === 'blocs' || !!params.blocId;
  const [tab, setTab] = useState(startOnBlocs ? 1 : 0);
  // Onglet posé, une fois le fondu terminé : sur le web, l'autre onglet est alors masqué pour ne
  // plus recevoir les clics (ses textes réactivent les événements souris).
  const [settledTab, setSettledTab] = useState(startOnBlocs ? 1 : 0);
  const progress = useSharedValue(startOnBlocs ? 1 : 0);
  const rankingStyle = useAnimatedStyle(() => ({ opacity: 1 - progress.value }));
  const blocsStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  // Les blocs se préparent après l'arrivée sur l'écran, pour que le premier passage soit immédiat
  const [blocsReady, setBlocsReady] = useState(startOnBlocs);
  React.useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setBlocsReady(true));
    return () => task.cancel();
  }, []);
  const selectTab = (index: number) => {
    setBlocsReady(true);
    setTab(index);
    progress.value = withTiming(index, { duration: TAB_FADE });
  };
  React.useEffect(() => {
    const timer = setTimeout(() => setSettledTab(tab), TAB_FADE + 20);
    return () => clearTimeout(timer);
  }, [tab]);
  const layerStyle = (index: number): ViewStyle[] => [
    StyleSheet.absoluteFill as ViewStyle,
    { zIndex: tab === index ? 1 : 0 },
    Platform.OS === 'web' && settledTab !== index && tab !== index
      ? ({ visibility: 'hidden' } as ViewStyle)
      : {},
  ];
  // Période du classement : semaine, mois (par défaut) ou saison
  const [period, setPeriod] = useState(1);
  const blocCount = useMemo(() => getBlocsByGym(params.gymId).length, [params.gymId]);

  // Bloc ouvert dans le panneau (null = fermé) et visionneuse de ses vidéos de méthode
  const [selectedBoulder, setSelectedBoulder] = useState<BlocDetail | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [stories, setStories] = useState<{
    videos: { id: string; url: string }[];
    index: number;
  } | null>(null);
  React.useEffect(() => {
    setIsOpen(!!selectedBoulder);
  }, [selectedBoulder]);

  // Deep-link : arrivée avec un blocId (ex. depuis une activité) → onglet blocs + panneau ouvert.
  // L'ouverture est différée après la transition de navigation : sinon l'animation du Panel se
  // joue pendant le push d'écran et n'aboutit pas.
  React.useEffect(() => {
    if (!params.blocId) return;
    const detail = getBlocDetailById(params.blocId);
    if (!detail) return;
    setBlocsReady(true);
    setTab(1);
    setSettledTab(1);
    progress.value = 1;
    const task = InteractionManager.runAfterInteractions(() => setSelectedBoulder(detail));
    return () => task.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.blocId]);

  // En-tête commun : seul le titre change d'un onglet à l'autre
  const pageHeader = (title: string) => (
    // Maquette : bouton retour + surtitre, puis le titre pleine largeur, puis les onglets
    <View
      style={{
        paddingTop: insets.top + 14,
        paddingHorizontal: 14,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <IconButton
          icon="ChevronLeftRegular"
          variant="surface"
          accessibilityLabel="Retour"
          onPress={() => navigation.goBack()}
        />
        <Text variant="eyebrow" size={12} appearance="gray" numberOfLines={1} style={{ flex: 1 }}>
          {gym?.name ?? 'Salle'} · {blocCount} blocs
        </Text>
      </View>
      <Text variant="display" size="lg" appearance="black" numberOfLines={1}>
        {title}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <SegmentedControl
          segments={segments}
          selectedIndex={tab}
          onSelect={selectTab}
          variant="surface"
          size="md"
          borderRadius="square"
          extraBoldLabels
          style={{ borderRadius: 7 }}
        />
      </View>
    </View>
  );

  return (
    <ScreenLayout>
      <Animated.View
        pointerEvents={tab === 0 ? 'box-none' : 'none'}
        style={[layerStyle(0), rankingStyle]}
      >
        <RankingTab
          gymId={params.gymId}
          gymImage={gym?.imageUri}
          header={pageHeader(segments[0].text)}
          period={period}
          onPeriodChange={setPeriod}
        />
      </Animated.View>

      {blocsReady && (
        <Animated.View
          pointerEvents={tab === 1 ? 'box-none' : 'none'}
          style={[layerStyle(1), blocsStyle]}
        >
          <BlocsTab
            gymId={params.gymId}
            header={pageHeader(segments[1].text)}
            onBoulderSelected={(bloc) => setSelectedBoulder(bloc)}
          />
        </Animated.View>
      )}

      <Panel
        tone="background"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setTimeout(() => setSelectedBoulder(null), 300);
        }}
      >
        {selectedBoulder && (
          <BlocDetailSheet
            key={selectedBoulder.bloc.id}
            detail={selectedBoulder}
            onOpenVideo={(videos, index) => setStories({ videos, index })}
          />
        )}
      </Panel>

      {/* Visionneuse des vidéos de méthode (tap gauche/droite = vidéo préc./suiv.) */}
      {stories && (
        <VideoStories
          videos={stories.videos}
          initialIndex={stories.index}
          onClose={() => setStories(null)}
        />
      )}
    </ScreenLayout>
  );
}
