import { forwardRef, useImperativeHandle } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { ShakeProps } from './Shake.types';

export type ShakeRef = {
  trigger: () => void;
};

// Composant d'animation de secousse, crée un mouvement horizontal rapide pour signaler une erreur ou attirer l'attention
export const Shake = forwardRef<ShakeRef, ShakeProps>(
  ({ children, amplitude = 10, duration = 50 }, ref) => {
    // Valeur partagée pour le décalage horizontal, à 0 au repos (position neutre)
    const offset = useSharedValue(0);

    // Style animé qui applique la translation horizontale en temps réel selon la valeur partagée
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value }],
      width: '100%',
    }));

    // Déclenche une séquence de 5 mouvements alternés gauche-droite pour simuler une secousse,
    // puis revient à la position initiale (0)
    const trigger = () => {
      offset.value = withSequence(
        withTiming(-amplitude, { duration }),
        withTiming(amplitude, { duration }),
        withTiming(-amplitude, { duration }),
        withTiming(amplitude, { duration }),
        withTiming(0, { duration }),
      );
    };

    // Expose la fonction trigger au composant parent via la ref pour déclencher la secousse de l'extérieur
    useImperativeHandle(ref, () => ({ trigger }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
  },
);
