import { StyleProp, ViewStyle } from 'react-native';
import { SizeType } from '../../../types/theme.types';

export interface IconProps {
  name: string;
  size?: SizeType | number;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export type IconPosition = 'left' | 'right';
