import { ReactNode, useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export interface MarqueeProps {
  children: ReactNode;
  /** Vitesse de défilement, en px par seconde (défaut 40) */
  speed?: number;
  /** Écart entre deux répétitions du contenu, en px (défaut 28) */
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

// Contenu qui défile sans fin vers la gauche : il est doublé, et l'animation reboucle quand la
// première copie est entièrement sortie.
export const Marquee: React.FC<MarqueeProps> = ({ children, speed = 40, gap = 28, style }) => {
  const [width, setWidth] = useState(0);
  const offset = useSharedValue(0);

  useEffect(() => {
    if (!width) return;
    const distance = width + gap;
    offset.value = 0;
    offset.value = withRepeat(
      withTiming(-distance, { duration: (distance / speed) * 1000, easing: Easing.linear }),
      -1,
    );
  }, [width, gap, speed, offset]);

  const trackStyle = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Animated.View style={[{ flexDirection: 'row', gap, alignSelf: 'flex-start' }, trackStyle]}>
        <View
          onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
          style={{ flexShrink: 0 }}
        >
          {children}
        </View>
        <View accessibilityElementsHidden style={{ flexShrink: 0 }}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};
