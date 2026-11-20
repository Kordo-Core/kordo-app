import { StyleProp, ViewStyle } from 'react-native';
import { AppearanceType, StatusType } from '../../../types/theme.types';

export interface ToggleProps {
  /** État activé (contrôlé par le parent) */
  value: boolean;
  /** Notifie le parent du nouvel état au clic */
  onChange: (value: boolean) => void;
  /** Couleur de la piste à l'état activé */
  appearance?: AppearanceType | StatusType;
  /** Grise l'interrupteur et ignore les clics */
  disabled?: boolean;
  /** `md` (52 × 32, réglages) par défaut ; `sm` (36 × 22) pour une option de formulaire */
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}
