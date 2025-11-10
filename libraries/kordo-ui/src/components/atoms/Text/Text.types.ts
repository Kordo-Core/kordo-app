import { TextProps as ReactTextProps } from 'react-native';

import {
  AppearanceType,
  ExtendedSizeType,
  NeutralType,
  StatusType,
} from '@kordo-ui/types/theme.types';

export interface TextProps extends ReactTextProps {
  children: React.ReactNode;
  appearance?: AppearanceType | NeutralType | StatusType;
  size?: ExtendedSizeType;
  bold?: boolean;
  style?: any;
}
