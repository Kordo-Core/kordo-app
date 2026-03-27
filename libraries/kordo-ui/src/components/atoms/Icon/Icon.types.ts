import { Feather } from '@expo/vector-icons';
import { AppearanceType, NeutralType } from 'types/theme.types';

export interface IconProps {
  name: keyof typeof Feather.glyphMap;
  size?: number;
  color?: AppearanceType | NeutralType;
  onPress?: () => void;
  style?: any;
}

export type IconPosition = 'left' | 'right';
