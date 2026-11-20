import { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LiveBadgeProps } from './LiveBadge.types';
import { Text } from '../../atoms/Text/Text';

const LIVE_GREEN = '#1FD18A';
const DOT = 7;

// Pastille « en direct » : un point vert d'où une onde s'échappe en continu, et son libellé.
export const LiveBadge: React.FC<LiveBadgeProps> = ({ label, style }) => {
  const theme = useTheme();
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 2000 }), -1);
  }, [pulse]);
  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.55 * (1 - pulse.value),
    transform: [{ scale: 1 + pulse.value * 2 }],
  }));

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          height: 26,
          paddingHorizontal: 10,
          borderRadius: theme.borderRadius.rounded,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          backgroundColor: theme.colors.surfaceAlt,
        },
        style,
      ]}
    >
      <View style={{ width: DOT, height: DOT }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: DOT,
              height: DOT,
              borderRadius: DOT / 2,
              backgroundColor: LIVE_GREEN,
            },
            ringStyle,
          ]}
        />
        <View
          style={{
            width: DOT,
            height: DOT,
            borderRadius: DOT / 2,
            backgroundColor: LIVE_GREEN,
          }}
        />
      </View>
      <Text variant="eyebrow" size={11} appearance="black">
        {label}
      </Text>
    </View>
  );
};
