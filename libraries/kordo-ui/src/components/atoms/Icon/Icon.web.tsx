import React from 'react';
import { StyleSheet } from 'react-native';
import { getIcon } from '../../../utils/getIcon';
import { resolveColor } from '../../../utils/getColors';
import { resolveIconSize } from '../../../utils/resolveSize';
import { IconProps } from './Icon.types';

// Rend le même jeu d'icônes que la version native (utils/fluent-icons) en SVG inline :
// les alias kebab-case (`home`, `chevron-right`) et les icônes maison (`carabiner`,
// `terrain`, `play`) n'existent pas dans `@fluentui/react-icons` et ne s'afficheraient pas.
export const Icon: React.FC<IconProps> = ({ name, size, color, onPress, style }) => {
  const icon = getIcon(name);

  if (!icon) return null;

  const resolvedSize = resolveIconSize(size);
  const fill = resolveColor(color, 'currentColor');

  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox={icon.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        flexShrink: 0,
        cursor: onPress ? 'pointer' : undefined,
        // `style` suit l'API React Native (objet, tableau ou style enregistré) : on l'aplatit
        // avant de l'appliquer. La conversion est assumée, c'est le rôle de ce fichier web.
        ...(StyleSheet.flatten(style) as React.CSSProperties),
      }}
      onClick={onPress}
    >
      {icon.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fill={path.fill ?? fill}
          fillRule={path.fillRule}
          clipRule={path.clipRule}
        />
      ))}
    </svg>
  );
};
