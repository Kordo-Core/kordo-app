import { StyleProp, ViewStyle } from 'react-native';

export interface StepperProps {
  /** Valeur courante (affichée par l'écran, à côté des boutons) */
  value: number;
  onChange: (value: number) => void;
  /** Valeur minimale : le bouton « − » se désactive en l'atteignant (défaut 0) */
  min?: number;
  /** Valeur maximale : le bouton « + » se désactive en l'atteignant */
  max?: number;
  /** Pas d'incrément (défaut 1) */
  step?: number;
  /** Libellés lus par les lecteurs d'écran */
  decrementLabel?: string;
  incrementLabel?: string;
  style?: StyleProp<ViewStyle>;
}
