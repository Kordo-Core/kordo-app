import { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Text } from 'kordo-ui';

const HIDDEN_Y = 160;

// Bandeau bref en bas de l'écran après une validation : le message et le total de points.
export function ValidationToast({ message, points }: { message: string | null; points: number }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const visible = useSharedValue(0);
  useEffect(() => {
    visible.value = withTiming(message ? 1 : 0, { duration: 300 });
  }, [message, visible]);
  const style = useAnimatedStyle(() => ({
    opacity: visible.value,
    transform: [{ translateY: (1 - visible.value) * HIDDEN_Y }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: insets.bottom + 24,
          zIndex: 8,
          height: 52,
          paddingLeft: theme.spacing.lg,
          paddingRight: theme.spacing.sm,
          borderRadius: 7,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: theme.colors.navBar,
          boxShadow: '0px 12px 26px rgba(0, 0, 0, 0.25)',
        },
        style,
      ]}
    >
      <Text bold numberOfLines={1} style={{ flex: 1, color: theme.colors.neutral.white }}>
        {message ?? ' '}
      </Text>
      <View
        style={{
          height: 36,
          paddingHorizontal: theme.spacing.md,
          borderRadius: 4,
          justifyContent: 'center',
          backgroundColor: theme.colors.primary.base,
        }}
      >
        <Text size="sm" extraBold style={{ color: '#0B1410' }}>
          {points.toLocaleString('fr-FR')} pts
        </Text>
      </View>
    </Animated.View>
  );
}
