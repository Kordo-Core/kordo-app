import React from 'react';
import { Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BounceProps } from './Bounce.types';

// Composant d'animation de rebond pour React Native, réduit visuellement l'élément au toucher pour donner un retour tactile
export const Bounce: React.FC<BounceProps> = (props) => {
  const { children, onPress, scaleTo = 0.95, duration = 200, disabled = false } = props;

  // Valeur partagée Reanimated pour piloter l'échelle de la vue animée (commence à 1 = taille normale)
  const scale = useSharedValue(1);

  // Style animé dérivé de la valeur partagée, applique la transformation d'échelle en temps réel
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Déclenché quand l'utilisateur commence à appuyer : réduit l'élément pour simuler un enfoncement
  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withTiming(scaleTo, { duration });
    }
  };

  // Déclenché quand l'utilisateur relâche : restaure la taille originale pour compléter l'effet de rebond
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration });
  };

  // Transmet l'événement de pression au callback parent uniquement si le composant est actif
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      style={[{ alignSelf: 'center' }, props.style]}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};
