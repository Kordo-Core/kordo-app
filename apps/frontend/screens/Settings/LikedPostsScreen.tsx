import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { getLikedPosts, HomeFeedItem } from 'fake_data';
import { RootStackParamList } from '../../App';

const TILE_HEIGHT = 200;

// Auteur du post, quel que soit son type
const postUser = (item: HomeFeedItem) => item.data.user;

// Image de la vignette : la première photo d'une publication, sinon l'avatar de l'auteur.
const postImage = (item: HomeFeedItem) =>
  item.kind === 'publication'
    ? (item.data.photos[0]?.url ?? postUser(item).avatarUrl)
    : postUser(item).avatarUrl;

// Publications aimées (design D) : grille de vignettes, le cœur retire le j'aime.
export default function LikedPostsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const liked = useMemo(() => getLikedPosts(), []);
  const [removed, setRemoved] = useState<string[]>([]);

  const toggleLike = (id: string) =>
    setRemoved((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));

  return (
    <ScreenLayout>
      <ScreenHeader
        title="J’aime"
        eyebrow="Ton activité"
        subtitle="Les publications que tu as aimées. Touche ♥ pour retirer ton j’aime."
        onBack={() => navigation.goBack()}
      />

      {/* Liste virtualisée : elle gère son propre défilement, pas de ScrollView autour. */}
      <FlatList
        style={{ flex: 1 }}
        data={liked}
        numColumns={2}
        keyExtractor={(item) => item.data.id}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 14,
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <EmptyState
            icon="HeartRegular"
            title="Rien pour l’instant"
            text="Aucune publication aimée pour le moment. Touche le cœur d’une publication du fil pour la retrouver ici."
            actionLabel="Voir le fil"
            onAction={() => navigation.navigate('MainTabs')}
          />
        }
        renderItem={({ item }: { item: HomeFeedItem }) => {
          const user = postUser(item);
          const isLiked = !removed.includes(item.data.id);
          return (
            <Pressable
              onPress={() => navigation.push('UserProfile', { userId: user.id })}
              style={{
                width: '48.5%',
                height: TILE_HEIGHT,
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: theme.colors.surfaceAlt,
                opacity: isLiked ? 1 : 0.5,
              }}
            >
              <Image
                source={{ uri: postImage(item) }}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              />
              <LinearGradient
                colors={['transparent', `rgba(${theme.colors.scrim}, 0.85)`]}
                locations={[0.5, 1]}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Image
                  source={{ uri: user.avatarUrl }}
                  style={{ width: 24, height: 24, borderRadius: 3 }}
                />
                <Text size="xs" extraBold appearance="white" numberOfLines={1} style={{ flex: 1 }}>
                  {user.firstName ?? user.username}
                </Text>
                <Pressable
                  onPress={() => toggleLike(item.data.id)}
                  accessibilityLabel={isLiked ? 'Retirer le j’aime' : 'Aimer'}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    name={isLiked ? 'HeartFilled' : 'HeartRegular'}
                    size={16}
                    color={isLiked ? '#FF5A5F' : theme.colors.neutral.white}
                  />
                </Pressable>
              </View>
            </Pressable>
          );
        }}
      />
    </ScreenLayout>
  );
}
