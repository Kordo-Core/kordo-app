import { StyleProp, ViewStyle } from 'react-native';
export interface ListRowProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  primaryText: React.ReactNode;
  secondaryText?: React.ReactNode;
  /** Rend la ligne entière cliquable — utile quand le slot droit porte un contrôle (Radio,
   *  Checkbox, Toggle) dont le libellé vit ici */
  onPress?: () => void;
  /**
   * `plain` (défaut) : ligne nue, pour les listes posées dans une carte. `card` : la ligne est
   * elle-même une carte blanche arrondie (abonnés, classement…).
   */
  variant?: 'plain' | 'card';
  style?: StyleProp<ViewStyle>;
}
