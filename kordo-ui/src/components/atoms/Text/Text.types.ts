import { KordoTheme } from 'theme';
import { AppearanceType, ExtendedSizeType, NeutralType, StatusType } from 'types/theme.types';

export interface TextProps {
  children: React.ReactNode;
  appearance?: AppearanceType | NeutralType | StatusType;
  size?: ExtendedSizeType;
  bold?: boolean;
  style?: any;
}
