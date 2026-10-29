import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

export interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  centerChildren?: boolean;
  smart?: boolean;
  scrollY?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
}
