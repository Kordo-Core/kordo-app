import { Text, Button } from 'kordo-ui';
import * as Styled from './ProfileSummary.styles';
import { ProfileSummaryProps } from './ProfileSummary.types';
import { RelationPivot } from '../../../UserRelations/UserRelationsScreen.types';

// Bloc d'en-tête du profil : avatar, compteurs, et actions de suivi pour les autres utilisateurs.
export const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  user,
  stats,
  isOwnProfile,
  followStatus,
  onToggleFollow,
  onPressMessage,
  onPressStat,
}) => {
  const cells: { label: string; value: number; pivot: RelationPivot }[] = [
    { label: 'Abonnement', value: stats.followingCount, pivot: 'following' },
    { label: 'Abonnées', value: stats.followersCount, pivot: 'followers' },
    { label: 'Activités', value: stats.activitiesCount, pivot: 'activities' },
    { label: 'Salle visités', value: stats.gymsVisitedCount, pivot: 'gyms' },
  ];

  return (
    <Styled.Container>
      <Styled.TopRow>
        <Styled.Avatar source={{ uri: user.avatarUrl }} />
        <Styled.StatsGrid>
          {cells.map((cell) => (
            <Styled.StatCell key={cell.label} onPress={() => onPressStat(cell.pivot)}>
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
