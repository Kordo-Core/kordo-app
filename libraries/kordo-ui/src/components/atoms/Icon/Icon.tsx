import React, { useEffect, useRef } from 'react';
import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { fluentIcons } from '../../../utils/fluent-icons';
import { getColor } from '../../../utils/getColors';
import { IconProps } from './Icon.types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, onPress, style }) => {
  const fill = color ? getColor(color) : '#000000';
  const from = useSharedValue(fill);
  const to = useSharedValue(fill);
  const progress = useSharedValue(1);
  const prev = useRef(fill);

  useEffect(() => {
    if (prev.current === fill) return;
    from.value = prev.current;
    to.value = fill;
    progress.value = 0;
    progress.value = withTiming(1, { duration: 300 });
    prev.current = fill;
  }, [fill]);

  const animatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 1], [from.value, to.value]),
  }));

  const icon = (fluentIcons as Record<string, typeof fluentIcons[keyof typeof fluentIcons]>)[name];
  if (!icon) return null;

  const svg = (
    <Svg width={size} height={size} viewBox={icon.viewBox} style={style}>
      {(icon.paths as { d: string; fillRule?: string; clipRule?: string }[]).map((p, i) => (
        <AnimatedPath
          key={i}
          d={p.d}
          animatedProps={animatedProps}
          fillRule={p.fillRule as any}
          clipRule={p.clipRule as any}
        />
      ))}
    </Svg>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{svg}</Pressable>;
  }

  return svg;
};
