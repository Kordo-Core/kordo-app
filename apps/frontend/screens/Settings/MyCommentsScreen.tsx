import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Icon, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { getMyComments } from 'fake_data';
import { RootStackParamList } from '../../App';

const DAY = 24 * 60 * 60 * 1000;

// Âge du commentaire : « 2 h », « Hier », « 3 j », « 1 sem », puis sa date
const timeAgo = (iso: string) => {
  const elapsed = Date.now() - new Date(iso).getTime();
  if (elapsed < DAY) return `${Math.max(1, Math.round(elapsed / (DAY / 24)))} h`;
  const days = Math.round(elapsed / DAY);
  if (days === 1) return 'Hier';
  if (days < 7) return `${days} j`;
  if (days < 28) return `${Math.round(days / 7)} sem`;
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

// Historique des commentaires écrits par l'utilisateur (design D) : la publication commentée, le
// commentaire dans une bulle, puis les actions.
export default function MyCommentsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const comments = useMemo(() => getMyComments(), []);
  const [deleted, setDeleted] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const visible = comments.filter((c) => !deleted.includes(c.id));

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Commentaires"
        eyebrow="Ton activité"
        subtitle={visible.length ? 'Tous les commentaires que tu as laissés.' : undefined}
        onBack={() => navigation.goBack()}
      />
      {visible.length === 0 ? (
        <Text appearance="gray" style={{ padding: theme.spacing.xl, textAlign: 'center' }}>
          Aucun commentaire pour le moment.
        </Text>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 14,
            paddingBottom: 30,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {visible.map((entry) => {
            const author = entry.post.author;
            const isLiked = liked.includes(entry.id);
            return (
              <View
                key={entry.id}
                style={{
                  gap: 10,
                  padding: 14,
                  borderRadius: 9,
                  backgroundColor: theme.colors.surface,
                  boxShadow: theme.shadows.sm,
                }}
              >
                <Pressable
                  onPress={() => navigation.push('UserProfile', { userId: author.id })}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
                >
                  <Image
                    source={{ uri: author.avatarUrl }}
                    style={{ width: 54, height: 54, borderRadius: 6 }}
                  />
                  {/* Contexte, auteur et date empilés (maquette) */}
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text size="sm" appearance="gray" style={{ fontFamily: theme.fonts.regular }}>
                      Sur la publication de
                    </Text>
                    <Text extraBold numberOfLines={1}>
                      {[author.firstName, author.lastName].filter(Boolean).join(' ') ||
                        author.username}
                    </Text>
                    <Text size="xs" appearance="gray" style={{ fontFamily: theme.fonts.regular }}>
                      {timeAgo(entry.createdAt)}
                    </Text>
                  </View>
                </Pressable>

                <View
                  style={{
                    padding: 12,
                    borderRadius: 7,
                    backgroundColor: theme.colors.surfaceAlt,
                  }}
                >
                  <Text size={14} style={{ lineHeight: 20.3 }}>
                    {entry.content}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                  <Pressable
                    onPress={() =>
                      setLiked((ids) =>
                        isLiked ? ids.filter((i) => i !== entry.id) : [...ids, entry.id],
                      )
                    }
                    accessibilityLabel="Aimer"
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  >
                    <Icon
                      name={isLiked ? 'HeartFilled' : 'HeartRegular'}
                      size={16}
                      color={isLiked ? theme.colors.error.base : theme.colors.textMuted}
                    />
                    <Text size="xs" bold appearance="gray">
                      {isLiked ? 1 : 0}
                    </Text>
                  </Pressable>
                  <Text size="xs" bold appearance="gray" style={{ flex: 1 }}>
                    Répondre
                  </Text>
                  <Pressable onPress={() => setDeleted((ids) => [...ids, entry.id])}>
                    <Text size="xs" bold appearance="error">
                      Supprimer
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </ScreenLayout>
  );
}
