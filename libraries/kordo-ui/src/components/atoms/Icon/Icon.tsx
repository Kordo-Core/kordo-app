import React from 'react';
import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { fluentIcons } from '../../../utils/fluent-icons';
import { getColor } from '../../../utils/getColors';
import { IconProps } from './Icon.types';

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, onPress, style }) => {
  const icon = (fluentIcons as Record<string, typeof fluentIcons[keyof typeof fluentIcons]>)[name];
  if (!icon) return null;

  const fill = color ? getColor(color) : 'currentColor';

  const svg = (
    <Svg width={size} height={size} viewBox={icon.viewBox} style={style}>
      {(icon.paths as { d: string; fillRule?: string; clipRule?: string }[]).map((p, i) => (
        <Path key={i} d={p.d} fill={fill} fillRule={p.fillRule as any} clipRule={p.clipRule as any} />
      ))}
    </Svg>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{svg}</Pressable>;
  }

  return svg;
};
