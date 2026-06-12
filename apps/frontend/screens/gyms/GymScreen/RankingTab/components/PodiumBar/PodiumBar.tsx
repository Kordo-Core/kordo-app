import { useEffect } from 'react';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Styled from './PodiumBar.styles';
import { PodiumBarProps } from './PodiumBar.types';

// Barre du podium : monte au montage (mount) puis rétrécit au scroll (shrink)
export function PodiumBar({ height, delay = 0, scrollY, shrinkEnd, children }: PodiumBarProps) {
  const mount = useSharedValue(0);

  useEffect(() => {
    mount.value = withDelay(
      delay,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, mount]);

  const animatedStyle = useAnimatedStyle(() => {
    const shrink = interpolate(scrollY.value, [0, shrinkEnd], [1, 0.45], Extrapolation.CLAMP);
    return { height: height * mount.value * shrink };
  });

  return <Styled.PodiumBar style={animatedStyle}>{children}</Styled.PodiumBar>;
}
