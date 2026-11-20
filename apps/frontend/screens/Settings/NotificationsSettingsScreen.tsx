import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Icon, ListRow, Text, Toggle } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SettingsGroup } from '../../components/SettingsGroup/SettingsGroup';

// Clés des interrupteurs, dans l'ordre des groupes de la maquette.
type NotificationKey =
  | 'comments'
  | 'likesOnPosts'
  | 'likesOnComments'
  | 'privateMessages'
  | 'calls'
  | 'newFollowers'
  | 'approvedRequests'
  | 'mentions'
  | 'meets'
  | 'newBlocs';

const GROUPS: { title: string; items: { key: NotificationKey; label: string }[] }[] = [
  {
    title: 'Tes contenus',
    items: [
      { key: 'comments', label: 'Commentaires sur tes publications' },
      { key: 'likesOnPosts', label: 'J’aime sur tes publications' },
      { key: 'likesOnComments', label: 'J’aime sur tes commentaires' },
    ],
  },
  {
    title: 'Messagerie',
    items: [
      { key: 'privateMessages', label: 'Messages privés' },
      { key: 'calls', label: 'Appels vidéo et audio' },
    ],
  },
  {
    title: 'Abonnements et abonnés',
    items: [
      { key: 'newFollowers', label: 'Nouveaux abonnés' },
      { key: 'approvedRequests', label: 'Demandes d’abonnement approuvées' },
    ],
  },
  {
    title: 'Autres',
    items: [
      { key: 'mentions', label: 'Mentions' },
      { key: 'meets', label: 'Personnes croisées (Meet)' },
      { key: 'newBlocs', label: 'Nouveaux blocs dans tes salles' },
    ],
  },
];

// Durées proposées pour le mode silencieux
const SILENT_DURATIONS = ['1 h', '8 h', 'Demain', 'Toujours'] as const;

const ALL_ENABLED: Record<NotificationKey, boolean> = {
  comments: true,
  likesOnPosts: true,
  likesOnComments: false,
  privateMessages: true,
  calls: true,
  newFollowers: true,
  approvedRequests: true,
  mentions: true,
  meets: true,
  newBlocs: true,
};

// Réglages de notification : un interrupteur par type, plus un mode silencieux qui prend
// la main sur tous les autres — quand il est actif, les autres passent en désactivé.
export default function NotificationsSettingsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [silentMode, setSilentMode] = useState(false);
  const [silentFor, setSilentFor] = useState<(typeof SILENT_DURATIONS)[number]>('1 h');
  const [settings, setSettings] = useState(ALL_ENABLED);

  const toggle = (key: NotificationKey) => (value: boolean) =>
    setSettings((current) => ({ ...current, [key]: value }));

  return (
    <ScreenLayout>
      <ScreenHeader
        gap={8}
        title="Notifications"
        eyebrow="Paramètres"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Mode silencieux (maquette) : carte sans filet, qui passe en encre pleine une fois
            activée et révèle alors le choix de durée */}
        <View
          style={{
            marginHorizontal: 14,
            marginTop: 6,
            padding: 16,
            // Repliée, la maquette garde l'écart de 10 px de la ligne des durées : 84 px
            paddingBottom: silentMode ? 16 : 26,
            gap: 10,
            borderRadius: theme.borderRadius.card,
            backgroundColor: silentMode ? theme.colors.text : theme.colors.surface,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(127, 127, 127, 0.16)',
              }}
            >
              <Icon
                name="alert"
                size={20}
                color={silentMode ? theme.colors.background : theme.colors.text}
              />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                size={16}
                extraBold
                style={{ color: silentMode ? theme.colors.background : theme.colors.text }}
              >
                Mode silencieux
              </Text>
              <Text
                size="xs"
                style={{
                  color: silentMode ? theme.colors.background : theme.colors.text,
                  opacity: 0.75,
                }}
              >
                Coupe toutes les notifications et appels
              </Text>
            </View>
            <Toggle value={silentMode} onChange={setSilentMode} />
          </View>
          {/* Durée du mode silencieux, proposée une fois qu'il est activé */}
          {silentMode && (
            <View style={{ flexDirection: 'row', gap: 6, paddingTop: 4 }}>
              {SILENT_DURATIONS.map((d) => {
                const on = d === silentFor;
                return (
                  <Pressable
                    key={d}
                    onPress={() => setSilentFor(d)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: on }}
                    style={{
                      flex: 1,
                      height: 34,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: on ? theme.colors.soft : 'rgba(127, 127, 127, 0.16)',
                    }}
                  >
                    <Text
                      size="xs"
                      extraBold
                      style={{ color: on ? theme.colors.softText : theme.colors.background }}
                    >
                      {d}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        {GROUPS.map((group) => (
          <SettingsGroup
            key={group.title}
            title={group.title}
            rowPadding={4}
            rowPaddingHorizontal={16}
            separatorInset={16}
          >
            {group.items.map((item) => (
              <ListRow
                key={item.key}
                primaryText={
                  <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                    {item.label}
                  </Text>
                }
                right={
                  <Toggle
                    value={!silentMode && settings[item.key]}
                    onChange={toggle(item.key)}
                    disabled={silentMode}
                  />
                }
              />
            ))}
          </SettingsGroup>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
