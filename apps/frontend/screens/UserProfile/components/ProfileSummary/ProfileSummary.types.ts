import { User } from '../../../../fake_data/db.types';

export type FollowStatus = 'following' | 'pending' | 'none';

export interface ProfileStats {
  followingCount: number;
  followersCount: number;
  activitiesCount: number;
  gymsVisitedCount: number;
}

export interface ProfileSummaryProps {
  user: User;
  stats: ProfileStats;
  isOwnProfile: boolean;
  followStatus: FollowStatus;
  onToggleFollow: () => void;
  onPressMessage: () => void;
}
