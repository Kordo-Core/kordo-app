import { Text, Button } from 'kordo-ui';
import * as Styled from './ProfileSummary.styles';
import { ProfileSummaryProps } from './ProfileSummary.types';

// Bloc d'en-tête du profil : avatar, compteurs, et actions de suivi pour les autres utilisateurs.
export const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  user,
  stats,
  isOwnProfile,
  followStatus,
  onToggleFollow,
  onPressMessage,
}) => {
  const cells = [
    { label: 'Abonnement', value: stats.followingCount },
    { label: 'Abonnées', value: stats.followersCount },
    { label: 'Activités', value: stats.activitiesCount },
    { label: 'Salle visités', value: stats.gymsVisitedCount },
  ];

  return (
    <Styled.Container>
      <Styled.TopRow>
        <Styled.Avatar source={{ uri: user.avatarUrl }} />
        <Styled.StatsGrid>
          {cells.map((cell) => (
            <Styled.StatCell key={cell.label}>
              <Text size="sm" appearance="gray">
                {cell.label}
              </Text>
              <Text size="lg" extraBold>
                {cell.value}
              </Text>
            </Styled.StatCell>
          ))}
        </Styled.StatsGrid>
      </Styled.TopRow>

      {!isOwnProfile && (
        <Styled.ActionsRow>
          {followStatus === 'none' && (
            <Button title="Follow" appearance="secondary" fullWidth onPress={onToggleFollow} />
          )}
          {followStatus === 'following' && (
            <>
              <Button
                title="Following"
                appearance="secondary"
                inverted
                style={Styled.buttonFlex}
                containerStyle={[Styled.buttonFill, Styled.followingTint]}
                onPress={onToggleFollow}
              />
              <Button
                title="Écrire"
                appearance="gray"
                inverted
                style={Styled.buttonFlex}
                containerStyle={Styled.buttonFill}
                onPress={onPressMessage}
              />
            </>
          )}
          {followStatus === 'pending' && (
            <Button
              title="Demande envoyée"
              appearance="secondary"
              inverted
              disabled
              fullWidth
              containerStyle={Styled.followingTint}
            />
          )}
        </Styled.ActionsRow>
      )}
    </Styled.Container>
  );
};
