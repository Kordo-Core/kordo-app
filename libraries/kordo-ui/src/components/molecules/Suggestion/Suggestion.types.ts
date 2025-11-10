import { UserPublic } from 'core/types/User';

export interface SuggestionProps {
  isFollowing: boolean;
  user: UserPublic;
  location?: string;
  commonFollowers?: number;
}
