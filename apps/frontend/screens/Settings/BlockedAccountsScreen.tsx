import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Button, Header, Icon, Section, Text, UserInfo } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { matchesQuery } from '../../utils/matchesQuery';
import { getBlockedUsers } from 'fake_data';

// Comptes bloqués : une ligne par compte, avec le bouton de déblocage à droite.
export default function BlockedAccountsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const blocked = useMemo(() => getBlockedUsers(), []);
  const visible = blocked.filter((u) => matchesQuery(query, u.username, u.firstName, u.lastName));

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Comptes bloqués
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
        <Section style={{ gap: theme.spacing.lg }}>
          {visible.map((user) => (
            <View key={user.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <UserInfo user={user} layout="row" onPressUser={() => {}} />
              </View>
              <Button
                title="Débloquer"
                size="md"
                appearance="black"
                inverted
                borderRadius="square"
                onPress={() => {}}
              />
            </View>
          ))}
        </Section>
      </ScrollView>
    </ScreenLayout>
  );
}
