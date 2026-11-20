import { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ProgressBarProps } from './ProgressBar.types';

// Barre de progression horizontale : la piste arrondie se remplit depuis la gauche à
// l'apparition, puis suit les changements de valeur.
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color,
  trackColor,
  height = 6,
  delay = 0,
  duration = 900,
  accessibilityLabel,
  style,
}) => {
  const theme = useTheme();
  const ratio = Math.max(0, Math.min(1, value));
  const fill = useSharedValue(0);
  useEffect(() => {
    fill.value = withDelay(
      delay,
      withTiming(ratio, { duration, easing: Easing.bezier(0.2, 0, 0, 1) }),
    );
  }, [fill, ratio, delay, duration]);
  const fillStyle = useAnimatedStyle(() => ({ width: `${fill.value * 100}%` }));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(ratio * 100) }}
      style={[
        {
          height,
          borderRadius: Math.min(3, height / 2),
          overflow: 'hidden',
          backgroundColor: trackColor ?? theme.colors.surfaceAlt,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            borderRadius: Math.min(3, height / 2),
            backgroundColor: color ?? theme.colors.primary.base,
          },
          fillStyle,
        ]}
      />
    </View>
  );
};
