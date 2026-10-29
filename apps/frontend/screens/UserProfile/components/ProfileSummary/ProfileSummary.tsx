import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text, Button } from 'kordo-ui';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import * as Styled from './ProfileSummary.styles';
import { ProfileSummaryProps } from './ProfileSummary.types';
import { RelationPivot } from '../../../UserRelations/UserRelationsScreen.types';

// En-tête du profil (design D) : avatar carré arrondi qui chevauche la couverture, nom en
// titre display, compteurs dans une carte, puis les actions (suivre / écrire ou modifier).
export const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  user,
  stats,
  isOwnProfile,
  followStatus,
  onToggleFollow,
  onPressMessage,
  onPressStat,
}) => {
  const theme = useTheme();
  const cells: { label: string; value: number; pivot: RelationPivot }[] = [
    { label: 'Abonnements', value: stats.followingCount, pivot: 'following' },
    { label: 'Abonnés', value: stats.followersCount, pivot: 'followers' },
    { label: 'Activités', value: stats.activitiesCount, pivot: 'activities' },
    { label: 'Salles', value: stats.gymsVisitedCount, pivot: 'gyms' },
  ];

  return (
    <Styled.Container>
      <Animated.View entering={ZoomIn.springify().damping(14)}>
        <Styled.Avatar source={{ uri: user.avatarUrl }} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80).duration(400)} style={{ gap: 4 }}>
        <Text variant="display" size={34}>
          {user.firstName} {user.lastName}
        </Text>
        <Text size="sm" bold appearance="gray">
          @{user.username}
          {user.bio ? ` · ${user.bio}` : ''}
        </Text>
      </Animated.View>

      <Styled.StatsCard>
        {cells.map((cell) => (
          <Styled.StatCell key={cell.label} onPress={() => onPressStat(cell.pivot)}>
            <Text variant="display" size="xs">
              {cell.value}
            </Text>
            <Text size="xs" bold appearance="gray">
              {cell.label}
            </Text>
          </Styled.StatCell>
        ))}
      </Styled.StatsCard>

      <Styled.ActionsRow>
        {isOwnProfile && (
          <>
            <View style={Styled.buttonFlex}>
              <Button title="Modifier le profil" appearance="black" fullWidth />
            </View>
            <View style={Styled.buttonFlex}>
              <Button
                title="Partager"
                appearance="secondary"
                inverted
                borderless
                containerStyle={{ backgroundColor: theme.colors.soft }}
                fullWidth
              />
            </View>
          </>
        )}
        {!isOwnProfile && followStatus === 'none' && (
          <>
            <View style={Styled.buttonFlex}>
              <Button title="Suivre" appearance="secondary" fullWidth onPress={onToggleFollow} />
            </View>
            <View style={Styled.buttonFlex}>
              <Button
                title="Écrire"
                appearance="black"
                inverted
                icon={{ name: 'ChatRegular', size: 18 }}
                fullWidth
                onPress={onPressMessage}
              />
            </View>
          </>
        )}
        {!isOwnProfile && followStatus === 'following' && (
          <>
            <View style={Styled.buttonFlex}>
              <Button
                title="Abonné"
                appearance="secondary"
                inverted
                icon={{ name: 'CheckmarkRegular', size: 18 }}
                containerStyle={Styled.followingTint(theme)}
                fullWidth
                onPress={onToggleFollow}
              />
            </View>
            <View style={Styled.buttonFlex}>
              <Button
                title="Écrire"
                appearance="black"
                inverted
                icon={{ name: 'ChatRegular', size: 18 }}
                fullWidth
                onPress={onPressMessage}
              />
            </View>
          </>
        )}
        {!isOwnProfile && followStatus === 'pending' && (
          <Button
            title="Demande envoyée"
            appearance="secondary"
            inverted
            disabled
            fullWidth
            containerStyle={Styled.followingTint(theme)}
          />
        )}
      </Styled.ActionsRow>
    </Styled.Container>
  );
};
