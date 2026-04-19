import React from 'react';
import * as FluentIcons from '@fluentui/react-icons';
import { getColor } from '../../../utils/getColors';
import { IconProps } from './Icon.types';

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, onPress, style }) => {
  const FluentIcon = (FluentIcons as unknown as Record<string, React.FC<any>>)[name];

  if (!FluentIcon) return null;

  return (
    <FluentIcon
      fontSize={size}
      style={{
        color: color ? getColor(color) : 'currentColor',
        flexShrink: 0,
        cursor: onPress ? 'pointer' : undefined,
        ...style,
      }}
      onClick={onPress}
    />
  );
};
