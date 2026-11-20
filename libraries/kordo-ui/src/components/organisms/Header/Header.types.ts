import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

export interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  centerChildren?: boolean;
  smart?: boolean;
  /** Marge entre la zone sûre et la rangée, en plus des 6 px de la rangée (défaut 10) */
  topGap?: number;
  scrollY?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
}
