import { AppearanceType, StatusType } from '../../../types/theme.types';

export interface TagProps {
  title: string;
  appearance?: AppearanceType | StatusType;
}
