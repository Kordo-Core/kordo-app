import { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Activity, Header, Icon, Publication, Text, TextPost } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { CURRENT_USER, getLikedPosts, HomeFeedItem } from 'fake_data';
import { RootStackParamList } from '../../App';

// Publications aimées, rendues avec les mêmes cartes que le fil d'accueil.
export default function LikedPostsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const liked = useMemo(() => getLikedPosts(), []);

  const openProfile = (userId: string) => navigation.push('UserProfile', { userId });

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          J&apos;aimes
        </Text>
      </Header>

      {/* Liste virtualisée : elle gère son propre défilement, pas de ScrollView autour. */}
      <FlatList
        style={{ flex: 1 }}
        data={liked}
        keyExtractor={(item) => item.data.id}
        contentContainerStyle={{
          gap: theme.spacing.xs,
          paddingBlock: theme.spacing.xs,
          paddingBottom: theme.spacing.xxl,
        }}
        ListEmptyComponent={
          <Text appearance="gray" style={{ padding: theme.spacing.xl, textAlign: 'center' }}>
            Aucune publication aimée pour le moment.
          </Text>
        }
        renderItem={({ item }: { item: HomeFeedItem }) => {
          switch (item.kind) {
            case 'activity':
              return (
                <Activity
                  activity={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => openProfile(user.id)}
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
                  onPressUser={(user) => openProfile(user.id)}
                />
              );
            case 'text':
              return (
                <TextPost
                  textPost={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => openProfile(user.id)}
                />
              );
            default:
              return null;
          }
        }}
      />
    </ScreenLayout>
  );
}
