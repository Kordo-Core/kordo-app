import { useMemo, useState } from 'react';
import { FlatList, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Activity, Header, Icon, Now, Publication, TextPost, UserInfo } from 'kordo-ui';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { CURRENT_USER, getHomeFeed, HomeFeedItem } from 'fake_data';
import { RootStackParamList } from '../../../App';

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const homeFeed = useMemo(() => getHomeFeed(), []);

  // Position de scroll passée au header "smart" + hauteur du header pour décaler le contenu
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <ScreenLayout>
      <Header
        smart
        scrollY={scrollY}
        onLayout={(e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height)}
        left={
          <UserInfo
            user={CURRENT_USER}
            onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
          />
        }
        right={
          <>
            {/* Cloche : notifications */}
            <Icon
              name="AlertRegular"
              size="lg"
              onPress={() => navigation.navigate('Notifications')}
            />
            {/* Bulle de message (tout à droite) : vers la page Messages (à créer) */}
            <Icon name="ChatRegular" size="lg" onPress={() => {}} />
          </>
        }
        style={{ boxShadow: theme.shadows.md }}
      />

      <FlatList
        style={{ flex: 1 }}
        data={homeFeed}
        keyExtractor={(item) => item.data.id}
        scrollEventThrottle={16}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          setScrollY(e.nativeEvent.contentOffset.y)
        }
        contentContainerStyle={{
          paddingTop: headerHeight + theme.spacing.xs,
          gap: theme.spacing.xs,
          paddingBottom: 110,
        }}
        renderItem={({ item }: { item: HomeFeedItem }) => {
          switch (item.kind) {
            case 'now':
              return (
                <Now
                  now={item.data}
                  onPressGym={(gym) => navigation.navigate('Gym', { gymId: gym.id })}
                />
              );
            case 'activity':
              return (
                <Activity
                  activity={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
                  onPressBloc={(bloc) =>
                    navigation.navigate('Gym', { gymId: item.data.gym.id, blocId: bloc.id })
                  }
                />
              );
            case 'publication':
              return (
                <Publication
                  publication={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
                />
              );
            case 'text':
              return (
                <TextPost
                  textPost={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
                />
              );
          }
        }}
      />
    </ScreenLayout>
  );
}
