import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Header, Icon, ListRow, Section, Text, Toggle } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';

// Clés des interrupteurs, dans l'ordre des groupes de la maquette.
type NotificationKey =
  | 'comments'
  | 'likesOnPosts'
  | 'likesOnComments'
  | 'privateMessages'
  | 'calls'
  | 'newFollowers'
  | 'approvedRequests'
  | 'mentions';

const GROUPS: { title: string; items: { key: NotificationKey; label: string }[] }[] = [
  {
    title: 'Vos contenus',
    items: [
      { key: 'comments', label: 'Commentaires sur une de nos publications' },
      { key: 'likesOnPosts', label: "J'aimes sur une de nos publications" },
      { key: 'likesOnComments', label: "J'aimes sur un de nos commentaires" },
    ],
  },
  {
    title: 'Messageries',
    items: [
      { key: 'privateMessages', label: 'Messages privés' },
      { key: 'calls', label: 'Appels vidéos et audios' },
    ],
  },
  {
    title: 'Abonnements et abonnés',
    items: [
      { key: 'newFollowers', label: 'Nouveaux abonnés' },
      { key: 'approvedRequests', label: "Demandes d'abonnements approuvées" },
    ],
  },
  { title: 'Autres', items: [{ key: 'mentions', label: 'Mentions' }] },
];

const ALL_ENABLED: Record<NotificationKey, boolean> = {
  comments: true,
  likesOnPosts: true,
  likesOnComments: true,
  privateMessages: true,
  calls: true,
  newFollowers: true,
  approvedRequests: true,
  mentions: true,
};

// Réglages de notification : un interrupteur par type, plus un mode silencieux qui prend
// la main sur tous les autres — quand il est actif, les autres passent en désactivé.
export default function NotificationsSettingsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [silentMode, setSilentMode] = useState(false);
  const [settings, setSettings] = useState(ALL_ENABLED);

  const toggle = (key: NotificationKey) => (value: boolean) =>
    setSettings((current) => ({ ...current, [key]: value }));

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Notifications
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
        <Section style={{ gap: theme.spacing.lg }}>
          <ListRow
            primaryText={
              <Text appearance="black" bold>
                Mode Silencieux
              </Text>
            }
            secondaryText={
              <Text size="sm" appearance="gray">
                Désactiver toutes les notifications et appels de l&apos;application
              </Text>
            }
            right={<Toggle value={silentMode} onChange={setSilentMode} />}
          />
        </Section>

        {GROUPS.map((group) => (
          <Section key={group.title} style={{ gap: theme.spacing.lg }}>
            <Text size="sm" appearance="gray">
              {group.title}
            </Text>
            {group.items.map((item) => (
              <ListRow
                key={item.key}
                primaryText={<Text appearance="black">{item.label}</Text>}
                right={
                  <Toggle
                    value={!silentMode && settings[item.key]}
                    onChange={toggle(item.key)}
                    disabled={silentMode}
                  />
                }
              />
            ))}
          </Section>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
