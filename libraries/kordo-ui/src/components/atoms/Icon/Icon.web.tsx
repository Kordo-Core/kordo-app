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

// Convertit un nom kebab-case en PascalCase pour correspondre aux exports de react-feather
// (ex. : "arrow-left" -> "ArrowLeft")
const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// Composant icône web qui résout dynamiquement le composant react-feather à partir du nom
export const Icon: React.FC<IconProps> = (props) => {
  // Transforme le nom reçu en PascalCase pour chercher dans le catalogue react-feather
  const iconName = toPascalCase(props.name);
  const IconComponent = (FeatherIcons as Record<string, React.FC<any>>)[iconName];

  // Fallback textuel si l'icône demandée n'existe pas dans react-feather
  if (!IconComponent) {
    return <span style={props.style}>{props.name}</span>;
  }

  // Ajoute le comportement cliquable uniquement si un callback onPress est fourni
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
