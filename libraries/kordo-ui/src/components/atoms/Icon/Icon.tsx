import React from 'react';
import { Feather } from '@expo/vector-icons';
import { IconProps } from './Icon.types';
import { getColor } from '../../../utils/getColors';

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
