import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Icon, SegmentedControl, Text } from 'kordo-ui';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RootStackParamList } from '../../../App';
import { ScreenHeader } from '../../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../../components/SearchToolbar/SearchToolbar';
import { EmptyState } from '../../../components/EmptyState/EmptyState';
import {
  RECENT_SEARCHES,
  getClimbersToDiscover,
  getGymsNearby,
  isFollowedByCurrentUser,
  searchAll,
} from '../../../fake_data';

// Paliers de cotation : grades 1 à 30 par tranches de 5, une couleur par tranche
const TIER_COLORS = ['yellow', 'green', 'blue', 'red', 'black', 'purple'] as const;
const tierOf = (grade: number) => Math.max(0, Math.min(Math.floor((grade - 1) / 5), 5));

const FILTERS = [{ text: 'Tout' }, { text: 'Grimpeurs' }, { text: 'Salles' }, { text: 'Blocs' }];

// Recherche (design D) : sans saisie, recherches récentes, grimpeurs à découvrir et salles
// proches ; avec saisie, résultats par type (grimpeurs, salles, blocs), filtrables.
export default function SearchScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(0);
  const [recent, setRecent] = useState(RECENT_SEARCHES);
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const isFollowing = (id: string) => following[id] ?? isFollowedByCurrentUser(id);
  const toggleFollow = (id: string) => setFollowing((f) => ({ ...f, [id]: !isFollowing(id) }));

  const results = searchAll(query);
  const searching = query.trim().length > 0;
  const total = results.climbers.length + results.gyms.length + results.blocs.length;

  const openUser = (userId: string) => navigation.navigate('UserProfile', { userId });
  const openGym = (gymId: string) => navigation.navigate('Gym', { gymId });

  // --- Briques de liste
  const listCard = {
    borderRadius: theme.borderRadius.card,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden' as const,
    boxShadow: theme.shadows.sm,
  };
  const rowStyle = (i: number) => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    paddingVertical: 15,
    paddingHorizontal: 13,
    borderTopWidth: i ? 1 : 0,
    borderTopColor: theme.colors.border,
  });
  const thumb = {
    width: 46,
    height: 46,
    borderRadius: theme.borderRadius.square,
    backgroundColor: theme.colors.surfaceAlt,
  };
  const sectionTitle = (title: string) => (
    <Text variant="eyebrow" size={12} style={{ marginTop: 6, marginHorizontal: 4 }}>
      {title}
    </Text>
  );
  const chevron = <Icon name="ChevronRightRegular" size={20} color={theme.colors.textMuted} />;

  const climberRows = (
    items: {
      user: { id: string; firstName: string; lastName: string; avatarUrl: string };
      subtitle: string;
    }[],
  ) => (
    <View style={listCard}>
      {items.map(({ user, subtitle }, i) => (
        <Pressable key={user.id} onPress={() => openUser(user.id)} style={rowStyle(i)}>
          <Image source={{ uri: user.avatarUrl }} style={thumb} />
          <View style={{ flex: 1 }}>
            <Text bold size="md" numberOfLines={1}>
              {user.firstName} {user.lastName}
            </Text>
            <Text size="sm" appearance="gray" numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          <Button
            size="sm"
            appearance="secondary"
            inverted={isFollowing(user.id)}
            title={isFollowing(user.id) ? 'Abonné' : 'Suivre'}
            onPress={() => toggleFollow(user.id)}
            containerStyle={{ width: 86 }}
          />
        </Pressable>
      ))}
    </View>
  );

  const gymRows = (
    items: { gym: { id: string; name: string; imageUri: string }; subtitle: string }[],
  ) => (
    <View style={listCard}>
      {items.map(({ gym, subtitle }, i) => (
        <Pressable key={gym.id} onPress={() => openGym(gym.id)} style={rowStyle(i)}>
          <Image source={{ uri: gym.imageUri }} style={thumb} />
          <View style={{ flex: 1 }}>
            <Text bold size="md" numberOfLines={1}>
              {gym.name}
            </Text>
            <Text size="sm" appearance="gray" numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          {chevron}
        </Pressable>
      ))}
    </View>
  );

  const blocRows = (
    <View style={listCard}>
      {results.blocs.map(({ bloc, gym, subtitle }, i) => (
        <Pressable
          key={bloc.id}
          onPress={() => navigation.navigate('Gym', { gymId: gym.id, blocId: bloc.id })}
          style={rowStyle(i)}
        >
          <Image
            source={{ uri: bloc.blocUrl ?? gym.imageUri }}
            style={[
              thumb,
              {
                borderWidth: 2.5,
                borderColor: theme.colors.boulderGrade[TIER_COLORS[tierOf(bloc.grade)]],
              },
            ]}
          />
          <View style={{ flex: 1 }}>
            <Text bold size="md" numberOfLines={1}>
              {bloc.name}
            </Text>
            <Text size="sm" appearance="gray" numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          <Text extraBold>{bloc.points} pts</Text>
        </Pressable>
      ))}
    </View>
  );

  const show = (k: number) => filter === 0 || filter === k;

  return (
    <ScreenLayout>
      <ScreenHeader title="Recherche" eyebrow="Explorer">
        <SearchToolbar
          value={query}
          onChange={setQuery}
          placeholder="Grimpeurs, salles, blocs..."
        />
        {searching && total > 0 && (
          <View style={{ marginTop: 10 }}>
            <SegmentedControl
              segments={FILTERS}
              selectedIndex={filter}
              onSelect={setFilter}
              variant="surface"
              size="md"
              borderRadius="square"
            />
          </View>
        )}
      </ScreenHeader>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 120, gap: 10 }}
      >
        {!searching ? (
          <Animated.View entering={FadeInDown.duration(400)} style={{ gap: 10 }}>
            {recent.length > 0 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {sectionTitle('Recherches récentes')}
                  <Text
                    bold
                    size="sm"
                    appearance="primary"
                    accessibilityRole="button"
                    onPress={() => setRecent([])}
                    style={{ marginTop: 6, marginRight: 4 }}
                  >
                    Effacer
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {recent.map((r) => (
                    <Pressable
                      key={r}
                      onPress={() => setQuery(r)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        height: 36,
                        paddingHorizontal: 12,
                        borderRadius: theme.borderRadius.square,
                        borderWidth: 1,
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.surface,
                      }}
                    >
                      <Icon name="HistoryRegular" size={16} color={theme.colors.textMuted} />
                      <Text bold size="sm">
                        {r}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
            {sectionTitle('Grimpeurs à découvrir')}
            {climberRows(getClimbersToDiscover())}
            {sectionTitle('Salles près de toi')}
            {gymRows(getGymsNearby())}
          </Animated.View>
        ) : total === 0 ? (
          <EmptyState
            icon="SearchRegular"
            title="Aucun résultat"
            text={`Rien ne correspond à « ${query.trim()} ». Vérifie l’orthographe ou essaie un nom de salle.`}
          />
        ) : (
          <View style={{ gap: 10 }}>
            {show(2) && results.gyms.length > 0 && (
              <>
                {sectionTitle(`Salles · ${results.gyms.length}`)}
                {gymRows(results.gyms)}
              </>
            )}
            {show(1) && results.climbers.length > 0 && (
              <>
                {sectionTitle(`Grimpeurs · ${results.climbers.length}`)}
                {climberRows(results.climbers)}
              </>
            )}
            {show(3) && results.blocs.length > 0 && (
              <>
                {sectionTitle(`Blocs · ${results.blocs.length}`)}
                {blocRows}
              </>
            )}
            {filter !== 0 &&
              [0, results.climbers.length, results.gyms.length, results.blocs.length][filter] ===
                0 && (
                <Text appearance="gray" style={{ textAlign: 'center', paddingTop: 30 }}>
                  Aucun {['', 'grimpeur', 'salle', 'bloc'][filter]} pour « {query.trim()} ».
                </Text>
              )}
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
