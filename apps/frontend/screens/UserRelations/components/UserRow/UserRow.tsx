import { useState } from 'react';
import { Button, Text, UserInfo } from 'kordo-ui';
import * as Styled from './UserRow.styles';
import { UserRowProps } from './UserRow.types';
import { CURRENT_USER } from 'fake_data';

// Délai avant de basculer Follow ↔ Following : moitié de l'animation du bouton, comme dans
// les notifications, pour ne pas couper le rebond.
const FOLLOW_SWITCH_DELAY = 100;

// Ligne d'une liste d'abonnés / abonnements : identité à gauche, bouton de suivi à droite.
// Le suivi est optimiste et local (pas de backend) : un seul bouton, qui change d'état.
export const UserRow: React.FC<UserRowProps> = ({ user, onPressUser }) => {
  const [following, setFollowing] = useState(!!user.isFollowing);

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  // On ne se suit pas soi-même : la ligne de l'utilisateur courant n'a pas de bouton.
  const isCurrentUser = user.id === CURRENT_USER.id;

  return (
    <Styled.Row>
      <Styled.Identity>
        <UserInfo
          user={user}
          layout="row"
          secondaryText={
            fullName ? (
              <Text size="sm" appearance="gray">
                {fullName}
              </Text>
            ) : undefined
          }
          onPressUser={onPressUser}
        />
      </Styled.Identity>

      {!isCurrentUser && (
        <Button
          size="md"
          borderRadius="square"
          appearance="secondary"
          inverted={following}
          title={following ? 'Following' : 'Follow'}
          style={Styled.followButton}
          onPress={() => setTimeout(() => setFollowing((prev) => !prev), FOLLOW_SWITCH_DELAY)}
        />
      )}
    </Styled.Row>
  );
};
