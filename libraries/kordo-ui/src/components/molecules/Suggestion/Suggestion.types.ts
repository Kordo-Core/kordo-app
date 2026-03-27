import { UserPublic } from 'core';

export interface SuggestionProps {
  /** Whether the current user is already following the suggested user */
  isFollowing: boolean;
  user: UserPublic;
  location?: string; // TODO: type as GymPublic once available
  commonFollowers?: number;
  onPressUser: (user: { id: string; username: string }) => void; // TODO: type as UserPublic
  onPressLocation: (location: string) => void;
  onPressClose: () => void;
  onPressFollow: () => void;
}
