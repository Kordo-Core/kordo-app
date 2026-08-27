import { StyleProp, ViewStyle } from 'react-native';
import { AppearanceType, StatusType } from '../../../types/theme.types';

export interface RadioOption<T extends string = string> {
  /** Valeur remontée à la sélection */
  value: T;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Contenu libre rendu à gauche du libellé (vignette d'aperçu, icône…) */
  left?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string = string> {
  options: RadioOption<T>[];
  /** Valeur sélectionnée */
  value: T;
  onChange: (value: T) => void;
  /** Couleur des pastilles sélectionnées */
  appearance?: AppearanceType | StatusType;
  /** Espace entre les options */
  gap?: number;
  style?: StyleProp<ViewStyle>;
}
