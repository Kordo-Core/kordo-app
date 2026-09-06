import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Header, Icon, Section, Text } from 'kordo-ui';
import * as Styled from './MyCommentsScreen.styles';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { CURRENT_USER, getMyComments } from 'fake_data';
import { RootStackParamList } from '../../App';

// Historique des commentaires écrits par l'utilisateur, un par bande : le rappel de la
// publication commentée (auteur et début du contenu) puis la réponse, décalée dessous.
export default function MyCommentsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const comments = useMemo(() => getMyComments(), []);

  if (!comments.length) {
    return (
      <ScreenLayout>
        <Header
          left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
          centerChildren
          style={{ boxShadow: theme.shadows.md }}
        >
          <Text size="lg" bold>
            Commentaires
          </Text>
        </Header>
        <Text appearance="gray" style={{ padding: theme.spacing.xl, textAlign: 'center' }}>
          Aucun commentaire pour le moment.
        </Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Commentaires
        </Text>
      </Header>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
          paddingBlock: theme.spacing.sm,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {comments.map((entry) => (
          <Section key={entry.id}>
            <Styled.Content>
              <Styled.PostContent>
                <Styled.Avatar source={{ uri: entry.post.author.avatarUrl }} />
                <Text size="sm">
                  <Text
                    size="sm"
                    bold
                    onPress={() => navigation.push('UserProfile', { userId: entry.post.author.id })}
                  >
                    {[entry.post.author.firstName, entry.post.author.lastName]
                      .filter(Boolean)
                      .join(' ') || entry.post.author.username}
                  </Text>
                  {' - '}
                  {entry.post.excerpt}
                </Text>
              </Styled.PostContent>

              <Styled.Reply>
                <Styled.Avatar source={{ uri: CURRENT_USER.avatarUrl }} />
                <Text size="sm" style={{ flex: 1 }}>
                  <Text size="sm" bold>
                    {CURRENT_USER.username}
                  </Text>
                  {' - '}
                  {entry.content}
                </Text>
              </Styled.Reply>
            </Styled.Content>
          </Section>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
