import { useNavigation } from '@react-navigation/native';
import * as Styled from './AllGymsScreen.styles';
import { Header, Icon, Slider, Text, theme } from 'kordo-ui';
import { View } from 'react-native';
import React from 'react';
import { AllGymCardStack } from './AllGymCardStack';
import { GYMS } from '../../../fake_data/gyms.fake';

// Noms de salles uniques servant de filtres dans le sélecteur
const FILTERS = Array.from(new Set(GYMS.map((g) => g.shortName)));

export default function AllGymsScreen() {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Salles correspondant au filtre centré dans le sélecteur
  const filteredGyms = GYMS.filter((g) => g.shortName === FILTERS[selectedIndex]);

  return (
    <Styled.Container>
      <Header
        centerChildren
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
      >
        <Text bold size="lg">
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
          {FILTERS.map((filter) => (
            <Text key={filter} bold size="xl" appearance="black" numberOfLines={1}>
              {filter}
            </Text>
          ))}
        </Slider>
        <Text
          style={{ paddingHorizontal: theme.spacing.xl, textAlign: 'center' }}
          appearance="gray"
        >
          Découvrez toute nos salles partenaires ! Plus de 50 salles dans toute la France dans plus
          de 8 franchises differente
        </Text>
      </View>

      {/* Pile de cartes animée filtrée par la salle sélectionnée.
          La key force un remount à chaque changement de filtre pour repartir de la première carte. */}
      <View style={{ flex: 1 }}>
        <AllGymCardStack key={selectedIndex} gyms={filteredGyms} />
      </View>
    </Styled.Container>
  );
}
