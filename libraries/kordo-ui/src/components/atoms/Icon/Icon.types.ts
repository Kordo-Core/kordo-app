export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: any;
}

export type IconPosition = 'left' | 'right';
