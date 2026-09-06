import { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { UserPublic } from 'core';
import { Header, Icon, Section, Text, UserInfo } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { matchesQuery } from '../../utils/matchesQuery';
import * as Styled from './ConversationsScreen.styles';
import { findConversationWith, getMessageableUsers } from 'fake_data';
import { RootStackParamList } from '../../App';

// Choix du destinataire d'une nouvelle conversation. Si un fil existe déjà avec la personne,
// on le rouvre plutôt que d'en créer un doublon.
export default function NewConversationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const users = useMemo(() => getMessageableUsers(), []);
  const visible = users.filter((u) => matchesQuery(query, u.username, u.firstName, u.lastName));

  const startConversation = (user: UserPublic) => {
    const existing = findConversationWith(user.id);
    // Sans backend, une conversation inexistante ne peut pas être créée : on ouvre celle qui
    // existe, sinon on revient à la liste.
    if (existing) {
      navigation.replace('Chat', { conversationId: existing.id });
      return;
    }
    navigation.goBack();
  };

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Nouveau message
        </Text>
      </Header>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.xs,
          paddingBlock: theme.spacing.xs,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Section gap="lg">
          <SearchToolbar value={query} onChange={setQuery} placeholder="Rechercher..." />

          {visible.map((user) => (
            <UserInfo
              key={user.id}
              user={user}
              layout="row"
              secondaryText={
                <Text size="sm" appearance="gray">
                  {user.firstName} {user.lastName}
                </Text>
              }
              onPressUser={startConversation}
            />
          ))}

          {visible.length === 0 && (
            <Styled.Empty>
              <Text appearance="gray">Aucun contact trouvé</Text>
            </Styled.Empty>
          )}
        </Section>
      </ScrollView>
    </ScreenLayout>
  );
}
