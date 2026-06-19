import React, { useMemo } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Path, SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Header, Icon, NotificationItem, Text, theme } from 'kordo-ui';
import * as Styled from './NotificationsScreen.styles';
import { getNotificationFeed } from 'fake_data';
import { RootStackParamList } from '../../App';

// Bandeau de fin : signale que toutes les notifications non lues ont été vues.
function CaughtUpBanner() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      }}
    >
      {/* Cercle + coche dessinés (trait fin contrôlé via strokeWidth, contrairement à l'icône Fluent pleine) */}
      <Svg width={theme.avatarSizes.md} height={theme.avatarSizes.md} viewBox="0 0 24 24">
        <Circle
          cx={12}
          cy={12}
          r={10.5}
          stroke={theme.colors.neutral.black}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M7.5 12.3 L10.6 15.4 L16.5 8.8"
          stroke={theme.colors.neutral.black}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
      <View style={{ flex: 1 }}>
        <Text bold>Vous êtes à jour</Text>
        <Text size="md" appearance="primary">
          Les prochaines notifications ont déjà été vues
        </Text>
      </View>
    </View>
  );
}

export default function NotificationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { height } = useWindowDimensions();
  const sections = useMemo(() => getNotificationFeed(), []);

  // Bascule lu/non-lu : on insère le bandeau juste après la dernière notification non lue
  // (dans l'ordre d'affichage récent → ancien). S'il n'y a aucune non-lue, le bandeau est en tête.
  const { lastUnreadId, hasUnread } = useMemo(() => {
    const items = sections.flatMap((s) => s.items);
    const lastUnread = [...items].reverse().find((n) => !n.isRead);
    return { lastUnreadId: lastUnread?.id, hasUnread: !!lastUnread };
  }, [sections]);

  // Conteneur de section : pleine largeur, sans arrondi, ombre légère identique aux cartes de post
  const sectionStyle = {
    width: '100%' as const,
    borderRadius: 0,
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <Styled.Container>
      <Styled.Background pointerEvents="none">
        <SvgUri
          width={height}
          height={height}
          uri="https://res.cloudinary.com/dqmegz5dn/image/upload/v1781135028/topo-primary-dark_wdsvmf.svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </Styled.Background>

      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}
      >
        <Text size="lg" bold>
          Notifications
        </Text>
      </Header>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.sm,
        }}
      >
        {/* Aucune non-lue : le bandeau "à jour" est affiché en tête */}
        {!hasUnread && (
          <Card style={sectionStyle}>
            <CaughtUpBanner />
          </Card>
        )}

        {sections.map((section) => (
          <Card key={section.key} style={sectionStyle}>
            <Text size="md" bold style={{ marginBottom: theme.spacing.sm }}>
              {section.title}
            </Text>
            {section.items.map((notification) => (
              <React.Fragment key={notification.id}>
                <NotificationItem
                  notification={notification}
                  onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
                  onPressFollow={() => {}}
                  onPressGym={(gymId) => navigation.navigate('Gym', { gymId })}
                />
                {notification.id === lastUnreadId && <CaughtUpBanner />}
              </React.Fragment>
            ))}
          </Card>
        ))}
      </ScrollView>
    </Styled.Container>
  );
}
