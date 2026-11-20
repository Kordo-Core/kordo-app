import { StyleProp, ViewStyle } from 'react-native';

export interface HeatmapProps {
  /** Intensité de chaque case, de 0 à `colors.length - 1`, colonne par colonne */
  values: number[];
  /** Nombre de cases par colonne (défaut 7 : une colonne = une semaine) */
  rows?: number;
  /** Échelle de couleurs, de la plus faible à la plus forte (défaut : vert de la marque) */
  colors?: string[];
  /** Case sélectionnée (entourée) */
  selectedIndex?: number;
  /** Rend les cases sélectionnables */
  onSelect?: (index: number) => void;
  /** Libellé lu par les lecteurs d'écran pour une case */
  cellLabel?: (index: number) => string;
  /** Légende « moins … plus » sous la grille */
  legend?: { less: string; more: string };
  style?: StyleProp<ViewStyle>;
}
