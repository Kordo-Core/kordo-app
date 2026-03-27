import { AppearanceType, SizeType, StatusType } from '../../../types/theme.types';
import { ViewStyle } from 'react-native';

export interface LoaderProps {
  type: 'bar' | 'spinner';
  duration: number;
  appearance?: AppearanceType | StatusType;
  infinite?: boolean;
  reverse?: boolean;
  size?: SizeType;
  style?: ViewStyle;
}
