import React from 'react';
import { Feather } from '@expo/vector-icons';
import { IconProps } from './Icon.types';

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <Feather
      style={props.style}
      name={props.name}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};
