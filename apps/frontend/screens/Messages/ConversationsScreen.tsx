import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Header, Icon, Section, Text, UserInfo } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { matchesQuery } from '../../utils/matchesQuery';
import * as Styled from './ConversationsScreen.styles';
import { groupConversationsByRecency, messagePreview } from './Messages.utils';
import { CURRENT_USER, getConversations } from 'fake_data';
import { RootStackParamList } from '../../App';

// Liste des conversations, dernier message en premier. Les demandes reçues y figurent comme les
// autres : c'est en ouvrant le fil que le choix d'accepter se présente.
export default function ConversationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  // Les conversations lues localement ne doivent pas réapparaître non lues au retour depuis le
  // fil : l'écran garde la liste dans son état plutôt que de la relire à chaque rendu.
  const [conversations, setConversations] = useState(() => getConversations());

  const sections = useMemo(
    () =>
      groupConversationsByRecency(
        conversations.filter((c) =>
          matchesQuery(query, c.contact.username, c.contact.firstName, c.contact.lastName),
        ),
      ),
    [conversations, query],
  );

  const openConversation = (conversationId: string) => {
    setConversations((current) =>
      current.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)),
    );
    navigation.navigate('Chat', { conversationId });
  };

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        right={
          <Icon
            name="EditRegular"
            size="md"
            onPress={() => navigation.navigate('NewConversation')}
          />
        }
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Conversations
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
        </Section>

        {sections.map((section) => (
          <Section key={section.key} gap="md">
            <Text size="md" bold appearance="gray">
              {section.title}
            </Text>

            {section.items.map((conversation) => (
              <Styled.Row
                key={conversation.id}
                onPress={() => openConversation(conversation.id)}
                accessibilityRole="button"
              >
                <View style={{ flex: 1 }}>
                  <UserInfo
                    user={conversation.contact}
                    layout="row"
                    secondaryText={
                      <Text size="sm" appearance="gray" numberOfLines={1}>
                        {messagePreview(conversation.lastMessage, CURRENT_USER.id)}
                      </Text>
                    }
                    onPressUser={() => openConversation(conversation.id)}
                  />
                </View>
                {conversation.unreadCount > 0 && <Styled.UnreadDot />}
              </Styled.Row>
            ))}
          </Section>
        ))}

        {sections.length === 0 && (
          <Section>
            <Styled.Empty>
              <Text appearance="gray">
                {query ? 'Aucune conversation trouvée' : 'Aucune conversation pour le moment'}
              </Text>
            </Styled.Empty>
          </Section>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
