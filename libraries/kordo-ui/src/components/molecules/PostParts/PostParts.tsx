import { useEffect, useRef } from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@emotion/react';
import { UserPublic } from 'core';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { motion } from '../../../animations/motion';
import { CENTERED_TEXT } from '../../../utils/centeredText';

const DOUBLE_TAP_MS = 280;

// Morceaux communs aux cartes du fil (activité, publication, message), design D.

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

// Date relative de l'en-tête (« Il y a 2 h », « Hier »), date courte au-delà d'une semaine
export const formatPostDate = (iso: string) => {
  const d = new Date(iso);
  const minutes = Math.floor((Date.now() - d.getTime()) / 60000);
  if (minutes < 1) return 'À l’instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Hier';
  if (days < 7) return `Il y a ${days} j`;
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
};

// Conteneur d'une carte du fil : arrondie, ombre douce, marge latérale
export const usePostCardStyle = () => {
  const theme = useTheme();
  return {
    alignSelf: 'stretch' as const,
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden' as const,
    boxShadow: theme.shadows.sm,
  };
};

// En-tête : avatar carré arrondi, nom, « date · lieu », étiquette du type de post
export function PostHeader(props: {
  user: UserPublic;
  meta: string;
  tag: string;
  onPressUser?: (user: UserPublic) => void;
}) {
  const theme = useTheme();
  const fullName = [props.user.firstName, props.user.lastName].filter(Boolean).join(' ');
  return (
    <Pressable
      onPress={() => props.onPressUser?.(props.user)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 14,
        paddingHorizontal: theme.spacing.lg,
      }}
    >
      <Image
        source={{ uri: props.user.avatarUrl }}
        style={{
          width: theme.avatarSizes.sm,
          height: theme.avatarSizes.sm,
          borderRadius: theme.borderRadius.square,
          backgroundColor: theme.colors.surfaceAlt,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text size="md" bold numberOfLines={1}>
          {fullName || props.user.username}
        </Text>
        <Text size="xs" appearance="gray" numberOfLines={1}>
          {props.meta}
        </Text>
      </View>
      <View
        style={{
          height: 28,
          paddingHorizontal: 10,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: theme.colors.soft,
          justifyContent: 'center',
        }}
      >
        <Text size="xs" extraBold style={[{ color: theme.colors.softText }, CENTERED_TEXT]}>
          {props.tag}
        </Text>
      </View>
    </Pressable>
  );
}

// Rangée d'actions : j'aime (le cœur rebondit), commentaires, options « ⋯ »
export function PostActions(props: {
  likesEnabled: boolean;
  commentsEnabled: boolean;
  liked: boolean;
  likeCount: number;
  onToggleLike: () => void;
  commentCount: number;
  onPressComments: () => void;
  /** Bouton « ⋯ » : ouvre le panneau d'options du post (partager, signaler, supprimer…) */
  onPressOptions: () => void;
}) {
  const theme = useTheme();
  const pop = useSharedValue(1);
  const wasLiked = useRef(props.liked);
  useEffect(() => {
    if (props.liked && !wasLiked.current) {
      pop.value = withSequence(withTiming(0.6, { duration: 0 }), withSpring(1, motion.press));
    }
    wasLiked.current = props.liked;
  }, [props.liked, pop]);
  const popStyle = useAnimatedStyle(() => ({ transform: [{ scale: pop.value }] }));

  const actionStyle = ({ pressed }: { pressed: boolean }) => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    height: 38,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 5,
    transform: [{ scale: pressed ? motion.pressScale : 1 }],
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingTop: 6,
        paddingHorizontal: 10,
        paddingBottom: theme.spacing.md,
      }}
    >
      {props.likesEnabled && (
        <Pressable
          onPress={props.onToggleLike}
          accessibilityLabel="J’aime"
          accessibilityState={{ selected: props.liked }}
          style={(s) => [
            actionStyle(s),
            { backgroundColor: props.liked ? theme.colors.error.lighter : 'transparent' },
          ]}
        >
          <Animated.View style={popStyle}>
            <Icon
              name={props.liked ? 'HeartFilled' : 'HeartRegular'}
              size="md"
              color={props.liked ? theme.colors.error.base : theme.colors.text}
            />
          </Animated.View>
          <Text bold size="sm" appearance={props.liked ? 'error' : 'black'} style={CENTERED_TEXT}>
            {props.likeCount}
          </Text>
        </Pressable>
      )}
      {props.commentsEnabled && (
        <Pressable
          onPress={props.onPressComments}
          accessibilityLabel="Commentaires"
          style={actionStyle}
        >
          <Icon name="ChatRegular" size="md" color={theme.colors.text} />
          <Text bold size="sm" style={CENTERED_TEXT}>
            {props.commentCount}
          </Text>
        </Pressable>
      )}
      <View style={{ flex: 1 }} />
      <Pressable
        onPress={props.onPressOptions}
        accessibilityLabel="Options de la publication"
        style={(s) => [
          actionStyle(s),
          { width: 38, paddingHorizontal: 0, justifyContent: 'center' as const },
        ]}
      >
        <Icon name="MoreHorizontalRegular" size={24} color={theme.colors.text} />
      </Pressable>
    </View>
  );
}

// Grand cœur au double tap sur un média : pop puis s'envole en fondu. Un appui simple peut aussi
// avoir son action (ouvrir une vidéo) : elle part après le délai du double tap, et est annulée
// si un second appui arrive à temps.
export function useDoubleTapLike(
  onLike: () => void,
  enabled: boolean,
  onSingleTap?: (index: number) => void,
) {
  const heart = useSharedValue(0);
  const lastTap = useRef(0);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (pending.current) clearTimeout(pending.current);
    },
    [],
  );
  const heartStyle = useAnimatedStyle(() => ({
    opacity: heart.value > 0 && heart.value < 2 ? Math.min(1, heart.value * 1.5) : 0,
    transform: [
      { scale: Math.min(heart.value, 1.1) },
      { translateY: heart.value > 1 ? -(heart.value - 1) * 30 : 0 },
    ],
  }));
  // J'aime + grand cœur (aussi appelé directement par un geste de double tap)
  const like = () => {
    if (!enabled) return;
    onLike();
    heart.value = withSequence(
      withTiming(0, { duration: 0 }),
      withSpring(1, motion.press),
      withTiming(2, { duration: 450 }),
    );
  };
  const onPress = (index = 0) => {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0;
      if (pending.current) clearTimeout(pending.current);
      pending.current = null;
      like();
      return;
    }
    lastTap.current = now;
    if (onSingleTap) {
      pending.current = setTimeout(() => {
        pending.current = null;
        onSingleTap(index);
      }, DOUBLE_TAP_MS);
    }
  };
  return { onPress, like, heartStyle };
}

export function BigHeart({ style }: { style: ReturnType<typeof useAnimatedStyle> }) {
  const theme = useTheme();
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        { position: 'absolute', top: '50%', left: '50%', marginTop: -48, marginLeft: -48 },
        style,
      ]}
    >
      <Icon name="HeartFilled" size={96} color={theme.colors.neutral.white} />
    </Animated.View>
  );
}
