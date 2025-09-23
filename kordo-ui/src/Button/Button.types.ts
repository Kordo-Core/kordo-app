import { FontAwesome } from '@expo/vector-icons';

export interface ButtonProps {
  title?: string;
  appearance: 'primary' | 'secondary' | 'black' | 'transparent';
  iconName?: keyof typeof FontAwesome.glyphMap;
  iconPosition?: 'left' | 'right';
  borderRadius: 'rounded' | 'square';
  inverted?: boolean;
  size?: 'md' | 'lg';
  width?: 'fill' | 'full';
  onClick?: () => void;
  className?: string;
  // disabled?: boolean; TODO
}
