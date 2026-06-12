import { useMemo, useState } from 'react';
import { LayoutChangeEvent, useWindowDimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  BoulderBadge,
  Header,
  Icon,
  ListRow,
  Panel,
  SegmentedControl,
  Text,
  theme,
} from 'kordo-ui';
import * as Styled from './GymScreen.styles';
import { RankingTab } from './RankingTab/RankingTab';
import { BlocsTab } from './BlocsTab/BlocsTab';
import { CardGeometry } from './utils/CardGeometry.types';
import { RootStackParamList } from '../../../App';
import { BlocDetail, GYMS } from '../../../fake_data';

const SEGMENTS = [
  { text: 'Classement', color: theme.colors.secondary.base },
  { text: 'Les blocs', color: theme.colors.secondary.base },
];

const HERO_OVERLAP = 6; // chevauchement hero / card
const SHADOW_GAP = 6; // marge sous le header une fois la card dockée

// Orchestrateur de l'écran salle : header, sélecteur d'onglet, fond, et géométrie partagée
// de la mécanique "card qui se docke" passée à l'onglet actif (Classement / Blocs).
export default function GymScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Gym'>>();
  const gym = GYMS.find((g) => g.id === params.gymId);
  const [activeTab, setActiveTab] = useState(0);

  const { height } = useWindowDimensions();

  const [headerHeight, setHeaderHeight] = useState(0);
  const [segmentedHeight, setSegmentedHeight] = useState(0);
  const [selectedBoulder, setSelectedBoulder] = useState<BlocDetail | null>(null);

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

      <Panel title="test" isOpen={!!selectedBoulder} onClose={() => setSelectedBoulder(null)}>
        {selectedBoulder && (
          <ListRow
            left={
              <BoulderBadge
                avatarUrl={selectedBoulder.bloc.blocUrl}
                grade={selectedBoulder.bloc.grade}
              />
            }
            primaryText={
              <Text size="lg" bold>
                {selectedBoulder.bloc.name}
              </Text>
            }
            secondaryText={
              <Text appearance="primary" size="sm">
                <Text size="sm" appearance="gray">
                  par{' '}
                </Text>
                {selectedBoulder.setter?.firstName}
              </Text>
            }
            right={
              <Text size="lg" bold appearance="gray">
                {selectedBoulder.bloc.points}pts
              </Text>
            }
          />
        )}
      </Panel>

      {/* Sélecteur figé sous le header */}
      <Styled.SegmentedWrapper
        pointerEvents="box-none"
        onLayout={(e: LayoutChangeEvent) => setSegmentedHeight(e.nativeEvent.layout.height)}
        style={{ top: headerHeight }}
      >
        <SegmentedControl segments={SEGMENTS} selectedIndex={activeTab} onSelect={setActiveTab} />
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
