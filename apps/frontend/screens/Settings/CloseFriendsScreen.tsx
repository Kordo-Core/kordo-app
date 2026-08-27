import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Checkbox, Header, Icon, Section, Text, UserInfo } from 'kordo-ui';
import { UserPublic } from 'core';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { matchesQuery } from '../../utils/matchesQuery';
import { getCloseFriends, getCloseFriendSuggestions } from 'fake_data';

// Amis proches : les membres actuels sont cochés en haut, les autres profils suivent
// sous « Ajoutés ». La sélection est locale, sans persistance.
export default function CloseFriendsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const friends = useMemo(() => getCloseFriends(), []);
  const suggestions = useMemo(() => getCloseFriendSuggestions(), []);

  const [selectedIds, setSelectedIds] = useState<string[]>(() => friends.map((f) => f.id));

  const toggle = (id: string) =>
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((i) => i !== id) : [...current, id],
    );

  const filter = (users: UserPublic[]) =>
    users.filter((u) => matchesQuery(query, u.username, u.firstName, u.lastName));

  const renderUser = (user: UserPublic) => (
    <View key={user.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <UserInfo user={user} layout="row" onPressUser={() => toggle(user.id)} />
      </View>
      <Checkbox checked={selectedIds.includes(user.id)} onChange={() => toggle(user.id)} />
    </View>
  );

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Ami(e)s proches
        </Text>
      </Header>

      <SearchToolbar value={query} onChange={setQuery} placeholder="Rechercher..." />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
          paddingBlock: theme.spacing.sm,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Section style={{ gap: theme.spacing.lg }}>{filter(friends).map(renderUser)}</Section>

        <Text size="sm" appearance="gray" style={{ paddingHorizontal: theme.spacing.md }}>
          Ajoutés
        </Text>
        <Section style={{ gap: theme.spacing.lg }}>{filter(suggestions).map(renderUser)}</Section>
      </ScrollView>
    </ScreenLayout>
  );
}
