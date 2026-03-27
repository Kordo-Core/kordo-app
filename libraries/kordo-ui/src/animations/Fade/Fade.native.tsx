import { forwardRef, useImperativeHandle } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { FadeProps } from './Fade.types';

export type FadeRef = {
  trigger: (type: 'in' | 'out') => void;
};

// Composant d'animation de fondu pour React Native, combine opacité et translation directionnelle
export const Fade = forwardRef<FadeRef, FadeProps>(
  ({ children, duration = 300, delay = 0, distance = 20, direction = 'up' }, ref) => {
    // Valeur partagée pour l'opacité, commence à 0 (invisible) pour permettre le fade-in
    const opacity = useSharedValue(0);
    // Valeur partagée pour le décalage de translation selon la direction choisie
    const translate = useSharedValue(0);

    // Exécute l'animation de fondu entrant ou sortant selon le type demandé
    const runFade = (type: 'in' | 'out') => {
      let start = 0;
      let end = 0;

      // Calcule les positions de départ et d'arrivée de la translation selon la direction et le sens (entrée ou sortie)
      switch (direction) {
        case 'up':
          start = type === 'in' ? distance : 0;
          end = type === 'in' ? 0 : distance;
          break;
        case 'down':
          start = type === 'in' ? -distance : 0;
          end = type === 'in' ? 0 : -distance;
          break;
        case 'left':
          start = type === 'in' ? distance : 0;
          end = type === 'in' ? 0 : -distance;
          break;
        case 'right':
          start = type === 'in' ? -distance : 0;
          end = type === 'in' ? 0 : distance;
          break;
      }

      // Place immédiatement l'élément à sa position de départ avant de lancer l'animation
      translate.value = start;
      opacity.value = type === 'in' ? 0 : 1;

      // Lance l'animation temporisée avec un délai optionnel pour la translation et l'opacité
      translate.value = withDelay(delay, withTiming(end, { duration }));
      opacity.value = withDelay(delay, withTiming(type === 'in' ? 1 : 0, { duration }));
    };

    // Expose la fonction trigger au composant parent via la ref pour déclencher le fondu de l'extérieur
    useImperativeHandle(ref, () => ({
      trigger: runFade,
    }));

    // Style animé qui combine opacité et translation, choisit l'axe selon la direction (vertical ou horizontal)
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform:
        direction === 'up' || direction === 'down'
          ? [{ translateY: translate.value }]
          : [{ translateX: translate.value }],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
  },
);
