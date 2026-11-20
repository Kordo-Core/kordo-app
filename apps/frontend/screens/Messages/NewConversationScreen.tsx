import { useMemo, useState } from 'react';
import { Image, Platform, ScrollView, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { UserPublic } from 'core';
import { Icon, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { matchesQuery } from '../../utils/matchesQuery';
import * as Styled from './ConversationsScreen.styles';
import { findConversationWith, getMessageableUsers, getUserHomeGymName } from 'fake_data';
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
      <ScreenHeader title="Nouveau message" eyebrow="Messages" onBack={() => navigation.goBack()}>
        {/* Champ destinataire « À : » */}
        <Styled.ToField>
          <Text size={14} extraBold>
            À :
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Rechercher..."
            placeholderTextColor={theme.colors.textMuted}
            accessibilityLabel="Rechercher un contact"
            style={{
              flex: 1,
              fontSize: 15,
              color: theme.colors.text,
              fontFamily: theme.fonts.medium,
              ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
            }}
          />
        </Styled.ToField>
      </ScreenHeader>

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
        <Text variant="eyebrow" size={12} style={{ marginTop: 6, marginHorizontal: 6 }}>
          Suggestions
        </Text>

        {visible.map((user, i) => {
          const online = !!findConversationWith(user.id)?.isContactOnline;
          return (
            <Animated.View key={user.id} entering={FadeInDown.delay(i * 35).duration(400)}>
              <Styled.ContactRow onPress={() => startConversation(user)} accessibilityRole="button">
                <View>
                  <Image source={{ uri: user.avatarUrl }} style={Styled.contactAvatar} />
                  {online && <Styled.ContactOnlineDot />}
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text size="md" bold numberOfLines={1}>
                    {[user.firstName, user.lastName].filter(Boolean).join(' ') || user.username}
                  </Text>
                  <Text size="xs" appearance="gray" numberOfLines={1}>
                    {online ? 'En ligne' : getUserHomeGymName(user.id)}
                  </Text>
                </View>
                <Styled.ContactAction>
                  <Icon name="SendRegular" size={18} color={theme.colors.softText} />
                </Styled.ContactAction>
              </Styled.ContactRow>
            </Animated.View>
          );
        })}

        {visible.length === 0 && (
          <Styled.Empty>
            <Text appearance="gray">Aucun contact trouvé</Text>
          </Styled.Empty>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
