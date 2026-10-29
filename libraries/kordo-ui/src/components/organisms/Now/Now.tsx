import { NowProps } from './Now.types';
import { UserInfo } from '../../molecules/UserInfo/UserInfo';
import { Text } from '../../atoms/Text/Text';
import { Animated, View, Easing } from 'react-native';
import { useTheme } from '@emotion/react';
import { useEffect, useRef } from 'react';

// Libellé constant d'un post "Now" (sémantique du type, non stocké en base).
const NOW_STATUS = 'en pleine séance de bloc';

// Durée d'un demi-cycle de clignotement du point "live" (apparition/disparition).
const PULSE_DURATION = 800;

// Carte d'une publication "Now" : utilisateur en cours de séance dans une salle.
// Réutilise Card (conteneur), UserInfo (avatar + badge Now) et Text (statut + salle).
export const Now: React.FC<NowProps> = ({ now, onPressUser, onPressGym }) => {
  const fullName = [now.user.firstName, now.user.lastName].filter(Boolean).join(' ');
  const theme = useTheme();

  // Opacité animée via l'API Animated de react-native (supportée nativement ET par react-native-web,
  // donc le clignotement s'affiche aussi bien dans l'app que dans Storybook, où reanimated est mocké).
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: PULSE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: PULSE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.neutral.white,
        paddingVertical: theme.spacing.md,
        boxShadow: theme.shadows.sm,
      }}
    >
      <UserInfo
        user={now.user}
        layout="row"
        highlightedAvatar
        primaryText={fullName || now.user.username}
        secondaryText={
          <Text appearance="gray" size="sm">
            {NOW_STATUS}
          </Text>
        }
        tertiaryText={
          <Text appearance="primary" size="sm" onPress={() => onPressGym?.(now.gym)}>
            {now.gym.name}
          </Text>
        }
        onPressUser={onPressUser ?? (() => {})}
      />
      {/* Indicateur "en direct" : point vert qui clignote, en haut à droite de la carte. */}
      <Animated.View
        style={{
          position: 'absolute',
          top: theme.spacing.lg,
          right: theme.spacing.lg,
          width: 10,
          height: 10,
          borderRadius: theme.borderRadius.rounded,
          backgroundColor: theme.colors.secondary.base,
          opacity,
        }}
      />
    </View>
  );
};
