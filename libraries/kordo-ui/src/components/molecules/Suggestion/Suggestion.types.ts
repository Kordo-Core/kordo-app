import { UserPublic } from 'core/types/User';

export interface SuggestionProps {
  isFollowing: boolean;
  user: UserPublic;
  location?: string; //TODO a therme GymPublic
  commonFollowers?: number;
  onPressUser: (user: { id: string; username: string }) => void;
  onPressLocation: (location: string) => void;
  onPressClose: () => void;
  onPressFollow: () => void;
}
