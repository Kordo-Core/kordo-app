import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { useTheme } from '@emotion/react';
import { Header, IconButton, Slider, Text } from 'kordo-ui';
import { View } from 'react-native';
import React from 'react';
import { AllGymCardStack } from './AllGymCardStack';
import { GYMS } from '../../../fake_data/gyms.fake';

// Noms de salles uniques servant de filtres dans le sélecteur
const FILTERS = Array.from(new Set(GYMS.map((g) => g.shortName)));

export default function AllGymsScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Salles correspondant au filtre centré dans le sélecteur
  const filteredGyms = GYMS.filter((g) => g.shortName === FILTERS[selectedIndex]);

  return (
    <ScreenLayout>
      <Header
        centerChildren
        style={{ backgroundColor: 'transparent' }}
        left={
          <IconButton
            icon="ArrowLeftRegular"
            accessibilityLabel="Retour"
            onPress={() => navigation.goBack()}
          />
        }
      >
        <Text variant="display" size="xs">
          Les salles
        </Text>
      </Header>
      <View style={{ marginTop: theme.spacing.lg, gap: theme.spacing.lg }}>
        <Slider
          gap={theme.spacing.xxl}
          selectMode
          height={48}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
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
          size="sm"
        >
          Découvre toutes nos salles partenaires : plus de 50 salles dans toute la France, réparties
          dans 8 franchises.
        </Text>
      </View>

      {/* Pile de cartes animée filtrée par la salle sélectionnée.
          La key force un remount à chaque changement de filtre pour repartir de la première carte. */}
      <View style={{ flex: 1 }}>
        <AllGymCardStack key={selectedIndex} gyms={filteredGyms} />
      </View>
    </ScreenLayout>
  );
}
