import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Icon, ListRow, Radio, SegmentedControl, Text, Toggle } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SettingsGroup } from '../../components/SettingsGroup/SettingsGroup';
import { SettingIcon } from '../../components/SettingIcon/SettingIcon';
import { getBlockedUsers, getCloseFriends } from 'fake_data';
import { RootStackParamList } from '../../App';

// Qui voit les séances en direct (« Now ») de l'utilisateur
const LIVE_AUDIENCES = [{ text: 'Abonnés' }, { text: 'Proches' }, { text: 'Personne' }];

// Qui peut mentionner l'utilisateur
const MENTION_OPTIONS = [
  { label: 'Tout le monde', hint: 'Recommandé pour les compétitions' },
  { label: 'Personnes que tu suis', hint: '34 personnes' },
  { label: 'Personne', hint: 'Les mentions seront bloquées' },
];

// Confidentialité (design D) : compte public ou privé, audience des séances en direct, mentions,
// puis les réglages d'interaction qui ont leur propre écran.
export default function AccountPrivacyScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [isPrivate, setIsPrivate] = useState(false);
  const [liveAudience, setLiveAudience] = useState(1);
  const [mentions, setMentions] = useState(0);

  const chevron = <Icon name="chevron-right" size="sm" color={theme.colors.textMuted} />;
  const withCount = (count: number) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Text size="sm" appearance="gray">
        {count}
      </Text>
      {chevron}
    </View>
  );

  return (
    <ScreenLayout>
      <ScreenHeader
        gap={8}
        title="Confidentialité"
        eyebrow="Paramètres"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Carte du compte privé (maquette) : 16 px de marge, pastille de 42 px, titre 16 px */}
        <SettingsGroup rowPadding={6} rowPaddingHorizontal={16} style={{ marginTop: 6 }}>
          <View>
            <ListRow
              left={
                <SettingIcon size={42} name="lock-closed" tone={isPrivate ? 'green' : 'neutral'} />
              }
              primaryText={
                <Text size={16} appearance="black" extraBold>
                  Compte privé
                </Text>
              }
              secondaryText={
                <Text size="xs" appearance="gray">
                  {isPrivate ? 'Activé · 3 demandes en attente' : 'Ton profil est visible par tous'}
                </Text>
              }
              right={<Toggle value={isPrivate} onChange={setIsPrivate} />}
            />
            {isPrivate && (
              <View
                style={{
                  marginTop: 4,
                  marginBottom: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderRadius: 6,
                  backgroundColor: theme.colors.surfaceAlt,
                }}
              >
                <Text size="sm" appearance="gray" style={{ lineHeight: 19.5 }}>
                  Seuls les abonnés que tu approuves voient tes publications et activités. Les
                  autres verront un bouton « Demander à s’abonner ». Tes abonnés actuels ne sont pas
                  affectés.
                </Text>
              </View>
            )}
          </View>
        </SettingsGroup>

        <View style={{ marginHorizontal: 14, gap: theme.spacing.sm }}>
          <Text variant="eyebrow" size={12} style={{ marginHorizontal: 6, marginTop: 6 }}>
            Qui peut voir tes séances en direct
          </Text>
          <SegmentedControl
            segments={LIVE_AUDIENCES}
            selectedIndex={liveAudience}
            onSelect={setLiveAudience}
            variant="surface"
            size="md"
            borderRadius="square"
          />
        </View>

        <SettingsGroup
          title="Qui peut te @mentionner"
          rowPadding={5}
          rowPaddingHorizontal={16}
          separatorInset={0}
        >
          {MENTION_OPTIONS.map(({ label, hint }, i) => (
            <ListRow
              key={label}
              onPress={() => setMentions(i)}
              style={
                mentions === i
                  ? {
                      width: 'auto',
                      // Fond de l'option choisie : couvre toute la ligne, marges comprises
                      marginHorizontal: -16,
                      paddingHorizontal: 16,
                      marginVertical: -5,
                      paddingVertical: 15,
                      backgroundColor: theme.colors.secondary.lightest,
                    }
                  : undefined
              }
              primaryText={
                <Text appearance="black" bold>
                  {label}
                </Text>
              }
              secondaryText={
                <Text size="xs" appearance="gray">
                  {hint}
                </Text>
              }
              right={<Radio selected={mentions === i} onSelect={() => setMentions(i)} />}
            />
          ))}
        </SettingsGroup>
        <Text size="xs" appearance="gray" style={{ marginHorizontal: 20, lineHeight: 18 }}>
          Si une personne non autorisée essaie de t’identifier, elle sera prévenue que tu ne
          l’acceptes pas.
        </Text>

        <SettingsGroup title="Interactions">
          <Pressable onPress={() => navigation.navigate('CloseFriends')}>
            <ListRow
              left={<SettingIcon name="star" tone="orange" />}
              primaryText={<Text appearance="black">Ami(e)s proches</Text>}
              right={withCount(getCloseFriends().length)}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('BlockedAccounts')}>
            <ListRow
              left={<SettingIcon name="dismiss-circle" tone="red" />}
              primaryText={<Text appearance="black">Comptes bloqués</Text>}
              right={withCount(getBlockedUsers().length)}
            />
          </Pressable>
          <ListRow
            left={<SettingIcon name="lock-closed" tone="green" />}
            primaryText={<Text appearance="black">Mots masqués</Text>}
            right={withCount(4)}
          />
        </SettingsGroup>
      </ScrollView>
    </ScreenLayout>
  );
}
