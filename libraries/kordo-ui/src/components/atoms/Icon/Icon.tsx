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
import { IconProps } from './Icon.types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Icon: React.FC<IconProps> = (props) => {
  const fill = props.color ?? '#000000';
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

  const animatedProps = useAnimatedProps(() => {
    if (from.value === to.value) {
      return { fill: to.value };
    }
    return {
      fill: interpolateColor(progress.value, [0, 1], [from.value, to.value]),
    };
  });

  const icon = (fluentIcons as Record<string, (typeof fluentIcons)[keyof typeof fluentIcons]>)[
    props.name
  ];
  if (!icon) return null;

  const svg = (
    <Svg width={props.size} height={props.size} viewBox={icon.viewBox} style={props.style}>
      {(icon.paths as { d: string; fillRule?: string; clipRule?: string; fill?: string }[]).map(
        (p, i) =>
          p.fill ? (
            <Path
              key={i}
              d={p.d}
              fill={p.fill}
              fillRule={p.fillRule as any}
              clipRule={p.clipRule as any}
            />
          ) : (
            <AnimatedPath
              key={i}
              d={p.d}
              animatedProps={animatedProps}
              fillRule={p.fillRule as any}
              clipRule={p.clipRule as any}
            />
          )
      )}
    </Svg>
  );

  if (props.onPress) {
    return <Pressable onPress={props.onPress}>{svg}</Pressable>;
  }

  return svg;
};
