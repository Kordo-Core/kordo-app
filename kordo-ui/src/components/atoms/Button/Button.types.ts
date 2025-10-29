import { AppearanceType, NeutralType, SizeType } from 'types/theme.types';
import { IconPosition, IconProps } from '../Icon/Icon.types';

export interface ButtonProps {
  title?: string;
  appearance: AppearanceType | NeutralType;
  icon?: IconProps;
  iconPosition?: IconPosition;
  borderRadius?: 'rounded' | 'square';
  inverted?: boolean;
  size?: Exclude<SizeType, 'sm'>;
  width?: 'fill' | 'full';
  onClick?: () => void;
  // disabled?: boolean; TODO
}
