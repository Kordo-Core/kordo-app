import { Feather } from '@expo/vector-icons';

export interface IconProps {
  name: keyof typeof Feather.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: any;
}

export type IconPosition = 'left' | 'right';
