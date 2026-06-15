import { useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, Header, Icon, Now, UserInfo, theme } from 'kordo-ui';
import * as Styled from './HomeScreen.styles';
import { USERS, getNowFeed, getActivityFeed } from 'fake_data';
import { RootStackParamList } from '../../../App';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { height } = useWindowDimensions();
  const nowFeed = useMemo(() => getNowFeed(), []);
  const activityFeed = useMemo(() => getActivityFeed(), []);

  // Position de scroll passée au header "smart" + hauteur du header pour décaler le contenu
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

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

      <Header
        smart
        scrollY={scrollY}
        onLayout={(e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height)}
        left={<UserInfo user={USERS[0]} onPressUser={() => {}} />}
        right={
          <>
            {/* Cloche : notifications */}
            <Icon name="AlertRegular" size="lg" onPress={() => {}} />
            {/* Bulle de message (tout à droite) : vers la page Messages (à créer) */}
            <Icon name="ChatRegular" size="lg" onPress={() => {}} />
          </>
        }
        style={{ boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}
      />

      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          setScrollY(e.nativeEvent.contentOffset.y)
        }
        contentContainerStyle={{
          paddingTop: headerHeight + theme.spacing.xs,
          gap: theme.spacing.xs,
          paddingBottom: 120,
        }}
      >
        {nowFeed.map((now) => (
          <Now
            key={now.id}
            now={now}
            onPressGym={(gym) => navigation.navigate('Gym', { gymId: gym.id })}
          />
        ))}

        {activityFeed.map((activity) => (
          <Activity
            key={activity.id}
            activity={activity}
            onPressBloc={(bloc) =>
              navigation.navigate('Gym', { gymId: activity.gym.id, blocId: bloc.id })
            }
          />
        ))}
      </ScrollView>
    </Styled.Container>
  );
}
