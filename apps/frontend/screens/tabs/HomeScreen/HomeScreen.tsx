import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { Activity, Header, IconButton, Now, Publication, Text, TextPost } from 'kordo-ui';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import {
  CURRENT_USER,
  getConversations,
  getHomeFeed,
  getNowFeed,
  getUnreadNotificationCount,
  HomeFeedItem,
} from 'fake_data';
import { RootStackParamList } from '../../../App';
import type { MainTabsParamList } from '../../MainTabs';

// Résumé de la semaine affiché dans la carte héro. Données fictives tant que l'API des
// statistiques n'existe pas : blocs par jour du lundi au dimanche.
const WEEK_BLOCS = [6, 14, 2, 11, 20, 3, 8];
const WEEK_SUMMARY = [
  { value: '43', label: 'blocs' },
  { value: '8h54', label: 'en salle' },
  { value: '4', label: 'activités' },
];

const formatToday = () =>
  new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Même navigateur vu comme onglets : la carte héro ouvre l'onglet Stats
  const tabs = useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  const homeFeed = useMemo(() => getHomeFeed(), []);
  // Grimpeurs actuellement en séance (posts « Now ») : la rangée de « stories » en tête
  const liveUsers = useMemo(() => {
    const seen = new Set<string>();
    return getNowFeed().filter((n) => {
      if (seen.has(n.user.id)) return false;
      seen.add(n.user.id);
      return true;
    });
  }, []);
  const unreadNotifications = getUnreadNotificationCount(CURRENT_USER.id);
  const unreadMessages = useMemo(
    () => getConversations().reduce((sum, c) => sum + c.unreadCount, 0),
    [],
  );

  // Position de scroll passée au header "smart" + hauteur du header pour décaler le contenu
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const maxDay = Math.max(...WEEK_BLOCS);

  const openProfile = (userId: string) => navigation.navigate('UserProfile', { userId });

  const listHeader = (
    <View style={{ gap: theme.spacing.lg + 2, marginBottom: theme.spacing.xs }}>
      {/* Stories : grimpeurs en séance, anneau vert + pastille NOW */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.lg + 2, gap: 14 }}
      >
        <Pressable
          onPress={() => openProfile(CURRENT_USER.id)}
          style={{ alignItems: 'center', gap: 6 }}
        >
          <View
            style={{
              width: 66,
              height: 66,
              borderRadius: 33,
              borderWidth: 2,
              borderColor: theme.colors.border,
              padding: 3,
            }}
          >
            <Image
              source={{ uri: CURRENT_USER.avatarUrl }}
              style={{ width: '100%', height: '100%', borderRadius: 30 }}
            />
          </View>
          <Text size="xs" bold>
            Toi
          </Text>
        </Pressable>
        {liveUsers.map((n, i) => (
          <Animated.View key={n.id} entering={ZoomIn.delay(80 * i).springify()}>
            <Pressable
              onPress={() => openProfile(n.user.id)}
              style={{ alignItems: 'center', gap: 6 }}
            >
              <View
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 33,
                  borderWidth: 2.5,
                  borderColor: theme.colors.secondary.base,
                  padding: 3,
                }}
              >
                <Image
                  source={{ uri: n.user.avatarUrl }}
                  style={{ width: '100%', height: '100%', borderRadius: 30 }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: -7,
                    alignSelf: 'center',
                    paddingHorizontal: 6,
                    height: 17,
                    borderRadius: 999,
                    borderWidth: 2,
                    borderColor: theme.colors.background,
                    backgroundColor: theme.colors.secondary.base,
                    justifyContent: 'center',
                  }}
                >
                  <Text size={9} extraBold appearance="white" style={{ letterSpacing: 0.4 }}>
                    NOW
                  </Text>
                </View>
              </View>
              <Text size="xs" bold numberOfLines={1} style={{ maxWidth: 66 }}>
                {n.user.firstName ?? n.user.username}
              </Text>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Carte héro : résumé de la semaine, ouvre la progression */}
      <Animated.View entering={FadeInDown.delay(120).duration(500)}>
        <Pressable onPress={() => tabs.navigate('Stats')}>
          <LinearGradient
            colors={theme.colors.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              marginHorizontal: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.xl,
              gap: theme.spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text variant="eyebrow" size={11} appearance="white" style={{ opacity: 0.8 }}>
                Ton résumé · cette semaine
              </Text>
              <View
                style={{
                  height: 24,
                  paddingHorizontal: 10,
                  borderRadius: 999,
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.16)',
                }}
              >
                <Text size="xs" extraBold appearance="white">
                  +12 %
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <View style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
                {WEEK_SUMMARY.map((s) => (
                  <View key={s.label}>
                    <Text variant="display" size={38} appearance="white">
                      {s.value}
                    </Text>
                    <Text size="xs" bold appearance="white" style={{ opacity: 0.75 }}>
                      {s.label}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 46 }}>
                {WEEK_BLOCS.map((v, i) => (
                  <View
                    key={i}
                    style={{
                      width: 7,
                      height: Math.max(4, (v / maxDay) * 46),
                      borderRadius: 4,
                      backgroundColor:
                        v === maxDay ? theme.colors.primary.base : 'rgba(255,255,255,0.5)',
                    }}
                  />
                ))}
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );

  return (
    <ScreenLayout>
      <Header
        smart
        scrollY={scrollY}
        onLayout={(e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height)}
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            <IconButton
              icon="AlertRegular"
              accessibilityLabel={`Notifications, ${unreadNotifications} non lues`}
              badge={unreadNotifications > 0 ? unreadNotifications : undefined}
              onPress={() => navigation.navigate('Notifications')}
            />
            <IconButton
              icon="ChatRegular"
              accessibilityLabel={`Messages, ${unreadMessages} non lus`}
              badge={unreadMessages > 0 ? unreadMessages : undefined}
              onPress={() => navigation.navigate('Conversations')}
            />
            <Pressable onPress={() => openProfile(CURRENT_USER.id)} accessibilityLabel="Mon profil">
              <Image
                source={{ uri: CURRENT_USER.avatarUrl }}
                style={{ width: 44, height: 44, borderRadius: 14 }}
              />
            </Pressable>
          </View>
        }
      >
        <View>
          <Text variant="eyebrow" size={11}>
            {formatToday()}
          </Text>
          <Text variant="display" size="md" numberOfLines={1}>
            Salut {CURRENT_USER.firstName ?? CURRENT_USER.username}
          </Text>
        </View>
      </Header>

      <FlatList
        style={{ flex: 1 }}
        data={homeFeed}
        keyExtractor={(item) => item.data.id}
        scrollEventThrottle={16}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          setScrollY(e.nativeEvent.contentOffset.y)
        }
        ListHeaderComponent={listHeader}
        contentContainerStyle={{
          paddingTop: headerHeight + theme.spacing.sm,
          gap: theme.spacing.md,
          paddingBottom: 120,
        }}
        renderItem={({ item }: { item: HomeFeedItem }) => {
          switch (item.kind) {
            case 'now':
              return (
                <Now
                  now={item.data}
                  onPressUser={(user) => openProfile(user.id)}
                  onPressGym={(gym) => navigation.navigate('Gym', { gymId: gym.id })}
                />
              );
            case 'activity':
              return (
                <Activity
                  activity={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => openProfile(user.id)}
                  onPressBloc={(bloc) =>
                    navigation.navigate('Gym', { gymId: item.data.gym.id, blocId: bloc.id })
                  }
                />
              );
            case 'publication':
              return (
                <Publication
                  publication={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => openProfile(user.id)}
                />
              );
            case 'text':
              return (
                <TextPost
                  textPost={item.data}
                  currentUser={CURRENT_USER}
                  onPressUser={(user) => openProfile(user.id)}
                />
              );
          }
        }}
      />
    </ScreenLayout>
  );
}
