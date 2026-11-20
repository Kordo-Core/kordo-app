import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { NotificationKind } from 'core';
import { NotificationProps } from './Notification.types';
import { Text } from '../../atoms/Text/Text';
import { motion } from '../../../animations/motion';
import { CENTERED_TEXT } from '../../../utils/centeredText';

// Temps relatif compact : "12 min", "2 h", "3 j", "2 sem", "4 mois".
const formatRelative = (iso: string): string => {
  const diffMin = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (diffMin < 60) return `${diffMin} min`;
  const h = Math.round(diffMin / 60);
  if (h < 24) return `${h} h`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d} j`;
  if (d < 30) return `${Math.round(d / 7)} sem`;
  return `${Math.round(d / 30)} mois`;
};

// Pastille du type de notification, posée sur l'avatar (tracés du design D)
const KIND_ICONS: Record<NotificationKind, string> = {
  follow: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8',
  follow_accept: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8',
  meet: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 100 8 4 4 0 000-8M19 8v6M22 11h-6',
  like_post:
    'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z',
  new_bloc: 'M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z',
};

// Notification « sociale » (personne) ou « salle » : sert au filtre de l'écran
export const isGymNotification = (kind: NotificationKind) => kind === 'new_bloc';

// Carte de notification (design D) : avatar avec pastille de type, message riche (acteur en
// gras, temps en gris), bouton Suivre/Abonné ou miniature à droite, point orange tant que
// la notification n'est pas lue. Un appui la marque comme lue.
export const Notification: React.FC<NotificationProps> = ({
  notification,
  onPressUser,
  onPressFollow,
  onPressGym,
  isRead,
  onRead,
  style,
}) => {
  const theme = useTheme();
  const { actor, kind } = notification;
  const fullName = [actor.firstName, actor.lastName].filter(Boolean).join(' ') || actor.username;
  const read = isRead ?? notification.isRead;

  // Suivi optimiste local, avec un rebond du bouton à chaque bascule
  const [following, setFollowing] = useState(!!notification.isFollowing);
  const pop = useSharedValue(1);
  const popStyle = useAnimatedStyle(() => ({ transform: [{ scale: pop.value }] }));
  const toggleFollow = () => {
    onPressFollow?.(notification);
    setFollowing((prev) => !prev);
    pop.value = withSequence(withTiming(0.6, { duration: 0 }), withSpring(1, motion.press));
  };

  const isFollowKind = kind === 'follow' || kind === 'follow_accept' || kind === 'meet';
  const isThumbnailKind = kind === 'like_post' || kind === 'new_bloc';
  const badgeColor = kind === 'like_post' ? theme.colors.error.base : theme.colors.secondary.base;
  const gymName = notification.gym?.name;

  // Corps du message selon le type (l'acteur en gras est rendu avant)
  const body = (() => {
    switch (kind) {
      case 'follow':
        return 'a commencé à te suivre.';
      case 'follow_accept':
        return 'a accepté ta demande de suivi.';
      case 'like_post':
        return 'a aimé ta publication.';
      case 'meet':
        return (
          <>
            que tu as croisé à{' '}
            <Text
              size={14}
              bold
              appearance="primary"
              onPress={notification.gym ? () => onPressGym?.(notification.gym!.id) : undefined}
            >
              {gymName}
            </Text>{' '}
            est sur Kordo.
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <Pressable
      onPress={() => onRead?.(notification)}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: 14,
          borderRadius: theme.borderRadius.card,
          backgroundColor:
            read && theme.mode === 'light' ? 'rgba(255, 255, 255, 0.55)' : theme.colors.surface,
          // Cartes de notification : ombre portée légère, sans filet (maquette « sport »)
          boxShadow: `0px 1px 2px rgba(${theme.colors.scrim}, 0.05)`,
        },
        style,
      ]}
    >
      {/* Avatar (ou image du bloc pour new_bloc) + pastille du type */}
      <Pressable onPress={() => (kind === 'new_bloc' ? undefined : onPressUser?.(actor))}>
        <Image
          source={{
            uri:
              kind === 'new_bloc' && notification.thumbnailUrl
                ? notification.thumbnailUrl
                : actor.avatarUrl,
          }}
          style={{
            width: 46,
            height: 46,
            borderRadius: theme.borderRadius.square,
            backgroundColor: theme.colors.surfaceAlt,
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: -4,
            bottom: -4,
            // 22 px + contour blanc de 2 px (la maquette compte le contour en plus), dans les deux thèmes
            width: 26,
            height: 26,
            borderRadius: 13,
            borderWidth: 2,
            borderColor: theme.colors.neutral.white,
            backgroundColor: badgeColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
            <Path
              d={KIND_ICONS[kind]}
              stroke="#FFFFFF"
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </Pressable>

      <Text size={14} style={{ flex: 1, lineHeight: 20 }}>
        {kind === 'new_bloc' ? (
          <>
            <Text size={14} bold>
              {gymName}
            </Text>{' '}
            a ouvert un nouveau bloc.
          </>
        ) : (
          <>
            <Text size={14} bold onPress={() => onPressUser?.(actor)}>
              {fullName}
            </Text>{' '}
            {body}
          </>
        )}
        <Text size={14} appearance="gray">
          {' '}
          · {formatRelative(notification.createdAt)}
        </Text>
      </Text>

      {isFollowKind && (
        <Animated.View style={popStyle}>
          <Pressable
            onPress={toggleFollow}
            accessibilityRole="button"
            style={({ pressed }) => ({
              height: 34,
              paddingHorizontal: 14,
              borderRadius: theme.borderRadius.square,
              justifyContent: 'center',
              backgroundColor: following ? theme.colors.surfaceAlt : theme.colors.secondary.base,
              transform: [{ scale: pressed ? motion.pressScale : 1 }],
            })}
          >
            <Text
              size="sm"
              extraBold
              appearance={following ? undefined : 'white'}
              style={CENTERED_TEXT}
            >
              {following ? 'Abonné' : 'Suivre'}
            </Text>
          </Pressable>
        </Animated.View>
      )}

      {isThumbnailKind && kind !== 'new_bloc' && !!notification.thumbnailUrl && (
        <Image
          source={{ uri: notification.thumbnailUrl }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 5,
            backgroundColor: theme.colors.surfaceAlt,
          }}
        />
      )}

      {/* Point orange : pas encore lue */}
      {!read && (
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.colors.primary.base,
          }}
        />
      )}
    </Pressable>
  );
};
