import { StyleProp, ViewStyle } from 'react-native';
import { SizeType } from '../../../types/theme.types';

export interface SegmentedControlProps {
  /** Array of segment labels */
  segments: { text: string; color?: string }[];
  /** Index of the currently selected segment */
  selectedIndex: number;
  /** Callback function when a segment is selected */
  onSelect: (index: number) => void;
  size?: Exclude<SizeType, 'sm'>;
  borderRadius?: 'rounded' | 'square';
  /** `glass` (défaut) sur une photo, `surface` sur le fond clair d'une page */
  variant?: 'glass' | 'surface';
  /** Variante surface : libellés extra-gras (onglets d'une salle) au lieu de gras */
  extraBoldLabels?: boolean;
  style?: StyleProp<ViewStyle>;
  // TODO: add inverted prop to swap styles
}
