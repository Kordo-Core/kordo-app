import { StyleProp, ViewStyle } from 'react-native';
export interface ListRowProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  primaryText: React.ReactNode;
  secondaryText?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
