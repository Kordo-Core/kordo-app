import { StyleProp, ViewStyle } from 'react-native';
import { AppearanceType, StatusType } from '../../../types/theme.types';

export interface RadioProps {
  /** Option sélectionnée (contrôlée par le parent, ou par le RadioGroup) */
  selected: boolean;
  /** Notifie la sélection. Un radio ne se désélectionne pas lui-même. */
  onSelect: () => void;
  /** Intitulé de l'option */
  label?: React.ReactNode;
  /** Précision affichée sous le libellé */
  description?: React.ReactNode;
  /** Couleur de la pastille sélectionnée */
  appearance?: AppearanceType | StatusType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
