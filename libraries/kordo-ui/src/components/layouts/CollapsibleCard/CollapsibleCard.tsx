import { useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CollapsibleCardProps } from './CollapsibleCard.types';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';

const DURATION = 350;
const EASING = Easing.bezier(0.2, 0, 0, 1);

// Carte qui se replie : la ligne de titre reste visible, le contenu s'ouvre et se ferme en
// animant sa hauteur.
export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  right,
  defaultOpen = true,
  children,
  style,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const progress = useSharedValue(defaultOpen ? 1 : 0);

  const toggle = () => {
    setOpen(!open);
    progress.value = withTiming(open ? 0 : 1, { duration: DURATION, easing: EASING });
  };

  const bodyStyle = useAnimatedStyle(() => ({ height: contentHeight * progress.value }));
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  // Tant qu'il n'est pas mesuré, un contenu ouvert garde sa hauteur naturelle
  const measuring = defaultOpen && contentHeight === 0;

  return (
    <View
      style={[
        {
          borderRadius: theme.borderRadius.card,
          overflow: 'hidden',
          backgroundColor: theme.colors.surface,
          boxShadow: theme.shadows.sm,
        },
        style,
      ]}
    >
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded: open }}
        style={{
          minHeight: 48,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Text size={14} extraBold numberOfLines={1} style={{ flex: 1 }}>
          {title}
        </Text>
        {right}
        <Animated.View style={chevronStyle}>
          <Icon name="ChevronDownRegular" size={18} />
        </Animated.View>
      </Pressable>
      <Animated.View style={[{ overflow: 'hidden' }, measuring ? null : bodyStyle]}>
        <View
          onLayout={(e: LayoutChangeEvent) => setContentHeight(e.nativeEvent.layout.height)}
          style={measuring ? null : { position: 'absolute', left: 0, right: 0, top: 0 }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};
