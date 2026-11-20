import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Button, ListRow, Text, UserInfo } from 'kordo-ui';
import { UserPublic } from 'core';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { matchesQuery } from '../../utils/matchesQuery';
import { getCloseFriends, getCloseFriendSuggestions, getUserHomeGymName } from 'fake_data';

// Ami(e)s proches (design D) : une carte par personne, avec Retirer ou Ajouter à droite.
// La sélection est locale, sans persistance.
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

  const visible = [...friends, ...suggestions].filter((u: UserPublic) =>
    matchesQuery(query, u.username, u.firstName, u.lastName),
  );

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Ami(e)s proches"
        eyebrow="Ami(e)s proches"
        subtitle="Partage certaines activités uniquement avec ta liste d’ami(e)s proches."
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
          {selectedIds.length} ami(e)s proches
        </Text>

        <View style={{ gap: theme.spacing.sm }}>
          {visible.map((user) => {
            const isFriend = selectedIds.includes(user.id);
            return (
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
                    onPressUser={() => toggle(user.id)}
                  />
                }
                right={
                  <Button
                    title={isFriend ? 'Retirer' : 'Ajouter'}
                    size="md"
                    textSize={13}
                    appearance={isFriend ? 'black' : 'secondary'}
                    inverted={isFriend}
                    borderRadius="square"
                    // 104 × 36 : contour gris pour retirer, vert plein pour ajouter (maquette)
                    containerStyle={[
                      {
                        height: 36,
                        minWidth: 104,
                        paddingHorizontal: 12,
                        borderRadius: 5,
                        borderWidth: 1.5,
                        borderColor: theme.colors.border,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                      },
                      !isFriend && {
                        borderColor: theme.colors.secondary.base,
                        backgroundColor: theme.colors.secondary.base,
                      },
                    ]}
                    onPress={() => toggle(user.id)}
                  />
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
