import { StyleProp, ViewStyle } from 'react-native';

export interface ProgressBarProps {
  /** Progression entre 0 et 1 */
  value: number;
  /** Couleur du remplissage (défaut : orange de la marque) */
  color?: string;
  /** Couleur du fond de la piste (défaut : `surfaceAlt`) */
  trackColor?: string;
  /** Épaisseur en px (défaut 6) */
  height?: number;
  /** Délai avant le remplissage, en ms (pour décaler plusieurs barres) */
  delay?: number;
  /** Durée du remplissage, en ms (défaut 900) */
  duration?: number;
  /** Libellé lu par les lecteurs d'écran */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}
