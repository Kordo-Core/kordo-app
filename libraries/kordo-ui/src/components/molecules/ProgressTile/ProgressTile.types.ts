import { StyleProp, ViewStyle } from 'react-native';

export interface ProgressTileProps {
  /** Texte de la tuile, par exemple « 3 / 24 » */
  label: string;
  /** Couleur de la pastille */
  color: string;
  /** Progression entre 0 et 1 */
  value: number;
  selected?: boolean;
  onPress?: () => void;
  /** Libellé lu par les lecteurs d'écran */
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
}
