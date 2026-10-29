import { StyleProp, ViewStyle } from 'react-native';

export interface IconButtonProps {
  /** Nom de l'icône (jeu fluent de kordo-ui) */
  icon: string;
  onPress?: () => void;
  /** Libellé lu par les lecteurs d'écran : l'icône seule ne dit rien */
  accessibilityLabel: string;
  /**
   * - `surface` (défaut) : carré arrondi sur fond de carte, pour les en-têtes
   * - `glass` : voile sombre translucide, pour une icône posée sur une photo
   * - `soft` : fond vert doux, pour une action secondaire (appeler, filtrer…)
   * - `action` : fond vert plein
   */
  variant?: 'surface' | 'glass' | 'soft' | 'action';
  /** Côté du bouton en pixels (44 par défaut) */
  size?: number;
  /** Pastille de compteur affichée en haut à droite (non lus, filtres actifs…) */
  badge?: number | string;
  style?: StyleProp<ViewStyle>;
}
