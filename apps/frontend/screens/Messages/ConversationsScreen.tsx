import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { IconButton, Section, Text, UserInfo } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
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
      <ScreenHeader
        title="Messages"
        onBack={() => navigation.goBack()}
        right={
          <IconButton
            icon="EditRegular"
            variant="action"
            accessibilityLabel="Nouveau message"
            onPress={() => navigation.navigate('NewConversation')}
          />
        }
      >
        <SearchToolbar value={query} onChange={setQuery} placeholder="Rechercher un grimpeur..." />
      </ScreenHeader>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.md,
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {sections.map((section) => (
          <Section key={section.key} gap="md">
            <Text variant="eyebrow">{section.title}</Text>

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
                      <Text
                        size="sm"
                        bold={conversation.unreadCount > 0}
                        appearance={conversation.unreadCount > 0 ? 'black' : 'gray'}
                        numberOfLines={1}
                      >
                        {messagePreview(conversation.lastMessage, CURRENT_USER.id)}
                      </Text>
                    }
                    onPressUser={() => openConversation(conversation.id)}
                  />
                </View>
                {conversation.unreadCount > 0 && (
                  <Styled.UnreadBadge>
                    <Text size={11} extraBold style={{ color: '#13201B' }}>
                      {conversation.unreadCount}
                    </Text>
                  </Styled.UnreadBadge>
                )}
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
