import { UserPublic } from 'core';

export interface UserInfoProps {
  user: UserPublic;
  // The username is always required and rendered in a specific style, so we don't allow overriding it via props
  primaryText?: React.ReactNode;
  /** Content rendered below the username (e.g. location, subtitle) */
  secondaryText?: React.ReactNode;
  /** Content rendered below secondaryText (e.g. follower count) */
  tertiaryText?: React.ReactNode;
  /** `row` = avatar and text side by side; `column` = stacked vertically */
  layout?: 'row' | 'column';
  /** Adds a colored border around the avatar (e.g. to indicate an active session) */
  highlightedAvatar?: boolean; //TODO Only applicable in `row` layout
  style?: any;
  /** Callback fired when the user's avatar or name is pressed */
  onPressUser: (user: UserPublic) => void;
}
