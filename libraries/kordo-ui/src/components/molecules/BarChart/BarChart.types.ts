import { StyleProp, ViewStyle } from 'react-native';

export interface BarChartDatum {
  value: number;
  /** Libellé sous la barre (L, M, S1…), affiché si `showLabels` */
  label?: string;
}

export interface BarChartProps {
  data: BarChartDatum[];
  /** Hauteur maximale d'une barre, en px */
  height: number;
  /** Largeur d'une barre (défaut 22) */
  barWidth?: number;
  /** Écart entre les barres quand elles ne s'étalent pas (défaut 4) */
  gap?: number;
  /** Les barres se répartissent sur toute la largeur disponible */
  spread?: boolean;
  /** Barres pleine largeur de colonne, colonnes égales séparées de `gap` (maquette « sport ») */
  fill?: boolean;
  /** Arrondi des barres en px (défaut : 3, ou la moitié de la largeur) */
  barRadius?: number;
  /** Hauteur minimale, pour qu'une valeur nulle reste visible (défaut 4) */
  minBarHeight?: number;
  /** Barre mise en avant (couleur `highlight`) */
  highlightIndex?: number;
  /** Rend les barres sélectionnables : la barre touchée devient la barre mise en avant */
  onSelect?: (index: number) => void;
  /** Affiche la valeur de la barre mise en avant au-dessus d'elle */
  showValue?: boolean;
  /** Affiche les libellés sous les barres */
  showLabels?: boolean;
  /** Couleurs des barres : normale, mise en avant, valeur nulle */
  colors?: { bar?: string; highlight?: string; empty?: string };
  /** Teinte des textes : `light` sur un fond foncé (héros), `dark` sinon */
  tone?: 'light' | 'dark';
  /** Délai avant la pousse de la première barre, en ms */
  delay?: number;
  /** Unité lue par les lecteurs d'écran (« blocs ») */
  unit?: string;
  style?: StyleProp<ViewStyle>;
}
