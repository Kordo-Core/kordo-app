import React, { useEffect, useRef } from 'react';
import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { getIcon } from '../../../utils/getIcon';
import { resolveColor } from '../../../utils/getColors';
import { resolveIconSize } from '../../../utils/resolveSize';
import { IconProps } from './Icon.types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Icon: React.FC<IconProps> = (props) => {
  const fill = resolveColor(props.color, '#000000');
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

  const icon = getIcon(props.name);
  if (!icon) return null;

  const size = resolveIconSize(props.size);

  const svg = (
    <Svg width={size} height={size} viewBox={icon.viewBox} style={props.style}>
      {icon.paths.map((path, index) =>
        // Un tracé avec `fill` explicite garde sa couleur (icônes multicolores comme `google`) ;
        // les autres suivent la couleur animée du composant.
        path.fill ? (
          <Path
            key={index}
            d={path.d}
            fill={path.fill}
            fillRule={path.fillRule}
            clipRule={path.clipRule}
          />
        ) : (
          <AnimatedPath
            key={index}
            d={path.d}
            animatedProps={animatedProps}
            fillRule={path.fillRule}
            clipRule={path.clipRule}
          />
        ),
      )}
    </Svg>
  );

  if (props.onPress) {
    return <Pressable onPress={props.onPress}>{svg}</Pressable>;
  }

  return svg;
};
