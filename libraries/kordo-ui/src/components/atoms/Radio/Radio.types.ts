import { StyleProp, ViewStyle } from 'react-native';
import { AppearanceType, StatusType } from '../../../types/theme.types';

export interface RadioProps {
  /** Option sélectionnée (contrôlée par le parent) */
  selected: boolean;
  /** Notifie la sélection. Un radio ne se désélectionne pas lui-même. */
  onSelect: () => void;
  /** Couleur de la pastille sélectionnée */
  appearance?: AppearanceType | StatusType;
  /** Grise la pastille et ignore les clics */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
