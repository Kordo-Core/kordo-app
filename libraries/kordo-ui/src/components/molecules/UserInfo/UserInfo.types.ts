import { UserPublic } from 'core';

export interface UserInfoProps {
  user: UserPublic;
  secondaryText?: React.ReactNode;
  tertiaryText?: React.ReactNode;
  layout?: 'row' | 'column';
  highlightedAvatar?: boolean;
  style?: any;
  onPressUser: (user: UserPublic) => void;
}
