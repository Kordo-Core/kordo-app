import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Icon, Notification, Section, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { getNotificationFeed } from 'fake_data';
import { RootStackParamList } from '../../App';

// Bandeau de fin : signale que toutes les notifications non lues ont été vues.
function CaughtUpBanner() {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.soft,
        }}
      >
        <Icon name="CheckmarkRegular" size={20} color={theme.colors.softText} />
      </View>
      <View style={{ flex: 1 }}>
        <Text bold>Tu es à jour</Text>
        <Text size="sm" appearance="gray">
          Les notifications suivantes ont déjà été vues
        </Text>
      </View>
    </View>
  );
}

export default function NotificationsScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const sections = useMemo(() => getNotificationFeed(), []);

  // Bascule lu/non-lu : on insère le bandeau juste après la dernière notification non lue
  // (dans l'ordre d'affichage récent → ancien). S'il n'y a aucune non-lue, le bandeau est en tête.
  const { lastUnreadId, hasUnread } = useMemo(() => {
    const items = sections.flatMap((s) => s.items);
    const lastUnread = [...items].reverse().find((n) => !n.isRead);
    return { lastUnreadId: lastUnread?.id, hasUnread: !!lastUnread };
  }, [sections]);

  return (
    <ScreenLayout>
      <ScreenHeader title="Notifications" eyebrow="Activité" onBack={() => navigation.goBack()} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.md,
          paddingTop: theme.spacing.xs,
          paddingBottom: theme.spacing.xxl,
        }}
      >
        {/* Aucune non-lue : le bandeau "à jour" est affiché en tête */}
        {!hasUnread && (
          <Section>
            <CaughtUpBanner />
          </Section>
        )}

        {sections.map((section) => (
          <Section key={section.key}>
            <Text variant="eyebrow">{section.title}</Text>
            {section.items.map((notification) => (
              <React.Fragment key={notification.id}>
                <Notification
                  notification={notification}
                  onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
                  onPressFollow={() => {}}
                  onPressGym={(gymId) => navigation.navigate('Gym', { gymId })}
                />
                {notification.id === lastUnreadId && <CaughtUpBanner />}
              </React.Fragment>
            ))}
          </Section>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
