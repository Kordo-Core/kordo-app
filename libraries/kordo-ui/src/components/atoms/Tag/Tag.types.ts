import { AppearanceType, NeutralType, StatusType } from '../../../types/theme.types';
import { IconProps } from '../Icon/Icon.types';

export interface TagProps {
  title: string;
  appearance?: AppearanceType | StatusType | NeutralType;
  icon?: Pick<IconProps, 'name' | 'size'>;
}
