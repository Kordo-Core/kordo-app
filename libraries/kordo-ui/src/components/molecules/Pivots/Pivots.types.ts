import { StyleProp, ViewStyle } from 'react-native';

export interface PivotsProps {
  style?: StyleProp<ViewStyle>;
  pivots: string[];
  selectedPivot: string;
  onPivotChange?: (pivot: string) => void;
}
