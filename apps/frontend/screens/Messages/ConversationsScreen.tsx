import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { Button, Icon, IconButton, Text } from 'kordo-ui';
import { ConversationPublic } from 'core';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { matchesQuery } from '../../utils/matchesQuery';
import * as Styled from './ConversationsScreen.styles';
import { formatListTime, isIncomingRequest, messagePreview, sortByRecency } from './Messages.utils';
import { CURRENT_USER, getConversations } from 'fake_data';
import { RootStackParamList } from '../../App';

const fullNameOf = (c: ConversationPublic) =>
  [c.contact.firstName, c.contact.lastName].filter(Boolean).join(' ') || c.contact.username;

// Liste des conversations (design D) : recherche, demandes reçues à accepter ou refuser,
// grimpeurs en ligne, puis une carte par conversation, la plus récente en premier.
export default function ConversationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [requestsOpen, setRequestsOpen] = useState(true);

  // Les conversations lues localement ne doivent pas réapparaître non lues au retour depuis le
  // fil : l'écran garde la liste dans son état plutôt que de la relire à chaque rendu.
  const [conversations, setConversations] = useState(() => getConversations());

  const requests = conversations.filter((c) => isIncomingRequest(c, CURRENT_USER.id));
  const online = conversations.filter((c) => c.isContactOnline && c.status === 'accepted');
  const rows = useMemo(
    () =>
      sortByRecency(
        conversations.filter(
          (c) =>
            !isIncomingRequest(c, CURRENT_USER.id) &&
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
  const acceptRequest = (id: string) =>
    setConversations((current) =>
      current.map((c) => (c.id === id ? { ...c, status: 'accepted' } : c)),
    );
  const refuseRequest = (id: string) =>
    setConversations((current) => current.filter((c) => c.id !== id));

  return (
    <ScreenLayout>
      <ScreenHeader
        gap={12}
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
        <SearchToolbar value={query} onChange={setQuery} placeholder="Rechercher un grimpeur…" />
      </ScreenHeader>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: theme.spacing.md,
          paddingHorizontal: 14,
          paddingTop: theme.spacing.xs,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Demandes de message : repliables, à accepter ou refuser sans ouvrir le fil */}
        {requests.length > 0 && !query && (
          <Styled.Requests>
            <Pressable
              onPress={() => setRequestsOpen((o) => !o)}
              accessibilityState={{ expanded: requestsOpen }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingVertical: theme.spacing.md,
                paddingHorizontal: 14,
              }}
            >
              <Icon name="MailRegular" size={18} color={theme.colors.secondary.base} />
              <Text size={14} extraBold style={{ flex: 1, color: theme.colors.secondary.base }}>
                Demandes de message · {requests.length}
              </Text>
              <View style={{ transform: [{ rotate: requestsOpen ? '180deg' : '0deg' }] }}>
                <Icon name="ChevronDownRegular" size={16} color={theme.colors.softText} />
              </View>
            </Pressable>
            {requestsOpen &&
              requests.map((c) => (
                <Styled.RequestRow key={c.id}>
                  <Pressable
                    onPress={() => openConversation(c.id)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}
                  >
                    <Image source={{ uri: c.contact.avatarUrl }} style={Styled.requestAvatar} />
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text size={14} extraBold numberOfLines={1}>
                        {fullNameOf(c)}
                      </Text>
                      <Text size="xs" appearance="gray" numberOfLines={1}>
                        {messagePreview(c.lastMessage, CURRENT_USER.id)}
                      </Text>
                    </View>
                  </Pressable>
                  <Button
                    size="sm"
                    textSize={12}
                    appearance="surface"
                    borderRadius="square"
                    containerStyle={{ borderRadius: 4, paddingHorizontal: 10 }}
                    title="Refuser"
                    onPress={() => refuseRequest(c.id)}
                  />
                  <Button
                    size="sm"
                    textSize={12}
                    appearance="secondary"
                    borderRadius="square"
                    containerStyle={{ borderRadius: 4, paddingHorizontal: 10 }}
                    title="Accepter"
                    onPress={() => acceptRequest(c.id)}
                  />
                </Styled.RequestRow>
              ))}
          </Styled.Requests>
        )}

        {/* Grimpeurs en ligne : raccourci vers le fil */}
        {online.length > 0 && !query && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14, paddingHorizontal: 4, paddingTop: 4 }}
          >
            {online.map((c, i) => (
              <Animated.View key={c.id} entering={ZoomIn.delay(i * 60).springify()}>
                <Pressable
                  onPress={() => openConversation(c.id)}
                  style={{ alignItems: 'center', gap: 6, width: 58 }}
                >
                  <View>
                    <Image source={{ uri: c.contact.avatarUrl }} style={Styled.onlineAvatar} />
                    <Styled.OnlineDot />
                  </View>
                  <Text size="xs" bold numberOfLines={1}>
                    {c.contact.firstName ?? c.contact.username}
                  </Text>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        )}

        <View style={{ gap: 6 }}>
          {rows.map((c, i) => {
            const unread = c.unreadCount > 0;
            return (
              <Animated.View key={c.id} entering={FadeInDown.delay(i * 35).duration(400)}>
                <Styled.Row onPress={() => openConversation(c.id)} accessibilityRole="button">
                  <Image source={{ uri: c.contact.avatarUrl }} style={Styled.rowAvatar} />
                  <View style={{ flex: 1, minWidth: 0, gap: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                      <Text size="md" bold numberOfLines={1} style={{ flexShrink: 1 }}>
                        {fullNameOf(c)}
                      </Text>
                      <Text size="xs" bold appearance={unread ? 'primary' : 'gray'}>
                        {formatListTime(c.lastMessage?.createdAt)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Text
                        size="sm"
                        bold={unread}
                        appearance={unread ? 'black' : 'gray'}
                        numberOfLines={1}
                        style={{ flex: 1 }}
                      >
                        {messagePreview(c.lastMessage, CURRENT_USER.id)}
                      </Text>
                      {unread && (
                        // Compteur rond orange de 20 px (maquette)
                        <View
                          style={{
                            minWidth: 20,
                            height: 20,
                            paddingHorizontal: 6,
                            borderRadius: 999,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.colors.primary.base,
                          }}
                        >
                          <Text
                            size={11}
                            extraBold
                            style={{ color: theme.colors.navBarAccentIcon }}
                          >
                            {c.unreadCount}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </Styled.Row>
              </Animated.View>
            );
          })}
        </View>

        {rows.length === 0 &&
          (query ? (
            <Styled.Empty>
              <Text appearance="gray">Aucune conversation pour « {query} »</Text>
            </Styled.Empty>
          ) : (
            <EmptyState
              icon="ChatRegular"
              title="Aucune conversation"
              text="Écris à un grimpeur croisé en séance ou à un ami pour organiser ta prochaine session."
              actionLabel="Nouveau message"
              onAction={() => navigation.navigate('NewConversation')}
            />
          ))}
      </ScrollView>
    </ScreenLayout>
  );
}
