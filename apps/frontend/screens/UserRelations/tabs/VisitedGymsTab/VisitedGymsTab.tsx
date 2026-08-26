import { useMemo } from 'react';
import { FlatList, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon, ListRow, Text, theme } from 'kordo-ui';
import * as Styled from '../../UserRelationsScreen.styles';
import { RelationTabProps } from '../../UserRelationsScreen.types';
import { matchesQuery } from '../../utils/matchesQuery';
import { getVisitedGyms } from 'fake_data';
import { RootStackParamList } from '../../../../App';

const THUMB_SIZE = 48;

// Date de visite en toutes lettres : "18 mai 2025".
const formatVisitDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

// Onglet "Salles visitées" : une ligne par salle, dédoublonnée, avec la dernière visite
// et le nombre de sessions. Un tap ouvre la salle.
export const VisitedGymsTab: React.FC<RelationTabProps> = ({ userId, query }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const visitedGyms = useMemo(() => getVisitedGyms(userId), [userId]);
  const visibleGyms = useMemo(
    () => visitedGyms.filter(({ gym }) => matchesQuery(query, gym.name, gym.address)),
    [visitedGyms, query],
  );

  return (
    <FlatList
      style={Styled.list}
      data={visibleGyms}
      keyExtractor={({ gym }) => gym.id}
      contentContainerStyle={Styled.listContent}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <Styled.Empty>
          <Text appearance="gray">
            {query ? 'Aucun résultat.' : 'Aucune salle visitée pour le moment.'}
          </Text>
        </Styled.Empty>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate('Gym', { gymId: item.gym.id })}>
          <ListRow
            left={
              <Image
                source={{ uri: item.gym.imageUri }}
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: theme.borderRadius.square,
                }}
              />
            }
            primaryText={<Text bold>{item.gym.name}</Text>}
            secondaryText={
              <Text size="sm" appearance="gray">
                {formatVisitDate(item.lastVisitAt)} · {item.visitCount}{' '}
                {item.visitCount > 1 ? 'sessions' : 'session'}
              </Text>
            }
            right={<Icon name="chevron-right" color={theme.colors.neutral.gray.base} />}
          />
        </Pressable>
      )}
    />
  );
};
