import { StyleProp, ViewStyle } from 'react-native';

export interface LevelPyramidLevel {
  /** Niveau affiché à gauche (7A, 6C, ≤5…) */
  label: string;
  /** Nombre de blocs validés à ce niveau */
  count: number;
  /** Couleur de la barre (défaut : vert de la marque) */
  color?: string;
}

export interface LevelPyramidProps {
  /** Niveaux, du plus dur au plus facile */
  levels: LevelPyramidLevel[];
  /** Part minimale d'une barre, pour qu'un petit total reste visible (défaut 0.08) */
  minRatio?: number;
  style?: StyleProp<ViewStyle>;
}
