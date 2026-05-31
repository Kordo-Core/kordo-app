import { SizeType } from 'types/theme.types';

export interface IconProps {
  name: string;
  size?: SizeType | number;
  color?: string;
  onPress?: () => void;
  style?: any;
}

export type IconPosition = 'left' | 'right';
