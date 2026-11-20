import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { useTheme } from '@emotion/react';
import { IconButton, Slider, Text } from 'kordo-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutChangeEvent, View } from 'react-native';
import React from 'react';
import { AllGymCardStack } from './AllGymCardStack';
import { GYMS } from '../../../fake_data/gyms.fake';

// Noms de salles uniques servant de filtres dans le sélecteur
const FILTERS = Array.from(new Set(GYMS.map((g) => g.shortName)));

// Présentation de chaque franchise sous le sélecteur
const FRANCHISE_DESCRIPTIONS: Record<string, string> = {
  Arkose: '13 salles de bloc en France et en Europe, avec restaurant, bar et espace détente.',
  'Climb Up': 'Salles mixtes bloc et voie, du débutant au grimpeur confirmé.',
  "Block'Out": 'Atmosphère urbaine et ouvertures créatives chaque semaine.',
  Murmur: 'Une salle intime portée par une communauté passionnée.',
  'Petites Pierres': 'Le spot convivial idéal pour débuter en escalade.',
};

export default function AllGymsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [frontIndex, setFrontIndex] = React.useState(0);
  // Hauteur de la zone de la pile, mesurée ici : la pile la reçoit pour dimensionner ses cartes
  const [stackHeight, setStackHeight] = React.useState(0);

  // Salles correspondant au filtre centré dans le sélecteur
  const filteredGyms = GYMS.filter((g) => g.shortName === FILTERS[selectedIndex]);

  return (
    <ScreenLayout>
      {/* En-tête de la maquette : retour + surtitre, puis le titre pleine largeur */}
      <View style={{ paddingTop: insets.top + 14, paddingHorizontal: 14, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <IconButton
            icon="ChevronLeftRegular"
            variant="surface"
            accessibilityLabel="Retour"
            onPress={() => navigation.goBack()}
          />
          <Text variant="eyebrow" size={12} numberOfLines={1} style={{ flex: 1 }}>
            {GYMS.length} salles · {FILTERS.length} franchises
          </Text>
        </View>
        <Text variant="display" size="lg">
          Toutes les salles
        </Text>
      </View>
      <View style={{ marginTop: 10, gap: 10 }}>
        <Slider
          gap={30}
          selectMode
          height={54}
          selectedIndex={selectedIndex}
          onChange={(i) => {
            setSelectedIndex(i);
            setFrontIndex(0);
          }}
        >
          {FILTERS.map((filter, i) => (
            <Text
              key={filter}
              variant="display"
              size={i === selectedIndex ? 28 : 18}
              appearance={i === selectedIndex ? 'black' : 'gray'}
              numberOfLines={1}
            >
              {filter}
            </Text>
          ))}
        </Slider>
        <Text
          style={{ paddingHorizontal: theme.spacing.xl + 8, textAlign: 'center', lineHeight: 21 }}
          appearance="gray"
          size={14}
        >
          {FRANCHISE_DESCRIPTIONS[FILTERS[selectedIndex]] ??
            'Découvre toutes nos salles partenaires, réparties dans toute la France.'}
        </Text>
        <Text variant="eyebrow" size={11} style={{ textAlign: 'center', marginTop: -8 }}>
          Glisse pour passer · {Math.min(frontIndex + 1, filteredGyms.length)} /{' '}
          {filteredGyms.length}
        </Text>
      </View>

      {/* Pile de cartes animée filtrée par la salle sélectionnée.
          La key force un remount à chaque changement de filtre pour repartir de la première carte. */}
      <View
        style={{ flex: 1 }}
        onLayout={(e: LayoutChangeEvent) => setStackHeight(e.nativeEvent.layout.height)}
      >
        <AllGymCardStack
          key={selectedIndex}
          gyms={filteredGyms}
          onFrontChange={setFrontIndex}
          visibleHeight={stackHeight}
        />
      </View>
    </ScreenLayout>
  );
}
