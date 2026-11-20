import { useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import * as ImagePicker from 'expo-image-picker';
import { MessagePublic, MessageKind } from 'core';
import { Button, Header, Icon, IconButton, Message, Tag, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { MessageComposer } from './components/MessageComposer/MessageComposer';
import * as Styled from './ChatScreen.styles';
import { formatTime, isIncomingRequest, isPendingApproval } from './Messages.utils';
import { CURRENT_USER, getConversation, getConversationMessages } from 'fake_data';
import { RootStackParamList } from '../../App';

const QUICK_REPLIES = ['J’arrive !', 'Je filme ça', 'Quel secteur ?'];

// Combiné de téléphone (tracé du design D)
const CALL_PATH =
  'M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z';

// Libellé de jour des pastilles du fil : « Aujourd'hui », « Hier », puis la date
const dayLabel = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const days = Math.round(
    (new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() -
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) /
      86_400_000,
  );
  if (days <= 0) return 'Aujourd’hui';
  if (days === 1) return 'Hier';
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

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
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());

  if (!initialConversation) {
    return (
      <ScreenLayout>
        <ScreenHeader title="Conversation" eyebrow="Messages" onBack={() => navigation.goBack()} />
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

  const send = (text: string = draft) => {
    const content = text.trim();
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

  const toggleLike = (id: string) =>
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const renderMessage = (message: MessagePublic, index: number) => {
    const direction = message.authorId === CURRENT_USER.id ? 'out' : 'in';
    // Une suite de messages du même auteur forme un bloc : l'heure ne s'affiche qu'au dernier
    const next = messages[index + 1];
    const continued = !!next && next.authorId === message.authorId;
    const time = continued ? undefined : formatTime(message.createdAt);
    const prev = messages[index - 1];
    const newDay = !prev || dayLabel(prev.createdAt) !== dayLabel(message.createdAt);
    const common = {
      direction,
      time,
      continued,
      liked: likedIds.has(message.id),
      onLike: () => toggleLike(message.id),
    } as const;

    const bubble =
      message.kind === 'text' ? (
        <Message {...common} content={message.content} />
      ) : (
        <Message {...common}>
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

    return (
      <View>
        {/* Pastille de jour au premier message de chaque journée */}
        {newDay && (
          <Tag
            size="md"
            appearance="muted"
            title={dayLabel(message.createdAt)}
            style={{ alignSelf: 'center', marginBottom: 6 }}
          />
        )}
        {bubble}
      </View>
    );
  };

  return (
    <ScreenLayout>
      <Header
        left={
          <IconButton
            icon="ChevronLeftRegular"
            accessibilityLabel="Retour"
            onPress={() => navigation.goBack()}
          />
        }
        right={
          // L'appel n'est pas géré : le bouton est là, il ne fait rien.
          // Combiné dessiné ici : le jeu d'icônes n'a que le téléphone portable.
          <Styled.CallButton accessibilityLabel="Appeler" accessibilityRole="button">
            <Svg width={19} height={19} viewBox="0 0 24 24" fill="none">
              <Path
                d={CALL_PATH}
                stroke={theme.colors.softText}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Styled.CallButton>
        }
        style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}
      >
        <Styled.HeaderIdentity
          onPress={() => navigation.navigate('UserProfile', { userId: contact.id })}
          accessibilityRole="button"
        >
          <View>
            <Styled.HeaderAvatar source={{ uri: contact.avatarUrl }} />
            <Styled.PresenceDot online={conversation.isContactOnline} />
          </View>
          <View>
            <Text size={16} extraBold>
              {contact.firstName} {contact.lastName}
            </Text>
            <Text
              size="xs"
              bold
              style={{
                color: conversation.isContactOnline ? '#1FD18A' : theme.colors.textMuted,
              }}
            >
              {conversation.isContactOnline ? 'en ligne' : 'hors ligne'}
            </Text>
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
          renderItem={({ item, index }) => renderMessage(item, index)}
          contentContainerStyle={Styled.messagesContent(theme)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            messages.length > 0 ? (
              <Text size={11} appearance="gray" style={{ textAlign: 'center', marginTop: 8 }}>
                Double-tape un message pour l’aimer
              </Text>
            ) : null
          }
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
          <View>
            {/* Réponses rapides : envoyées d'un appui */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ gap: 6, paddingHorizontal: 12, paddingTop: 10 }}
            >
              {QUICK_REPLIES.map((reply) => (
                <Button
                  key={reply}
                  size="sm"
                  textSize={13}
                  appearance="surface"
                  borderRadius="rounded"
                  title={reply}
                  onPress={() => send(reply)}
                />
              ))}
            </ScrollView>
            <MessageComposer
              value={draft}
              onChange={setDraft}
              onSend={() => send()}
              onPressCamera={() => attach('camera')}
              onPressGallery={() => attach('library')}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
