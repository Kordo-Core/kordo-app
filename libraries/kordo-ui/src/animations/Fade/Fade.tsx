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

export const Fade = forwardRef<FadeRef, FadeProps>(
  ({ children, duration = 300, delay = 0, distance = 20, direction = 'up' }, ref) => {
    const opacity = useSharedValue(0);
    const translate = useSharedValue(0);

    const runFade = (type: 'in' | 'out') => {
      let start = 0;
      let end = 0;

      // Pour in/out, on inverse la direction de déplacement pour out
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

      // Appliquer instantanément l'état de départ
      translate.value = start;
      opacity.value = type === 'in' ? 0 : 1;

      // Lancer l'animation
      translate.value = withDelay(delay, withTiming(end, { duration }));
      opacity.value = withDelay(delay, withTiming(type === 'in' ? 1 : 0, { duration }));
    };

    useImperativeHandle(ref, () => ({
      trigger: runFade,
    }));

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
