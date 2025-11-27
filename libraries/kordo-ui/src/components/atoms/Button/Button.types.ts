import { ViewProps } from 'react-native';
import { AppearanceType, NeutralType, SizeType } from '../../../types/theme.types';
import { IconProps } from '../Icon/Icon.types';

export interface ButtonProps extends ViewProps {
  title?: string;
  appearance?: AppearanceType | Exclude<NeutralType, 'white'>;
  icon?: IconProps;
  borderRadius?: 'rounded' | 'square';
  inverted?: boolean;
  size?: Exclude<SizeType, 'sm'>;
  style?: any;
  onPress?: () => void;
  borderless?: boolean;
  // disabled?: boolean; TODO
}
