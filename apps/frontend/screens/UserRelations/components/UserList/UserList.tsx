import { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';
import { UserListProps } from './UserList.types';
import { UserRow } from '../UserRow/UserRow';
import { matchesQuery } from '../../../../utils/matchesQuery';
import * as Styled from '../../UserRelationsScreen.styles';
import { RootStackParamList } from '../../../../App';

// Liste d'utilisateurs commune aux onglets Followers et Suivi(e)s : seule la source
// des données change, la présentation est identique.
export const UserList: React.FC<UserListProps> = ({ users, query, caption, emptyLabel }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const visibleUsers = useMemo(
    () => users.filter((user) => matchesQuery(query, user.username, user.firstName, user.lastName)),
    [users, query],
  );

  return (
    <>
      <Styled.Caption>
        <Text appearance="gray">
          {caption} ({visibleUsers.length})
        </Text>
      </Styled.Caption>

      <FlatList
        style={Styled.list}
        data={visibleUsers}
        keyExtractor={(user) => user.id}
        contentContainerStyle={Styled.listContent(theme)}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Styled.Empty>
            <Text appearance="gray">{query ? 'Aucun résultat.' : emptyLabel}</Text>
          </Styled.Empty>
        }
        renderItem={({ item }) => (
          <UserRow
            user={item}
            onPressUser={(user) => navigation.push('UserProfile', { userId: user.id })}
          />
        )}
      />
    </>
  );
};
