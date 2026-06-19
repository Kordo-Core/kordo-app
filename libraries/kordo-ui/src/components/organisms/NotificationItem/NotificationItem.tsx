import { useState } from 'react';
import { Image, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { NotificationItemProps } from './NotificationItem.types';
import { UserInfo } from '../../molecules/UserInfo/UserInfo';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';

// Temps relatif compact : "5min", "12h", "3j", "2 sem", "4 mois".
const formatRelative = (iso: string): string => {
  const diffMin = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (diffMin < 60) return `${diffMin}min`;
  const h = Math.round(diffMin / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}j`;
  if (d < 30) return `${Math.round(d / 7)} sem`;
  return `${Math.round(d / 30)} mois`;
};

const THUMB_SIZE = 48;
// Délai avant de basculer Follow ↔ Following : moitié de l'animation Bounce (200 ms)
// pour éviter le saut visuel pendant le rebond du bouton.
const FOLLOW_SWITCH_DELAY = 100;

// Ligne de notification : avatar + message riche (acteur en gras, temps en gris),
// avec à droite un bouton Follow/Following (follow, follow_accept, meet) ou une
// miniature carrée (like_post, like_comment).
export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPressUser,
  onPressFollow,
  onPressGym,
  style,
}) => {
  const theme = useTheme();
  const { actor, kind } = notification;
  const fullName = [actor.firstName, actor.lastName].filter(Boolean).join(' ') || actor.username;

  // Suivi optimiste local : bascule Follow ↔ Following au clic
  const [following, setFollowing] = useState(!!notification.isFollowing);

  const isFollowKind = kind === 'follow' || kind === 'follow_accept' || kind === 'meet';
  // Types affichant une miniature à droite (publication likée ou bloc ouvert)
  const isThumbnailKind = kind === 'like_post' || kind === 'new_bloc';

  // Corps du message selon le type (l'acteur en gras est rendu séparément avant).
  const messageBody = (() => {
    switch (kind) {
      case 'follow':
        return <Text size="md">, a commencé à vous suivre.</Text>;
      case 'follow_accept':
        return <Text size="md">, a accepté votre demande de suivi.</Text>;
      case 'like_post':
        return <Text size="md">, a aimé votre dernière publication.</Text>;
      case 'meet': {
        const gym = notification.gym;
        return (
          <Text size="md">
            , que vous avez croisé à{' '}
            <Text
              size="md"
              appearance="primary"
              onPress={gym ? () => onPressGym?.(gym.id) : undefined}
            >
              {gym?.name}
            </Text>
            , est sur Kordo.
          </Text>
        );
      }
      default:
        return null;
    }
  })();

  const time = (
    <Text size="sm" appearance="gray">
      {formatRelative(notification.createdAt)}
    </Text>
  );

  // new_bloc : message centré sur la salle (pas d'acteur), nom de salle mis en avant
  const message =
    kind === 'new_bloc' ? (
      <Text size="md">
        Un nouveau bloc a été ouvert à{' '}
        <Text size="md" bold appearance="primary">
          {notification.gym?.name}
        </Text>{' '}
        {time}
      </Text>
    ) : (
      <Text size="md">
        <Text size="md" bold>
          {fullName}
        </Text>
        {messageBody} {time}
      </Text>
    );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>
        <UserInfo
          user={actor}
          layout="row"
          primaryText={message}
          onPressUser={() => onPressUser?.(actor)}
        />
      </View>

      {isFollowKind && (
        <Button
          size="md"
          borderRadius="square"
          appearance="secondary"
          inverted={following}
          title={following ? 'Following' : 'Follow'}
          onPress={() => {
            onPressFollow?.(notification);
            // Switch à mi-animation pour ne pas casser le rebond du bouton
            setTimeout(() => setFollowing((prev) => !prev), FOLLOW_SWITCH_DELAY);
          }}
        />
      )}

      {isThumbnailKind && (
        <View
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: theme.borderRadius.square,
            overflow: 'hidden',
            backgroundColor: theme.colors.neutral.gray.light,
          }}
        >
          {!!notification.thumbnailUrl && (
            <Image
              source={{ uri: notification.thumbnailUrl }}
              style={{ width: THUMB_SIZE, height: THUMB_SIZE }}
              resizeMode="cover"
            />
          )}
        </View>
      )}
    </View>
  );
};
