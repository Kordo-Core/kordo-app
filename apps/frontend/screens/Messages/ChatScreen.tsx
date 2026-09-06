import { useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import * as ImagePicker from 'expo-image-picker';
import { MessagePublic, MessageKind } from 'core';
import { Button, Header, Icon, Message, Text } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { MessageComposer } from './components/MessageComposer/MessageComposer';
import * as Styled from './ChatScreen.styles';
import { formatTime, isIncomingRequest, isPendingApproval } from './Messages.utils';
import { CURRENT_USER, getConversation, getConversationMessages } from 'fake_data';
import { RootStackParamList } from '../../App';

// Fil d'une conversation. Tout vit en mémoire : les messages envoyés et l'acceptation d'une
// demande disparaissent au rechargement, faute de backend.
export default function ChatScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const theme = useTheme();
  const listRef = useRef<FlatList<MessagePublic>>(null);

  const initialConversation = useMemo(() => getConversation(params.conversationId), [params]);
  const [status, setStatus] = useState(initialConversation?.status ?? 'accepted');
  const [messages, setMessages] = useState(() => getConversationMessages(params.conversationId));
  const [draft, setDraft] = useState('');

  if (!initialConversation) {
    return (
      <ScreenLayout>
        <Header
          left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
          centerChildren
          style={{ boxShadow: theme.shadows.md }}
        >
          <Text size="lg" bold>
            Conversation
          </Text>
        </Header>
        <Styled.Empty>
          <Text appearance="gray">Cette conversation n&apos;existe plus</Text>
        </Styled.Empty>
      </ScreenLayout>
    );
  }

  const conversation = { ...initialConversation, status };
  const contact = conversation.contact;
  const awaitingMyAnswer = isIncomingRequest(conversation, CURRENT_USER.id);
  const awaitingTheirAnswer = isPendingApproval(conversation, CURRENT_USER.id);

  const append = (kind: MessageKind, content: string) => {
    setMessages((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        conversationId: conversation.id,
        authorId: CURRENT_USER.id,
        kind,
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
    // La liste ne suit pas toute seule quand elle grandit sous le clavier.
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  const send = () => {
    const content = draft.trim();
    if (!content) return;
    setDraft('');
    append('text', content);
  };

  const attach = async (from: 'camera' | 'library') => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images', 'videos'],
      quality: 0.8,
    };
    const result =
      from === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);

    if (result.canceled) return;
    const asset = result.assets[0];
    append(asset.type === 'video' ? 'video' : 'image', asset.uri);
  };

  const renderMessage = (message: MessagePublic) => {
    const direction = message.authorId === CURRENT_USER.id ? 'out' : 'in';
    const time = formatTime(message.createdAt);

    if (message.kind === 'text') {
      return <Message direction={direction} content={message.content} time={time} />;
    }

    return (
      <Message direction={direction} time={time}>
        <View>
          <Styled.Media source={{ uri: message.content }} />
          {/* Vidéo : le poster est affiché, la lecture n'est pas gérée dans cette version. */}
          {message.kind === 'video' && (
            <Styled.PlayBadge>
              <Icon name="play" size="lg" color={theme.colors.neutral.white} />
            </Styled.PlayBadge>
          )}
        </View>
      </Message>
    );
  };

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        right={
          // L'appel n'est pas géré : le bouton est là, il ne fait rien.
          <Icon name="phone" size="md" onPress={() => {}} />
        }
        style={{ boxShadow: theme.shadows.md }}
      >
        <Styled.HeaderIdentity>
          <Styled.HeaderAvatar source={{ uri: contact.avatarUrl }} />
          <View>
            <Text size="lg" bold>
              {contact.firstName} {contact.lastName}
            </Text>
            <Styled.Presence>
              <Styled.PresenceDot online={conversation.isContactOnline} />
              <Text size="sm" appearance="gray">
                {conversation.isContactOnline ? 'en ligne' : 'hors ligne'}
              </Text>
            </Styled.Presence>
          </View>
        </Styled.HeaderIdentity>
      </Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={listRef}
          style={{ flex: 1 }}
          data={messages}
          keyExtractor={(message) => message.id}
          renderItem={({ item }) => renderMessage(item)}
          contentContainerStyle={Styled.messagesContent(theme)}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          ListEmptyComponent={
            <Styled.Empty>
              <Text appearance="gray">Envoyez le premier message</Text>
            </Styled.Empty>
          }
        />

        {awaitingMyAnswer ? (
          <Styled.RequestBar>
            <Text size="sm" appearance="gray">
              {contact.firstName} souhaite vous envoyer un message. Acceptez pour pouvoir répondre.
            </Text>
            <Styled.RequestActions>
              <View style={{ flex: 1 }}>
                <Button
                  title="Refuser"
                  appearance="gray"
                  inverted
                  size="md"
                  onPress={() => navigation.goBack()}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Accepter"
                  appearance="secondary"
                  size="md"
                  onPress={() => setStatus('accepted')}
                />
              </View>
            </Styled.RequestActions>
          </Styled.RequestBar>
        ) : awaitingTheirAnswer ? (
          <Styled.RequestBar>
            <Text size="sm" appearance="gray">
              En attente d&apos;une réponse de {contact.firstName}. Vous pourrez écrire à nouveau
              une fois votre demande acceptée.
            </Text>
          </Styled.RequestBar>
        ) : (
          <MessageComposer
            value={draft}
            onChange={setDraft}
            onSend={send}
            onPressCamera={() => attach('camera')}
            onPressGallery={() => attach('library')}
          />
        )}
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
