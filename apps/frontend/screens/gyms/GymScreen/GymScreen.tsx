import { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Header, Icon, SegmentedControl, Text, theme } from 'kordo-ui';
import { View } from 'react-native';
import * as Styled from './GymScreen.styles';
import { RootStackParamList } from '../../../App';
import { GYMS } from '../../../fake_data/gyms.fake';

const SEGMENTS = [
  { text: 'Classement', color: theme.colors.secondary.base },
  { text: 'Les blocs', color: theme.colors.secondary.base },
];

export default function GymScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Gym'>>();
  const gym = GYMS.find((g) => g.id === params.gymId);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Styled.Container>
      <Header
        style={{ backgroundColor: 'transparent' }}
        centerChildren
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
      >
        <Text bold size="lg">
          {gym?.name}
        </Text>
      </Header>
      <View style={{ flexDirection: 'row', padding: theme.spacing.xxl }}>
        <SegmentedControl segments={SEGMENTS} selectedIndex={activeTab} onSelect={setActiveTab} />
      </View>
      {activeTab === 0 && (
        <View style={{ flex: 1 }}>
          {/* Contenu classement */}
          <Text>Classement du gym</Text>
          <Styled.Card></Styled.Card>
        </View>
      )}
      {activeTab === 1 && (
        <View style={{ flex: 1 }}>
          {/* Contenu blocs */}
          <Text>Les blocs du gym</Text>
          <Styled.Card></Styled.Card>
        </View>
      )}
    </Styled.Container>
  );
}
