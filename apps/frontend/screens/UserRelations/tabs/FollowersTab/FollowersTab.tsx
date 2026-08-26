import { useMemo } from 'react';
import { UserList } from '../../components/UserList/UserList';
import { RelationTabProps } from '../../UserRelationsScreen.types';
import { getFollowers } from 'fake_data';

// Onglet "Followers" : les utilisateurs qui suivent le profil consulté.
export const FollowersTab: React.FC<RelationTabProps> = ({ userId, query }) => {
  const followers = useMemo(() => getFollowers(userId), [userId]);

  return (
    <UserList
      users={followers}
      query={query}
      caption="Tous les abonnés"
      emptyLabel="Aucun abonné pour le moment."
    />
  );
};
