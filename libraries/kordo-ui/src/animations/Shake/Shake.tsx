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

export const Shake = forwardRef<ShakeRef, ShakeProps>(
  ({ children, amplitude = 10, duration = 50 }, ref) => {
    const offset = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value }],
      width: '100%',
    }));

    const trigger = () => {
      offset.value = withSequence(
        withTiming(-amplitude, { duration }),
        withTiming(amplitude, { duration }),
        withTiming(-amplitude, { duration }),
        withTiming(amplitude, { duration }),
        withTiming(0, { duration }),
      );
    };

    // Expose la fonction trigger au parent via ref
    useImperativeHandle(ref, () => ({ trigger }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
  },
);
