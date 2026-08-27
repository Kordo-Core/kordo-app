import { StyleProp, ViewStyle } from 'react-native';
import { ExtendedSizeType } from '../../../types/theme.types';

export interface SectionProps {
  /** Content rendered inside the section */
  children?: React.ReactNode;
  /** Vertical space between children, as a spacing token */
  gap?: ExtendedSizeType;
  style?: StyleProp<ViewStyle>;
}
