import { AppearanceType, NeutralType, SizeType } from '../../../types/theme.types';
import { IconProps } from '../Icon/Icon.types';

export interface ButtonProps {
  /** Text displayed inside the button */
  title?: string;
  /** Color theme of the button */
  appearance?: AppearanceType | Exclude<NeutralType, 'white'>;
  /** Optional Feather icon displayed alongside the title */
  icon?: IconProps;
  /** Corner shape of the button */
  borderRadius?: 'rounded' | 'square';
  /** Inverts colors: white background with colored text and border */
  inverted?: boolean;
  /** Button size (`md` = 36px height, `lg` = 60px height) */
  size?: Exclude<SizeType, 'sm'>;
  /** Custom styles applied to the wrapper */
  style?: any;
  /** Callback fired on press */
  onPress?: () => void;
  /** Removes the border */
  borderless?: boolean;
  /** Disables the button and suppresses onPress */
  disabled?: boolean;
  /** Makes the button take the full width of its container */
  fullWidth?: boolean;
}
