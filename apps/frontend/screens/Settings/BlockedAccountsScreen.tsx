import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, ListRow, Text, UserInfo } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { matchesQuery } from '../../utils/matchesQuery';
import { getBlockedUsers, getUserHomeGymName } from 'fake_data';
import { RootStackParamList } from '../../App';

// Comptes bloqués (design D) : une carte par compte, avec le bouton de déblocage à droite.
export default function BlockedAccountsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [unblocked, setUnblocked] = useState<string[]>([]);

  const blocked = useMemo(() => getBlockedUsers(), []);
  const remaining = blocked.filter((u) => !unblocked.includes(u.id));
  const visible = remaining.filter((u) => matchesQuery(query, u.username, u.firstName, u.lastName));

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Bloqués"
        eyebrow="Comptes bloqués"
        subtitle="Ces comptes ne peuvent plus voir ton profil, tes activités ni t’écrire."
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 14,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <SearchToolbar value={query} onChange={setQuery} placeholder="Rechercher..." />

        <Text variant="eyebrow" size={12} style={{ marginHorizontal: 6, marginTop: 6 }}>
          {remaining.length} comptes bloqués
        </Text>

        <View style={{ gap: theme.spacing.sm }}>
          {visible.map((user) => (
            <ListRow
              key={user.id}
              variant="card"
              primaryText={
                <UserInfo
                  user={user}
                  layout="row"
                  primaryText={
                    <Text size="md" bold numberOfLines={1}>
                      {[user.firstName, user.lastName].filter(Boolean).join(' ') || user.username}
                    </Text>
                  }
                  secondaryText={
                    <Text size="sm" appearance="gray">
                      {getUserHomeGymName(user.id)}
                    </Text>
                  }
                  onPressUser={() => navigation.push('UserProfile', { userId: user.id })}
                />
              }
              right={
                <Button
                  title="Débloquer"
                  size="md"
                  textSize={13}
                  appearance="error"
                  inverted
                  borderRadius="square"
                  // Bouton contour de la maquette : 104 × 36, filet de 1,5 px
                  containerStyle={{
                    height: 36,
                    minWidth: 104,
                    paddingHorizontal: 12,
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: theme.colors.border,
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  }}
                  onPress={() => setUnblocked((ids) => [...ids, user.id])}
                />
              }
            />
          ))}
        </View>

        <Text size="xs" appearance="gray" style={{ marginHorizontal: 6, lineHeight: 18 }}>
          Ils ne sont pas prévenus quand tu les bloques ou débloques.
        </Text>
      </ScrollView>
    </ScreenLayout>
  );
}
