import { StyleProp, ViewStyle } from 'react-native';
export interface CardProps {
  /** Content rendered inside the card */
  children?: React.ReactNode;
  /** Callback fired when the card is pressed (only active when `isPressable` is true) */
  onPress?: () => void;
  /** Enables bounce animation and press interaction */
  isPressable?: boolean;
  /**
   * Photo de fond (URI) : elle remplit la carte et suit ses coins arrondis. Le contenu se pose
   * par-dessus.
   */
  image?: string;
  /**
   * Fondu vert-noir posé sur la photo pour rendre le texte lisible : `bottom` (titre en bas) ou
   * `top` (titre en haut).
   */
  overlay?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
}
