import { StyleProp, ViewStyle } from 'react-native';

export interface SectionProps {
  /** Content rendered inside the section */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
