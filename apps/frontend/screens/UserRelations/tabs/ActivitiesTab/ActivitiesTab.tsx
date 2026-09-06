import { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Activity, Text } from 'kordo-ui';
import * as Styled from '../../UserRelationsScreen.styles';
import { RelationTabProps } from '../../UserRelationsScreen.types';
import { matchesQuery } from '../../../../utils/matchesQuery';
import { CURRENT_USER, getUserActivities } from 'fake_data';
import { RootStackParamList } from '../../../../App';

// Onglet "Activités" : les séances publiées par le profil consulté, avec la même carte
// que le feed de la home (blocs, likes, commentaires). La recherche porte sur le titre
// de la séance et le nom de la salle.
export const ActivitiesTab: React.FC<RelationTabProps> = ({ userId, query }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const activities = useMemo(() => getUserActivities(userId), [userId]);
  const visibleActivities = useMemo(
    () => activities.filter((a) => matchesQuery(query, a.title, a.gym.name)),
    [activities, query],
  );

  return (
    <FlatList
      style={Styled.list}
      data={visibleActivities}
      keyExtractor={(activity) => activity.id}
      contentContainerStyle={Styled.cardsContent(theme)}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <Styled.Empty>
          <Text appearance="gray">
            {query ? 'Aucun résultat.' : 'Aucune activité pour le moment.'}
          </Text>
        </Styled.Empty>
      }
      renderItem={({ item }) => (
        <Activity
          activity={item}
          currentUser={CURRENT_USER}
          onPressUser={(user) => navigation.push('UserProfile', { userId: user.id })}
          onPressBloc={(bloc) =>
            navigation.navigate('Gym', { gymId: item.gym.id, blocId: bloc.id })
          }
        />
      )}
    />
  );
};
