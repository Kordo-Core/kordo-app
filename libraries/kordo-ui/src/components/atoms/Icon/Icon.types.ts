import { AppearanceType, NeutralType, StatusType } from 'types/theme.types';

export interface IconProps {
  name: string;
  size?: number;
  color?: AppearanceType | NeutralType | StatusType;
  onPress?: () => void;
  style?: any;
}

export type IconPosition = 'left' | 'right';
