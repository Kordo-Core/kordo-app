import { FontAwesome } from '@expo/vector-icons';
import { IconProps } from 'types/Icon';

export interface ButtonProps {
  title?: string;
  appearance?: 'primary' | 'secondary' | 'black';
  icon?: IconProps;
  borderRadius?: 'rounded' | 'square';
  inverted?: boolean;
  size?: 'md' | 'lg';
  width?: 'fill' | 'full';
  onClick?: () => void;
  // disabled?: boolean; TODO
}
