import { User } from '../../../../fake_data/db.types';
import { RelationPivot } from '../../../UserRelations/UserRelationsScreen.types';

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
  /** Tap sur un compteur : ouvre la liste correspondante sur le bon onglet */
  onPressStat: (pivot: RelationPivot) => void;
  onPressMessage: () => void;
}
