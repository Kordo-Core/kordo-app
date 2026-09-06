import { StyleProp, ViewStyle } from 'react-native';
export interface ListRowProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  primaryText: React.ReactNode;
  secondaryText?: React.ReactNode;
  /** Rend la ligne entière cliquable — utile quand le slot droit porte un contrôle (Radio,
   *  Checkbox, Toggle) dont le libellé vit ici */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
