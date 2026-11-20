import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text, Button } from 'kordo-ui';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
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
  onPressEdit,
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
      {/* Avatar avec son niveau en médaillon, visibilité du compte à droite */}
      <View
        style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}
      >
        <Animated.View entering={FadeIn.duration(300)}>
          <Styled.Avatar source={{ uri: user.avatarUrl }} />
          {/* Niveau : pastille orange de 24 px dans un liseré de 3 px couleur du fond */}
          <View
            style={{
              position: 'absolute',
              right: -2,
              bottom: 4,
              height: 30,
              paddingHorizontal: 8,
              borderRadius: 999,
              borderWidth: 3,
              borderColor: theme.colors.background,
              backgroundColor: theme.colors.primary.base,
              justifyContent: 'center',
            }}
          >
            <Text size={11} extraBold style={{ color: theme.colors.navBarAccentIcon }}>
              7A
            </Text>
          </View>
        </Animated.View>
        {isOwnProfile && (
          <View style={{ paddingBottom: 6 }}>
            <View
              style={{
                height: 30,
                paddingHorizontal: 12,
                borderRadius: 999,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: theme.colors.soft,
              }}
            >
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: '#1FD18A' }} />
              <Text size="xs" extraBold style={{ color: theme.colors.softText }}>
                Compte public
              </Text>
            </View>
          </View>
        )}
      </View>

      <Animated.View entering={FadeInDown.delay(80).duration(400)} style={{ gap: 4 }}>
        <Text variant="display" size={42}>
          {user.firstName} {user.lastName}
        </Text>
        <Text size={14} appearance="gray" style={{ fontFamily: theme.fonts.semiBold }}>
          @{user.username}
          {user.bio ? ` · ${user.bio}` : ''}
        </Text>
      </Animated.View>

      <Styled.StatsCard>
        {cells.map((cell) => (
          <Styled.StatCell key={cell.label} onPress={() => onPressStat(cell.pivot)}>
            <Text variant="display" size="sm">
              {cell.value}
            </Text>
            <Text size={11} appearance="gray" style={{ fontFamily: theme.fonts.semiBold }}>
              {cell.label}
            </Text>
          </Styled.StatCell>
        ))}
      </Styled.StatsCard>

      <Styled.ActionsRow>
        {isOwnProfile && (
          <>
            <View style={Styled.buttonFlex}>
              <Button
                textSize={14}
                title="Modifier le profil"
                appearance="black"
                onPress={onPressEdit}
                containerStyle={Styled.actionButton}
                fullWidth
              />
            </View>
            <View style={Styled.buttonFlex}>
              <Button
                textSize={14}
                title="Partager"
                appearance="secondary"
                inverted
                borderless
                containerStyle={[Styled.actionButton, { backgroundColor: theme.colors.soft }]}
                fullWidth
              />
            </View>
          </>
        )}
        {!isOwnProfile && followStatus === 'none' && (
          <>
            <View style={Styled.buttonFlex}>
              <Button
                textSize={14}
                title="Suivre"
                appearance="secondary"
                containerStyle={Styled.actionButton}
                fullWidth
                onPress={onToggleFollow}
              />
            </View>
            <View style={Styled.buttonFlex}>
              <Button
                textSize={14}
                title="Écrire"
                appearance="black"
                inverted
                icon={{ name: 'ChatRegular', size: 18 }}
                containerStyle={Styled.actionButton}
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
                textSize={14}
                title="Abonné"
                appearance="secondary"
                inverted
                icon={{ name: 'CheckmarkRegular', size: 18 }}
                containerStyle={[Styled.actionButton, Styled.followingTint(theme)]}
                fullWidth
                onPress={onToggleFollow}
              />
            </View>
            <View style={Styled.buttonFlex}>
              <Button
                textSize={14}
                title="Écrire"
                appearance="black"
                inverted
                icon={{ name: 'ChatRegular', size: 18 }}
                containerStyle={Styled.actionButton}
                fullWidth
                onPress={onPressMessage}
              />
            </View>
          </>
        )}
        {!isOwnProfile && followStatus === 'pending' && (
          <Button
            textSize={14}
            title="Demande envoyée"
            appearance="secondary"
            inverted
            disabled
            fullWidth
            containerStyle={[Styled.actionButton, Styled.followingTint(theme)]}
          />
        )}
      </Styled.ActionsRow>
    </Styled.Container>
  );
};
