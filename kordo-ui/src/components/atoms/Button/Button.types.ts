import { ViewProps } from 'react-native';
import { AppearanceType, NeutralType, SizeType } from '../../../types/theme.types';
import { IconPosition, IconProps } from '../Icon/Icon.types';

export interface ButtonProps extends ViewProps {
  title?: string;
  appearance: AppearanceType | Exclude<NeutralType, 'white'>;
  icon?: IconProps;
  iconPosition?: IconPosition;
  borderRadius?: 'rounded' | 'square';
  inverted?: boolean;
  size?: Exclude<SizeType, 'sm'>;
  width?: 'fill' | 'full';
  withoutBorder?: boolean;
  style?: any;
  onClick?: () => void;
  // disabled?: boolean; TODO
}
