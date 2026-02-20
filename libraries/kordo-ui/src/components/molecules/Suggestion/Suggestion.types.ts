import { UserPublic } from 'core';

export interface SuggestionProps {
  isFollowing: boolean;
  user: UserPublic;
  location?: string; //TODO a therme GymPublic
  commonFollowers?: number;
  onPressUser: (user: { id: string; username: string }) => void; //TODO UserPublic ?
  onPressLocation: (location: string) => void;
  onPressClose: () => void;
  onPressFollow: () => void;
}
