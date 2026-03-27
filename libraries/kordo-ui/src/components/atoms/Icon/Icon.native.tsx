import React from 'react';
import { Feather } from '@expo/vector-icons';
import { IconProps } from './Icon.types';
import { getColor } from '../../../utils/getColors';

// Wrapper natif autour de Feather qui traduit la couleur logique du thème en couleur réelle
export const Icon: React.FC<IconProps> = (props) => {
  return (
    <Feather
      style={props.style}
      name={props.name}
      size={props.size}
      color={getColor(props.color!)}
      onPress={props.onPress}
    />
  );
};
