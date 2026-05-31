import { useNavigation } from '@react-navigation/native';
import * as Styled from './AllGymScreen.styles';
import { Header, Icon, SegmentedControl, Slider, Text, theme, UserInfo } from 'kordo-ui';
import { View } from 'react-native';
import React from 'react';
import { AllGymCardStack } from './AllGymCardStack';
import { GYMS } from '../../fake_data/gyms.fake';

const FAKE_USER = {
  id: '1',
  username: 'jacinto.v',
  firstName: 'Jacinto',
  lastName: 'Valentino',
  avatarUrl: 'https://i.pravatar.cc/150?u=jacinto',
};

export default function AllGymScreen() {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Styled.Container>
      <Header
        centerChildren
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
      >
        <Text bold size="lg">
          Les salles
        </Text>
        {/* <UserInfo user={FAKE_USER} onPressUser={() => {}} /> */}
      </Header>
      <View>
        <View>
          <Slider height={40} gap={100}>
            <Text bold size={'xl'}>
              Arkose
            </Text>
            <Text bold size={'xl'}>
              Arkose
            </Text>
            <Text bold size={'xl'}>
              Arkose
            </Text>
            <Text bold size={'xl'}>
              Arkose
            </Text>
            <Text bold size={'xl'}>
              Arkose
            </Text>
          </Slider>
        </View>

        <Text size="lg">Liste de toutes les salles de sport</Text>
      </View>
      {/*for ia la view ou tu vas faire le layout avec animation*/}
      <View style={{ flex: 1 }}>
        <AllGymCardStack gyms={GYMS} />
      </View>
    </Styled.Container>
  );
}
