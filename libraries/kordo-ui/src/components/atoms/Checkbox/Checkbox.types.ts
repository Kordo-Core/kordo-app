import { StyleProp, ViewStyle } from 'react-native';
import { AppearanceType, StatusType } from '../../../types/theme.types';

export interface CheckboxProps {
  /** État coché (contrôlé par le parent) */
  checked: boolean;
  /** Notifie le parent du nouvel état au clic */
  onChange: (checked: boolean) => void;
  /** Couleur de la case cochée */
  appearance?: AppearanceType | StatusType;
  /** Grise la case et ignore les clics */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
