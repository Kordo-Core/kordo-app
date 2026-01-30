import React from 'react';
import * as FeatherIcons from 'react-feather';
import { getColor } from '../../../utils/getColors';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: React.CSSProperties;
}

// Convert kebab-case to PascalCase (e.g., "arrow-left" -> "ArrowLeft")
const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

export const Icon: React.FC<IconProps> = (props) => {
  const iconName = toPascalCase(props.name);
  const IconComponent = (FeatherIcons as Record<string, React.FC<any>>)[iconName];

  if (!IconComponent) {
    return <span style={props.style}>{props.name}</span>;
  }

  const handleClick = props.onPress ? { onClick: props.onPress, style: { cursor: 'pointer' } } : {};

  return (
    <IconComponent
      size={props.size || 24}
      color={getColor(props.color as any) || 'currentColor'}
      style={props.style}
      {...handleClick}
    />
  );
};
