import { StyleProp, ViewStyle } from 'react-native';
import { AppearanceType, NeutralType, SizeType, StatusType } from '../../../types/theme.types';
import { IconProps } from '../Icon/Icon.types';
import { SurfaceTone } from '../../../utils/surfaceTones';

export interface ButtonProps {
  /** Text displayed inside the button */
  title?: string;
  /**
   * Color theme of the button — same tokens as `Tag` and `Text`, plus the soft backgrounds
   * (`soft`, `softError`, `surface`, `muted`, `glass`)
   */
  appearance?: AppearanceType | Exclude<NeutralType, 'white'> | StatusType | SurfaceTone;
  /** Optional Feather icon displayed alongside the title */
  icon?: IconProps;
  /** Place de l'icône par rapport au libellé (défaut : à gauche) */
  iconPosition?: 'left' | 'right';
  /** Corner shape of the button */
  borderRadius?: 'rounded' | 'square';
  /** Inverts colors: white background with colored text and border */
  inverted?: boolean;
  /** Button size (`sm` = 32px height, `md` = 44px height, `lg` = 58px height) */
  size?: SizeType;
  /** Taille du libellé en px, quand elle diffère de celle de la taille du bouton */
  textSize?: number;
  /** Custom styles applied to the wrapper */
  style?: StyleProp<ViewStyle>;
  /** Custom styles applied to the inner ButtonContainer */
  containerStyle?: StyleProp<ViewStyle>;
  /** Callback fired on press */
  onPress?: () => void;
  /** Removes the border */
  borderless?: boolean;
  /** Disables the button and suppresses onPress */
  disabled?: boolean;
  /** Makes the button take the full width of its container */
  fullWidth?: boolean;
}
