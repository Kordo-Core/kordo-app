import { useMemo } from 'react';
import { UserList } from '../../components/UserList/UserList';
import { RelationTabProps } from '../../UserRelationsScreen.types';
import { getFollowing } from 'fake_data';

// Onglet "Suivi(e)s" : les utilisateurs que suit le profil consulté.
export const FollowingTab: React.FC<RelationTabProps> = ({ userId, query }) => {
  const following = useMemo(() => getFollowing(userId), [userId]);

  return (
    <UserList
      users={following}
      query={query}
      caption="Tous les abonnements"
      emptyLabel="Aucun abonnement pour le moment."
    />
  );
};
