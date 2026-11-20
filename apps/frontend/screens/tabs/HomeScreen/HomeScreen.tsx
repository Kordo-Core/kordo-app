import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  FadeInDown,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  Activity,
  BarChart,
  Header,
  IconButton,
  MeetSuggestions,
  Now,
  Publication,
  Text,
  TextPost,
} from 'kordo-ui';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import {
  CURRENT_USER,
  getConversations,
  getHomeFeed,
  getNowFeed,
  getUnreadNotificationCount,
  HomeFeedEntry,
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

// Texte secondaire posé sur le dégradé vert de la carte héro

const STORY_SIZE = 66;
// Story ronde (maquette « sport ») : anneau de 66 px, photo de 60 px dans un liseré de 3 px
const STORY_RADIUS = STORY_SIZE / 2;
const HEADER_BUTTON = 46;
// Pastille de tendance de la carte résumé : pilule translucide sur le dégradé vert
const TREND_PILL = {
  height: 26,
  paddingHorizontal: 10,
  borderRadius: 999,
  justifyContent: 'center' as const,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
};

// Avatar d'une story (carré arrondi) : anneau en dégradé orange / vert qui tourne lentement quand le grimpeur
// est en séance (avec la pastille NOW), anneau gris fixe sinon.
function StoryAvatar({ uri, live }: { uri?: string; live?: boolean }) {
  const theme = useTheme();
  const spin = useSharedValue(0);
  useEffect(() => {
    if (live) spin.value = withRepeat(withTiming(1, { duration: 6000, easing: Easing.linear }), -1);
  }, [live, spin]);
  const spinStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value * 360}deg` }] }));

  return (
    <View style={{ width: STORY_SIZE, height: STORY_SIZE, padding: 3 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: STORY_RADIUS,
          overflow: 'hidden',
          backgroundColor: theme.colors.border,
        }}
      >
        {live && (
          // Plus grand que l'avatar et centré : en tournant, le dégradé couvre tout l'anneau
          // (un carré de même taille laisserait voir les coins du fond à 45°)
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: STORY_SIZE * 1.5,
                height: STORY_SIZE * 1.5,
                top: -STORY_SIZE * 0.25,
                left: -STORY_SIZE * 0.25,
              },
              spinStyle,
            ]}
          >
            <LinearGradient
              colors={[
                theme.colors.primary.base,
                theme.colors.secondary.base,
                theme.colors.primary.base,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        )}
      </View>
      <Image
        source={{ uri }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: STORY_RADIUS - 3,
          borderWidth: 3,
          borderColor: theme.colors.background,
        }}
      />
      {live && (
        // Pastille NOW de la maquette : 16 px de haut dans un liseré de 2 px couleur du fond.
        // Centrée par une rangée pleine largeur : en natif, alignSelf est ignoré sur un enfant
        // en position absolue et la pastille partait à gauche.
        <View
          pointerEvents="none"
          style={{ position: 'absolute', left: 0, right: 0, bottom: -4, alignItems: 'center' }}
        >
          <View
            style={{
              height: 20,
              paddingHorizontal: 8,
              borderRadius: 999,
              borderWidth: 2,
              borderColor: theme.colors.background,
              backgroundColor: theme.colors.secondary.base,
              justifyContent: 'center',
            }}
          >
            {/* L'espacement des lettres s'ajoute aussi après la dernière : compensé à droite.
                Vertical : sans la marge interne d'Android (qui poussait le texte ~1 px trop bas),
                la boîte du texte suit l'ascendante et la descendante de la police ; des capitales
                sans jambage y restent 0,4 px sous le centre, d'où le léger décalage vers le haut. */}
            <Text
              size={11}
              extraBold
              appearance="white"
              style={{
                letterSpacing: 0.4,
                marginRight: -0.4,
                includeFontPadding: false,
                textAlignVertical: 'center',
                transform: [{ translateY: -0.4 }],
              }}
            >
              NOW
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const formatToday = () =>
  new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

export default function HomeScreen() {
  const theme = useTheme();
  // Redessine l'accueil au retour sur l'onglet (prénom modifié dans « Modifier le profil »)
  useIsFocused();
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
  const { width: screenWidth } = useWindowDimensions();
  const narrow = screenWidth < 375;
  const maxDay = Math.max(...WEEK_BLOCS);

  const openProfile = (userId: string) => navigation.navigate('UserProfile', { userId });
  // Les boutons de l'en-tête d'accueil sont un peu plus grands et plus détachés que ceux des sous-pages
  const headerButtonStyle = { borderRadius: 7, boxShadow: theme.shadows.md };

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
          style={{ alignItems: 'center', gap: 6, width: STORY_SIZE }}
        >
          <StoryAvatar uri={CURRENT_USER.avatarUrl} />
          <Text size="xs" bold>
            Toi
          </Text>
        </Pressable>
        {liveUsers.map((n, i) => (
          <Animated.View key={n.id} entering={ZoomIn.delay(80 * i).springify()}>
            <Pressable
              onPress={() => openProfile(n.user.id)}
              style={{ alignItems: 'center', gap: 6, width: STORY_SIZE }}
            >
              <StoryAvatar uri={n.user.avatarUrl} live />
              <Text size="xs" bold numberOfLines={1}>
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
              gap: 14,
              boxShadow: `0px 16px 32px ${theme.mode === 'dark' ? 'rgba(0, 163, 111, 0.25)' : 'rgba(0, 132, 90, 0.25)'}`,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text variant="eyebrow" size={11} style={{ color: theme.colors.soft }}>
                Ton résumé · cette semaine
              </Text>
              <View style={TREND_PILL}>
                <Text size="xs" extraBold appearance="white">
                  +12 %
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: narrow ? theme.spacing.md : 20,
                  flexShrink: 1,
                }}
              >
                {WEEK_SUMMARY.map((s) => (
                  <View key={s.label}>
                    {/* Chiffres en casse normale : « 8h54 » et non « 8H54 » */}
                    <Text
                      variant="display"
                      size={narrow ? 35 : 47}
                      appearance="white"
                      style={{ textTransform: 'none' }}
                    >
                      {s.value}
                    </Text>
                    <Text
                      size="xs"
                      style={{
                        color: theme.colors.soft,
                        marginTop: 4,
                        fontFamily: theme.fonts.semiBold,
                      }}
                    >
                      {s.label}
                    </Text>
                  </View>
                ))}
              </View>
              <BarChart
                data={WEEK_BLOCS.map((value) => ({ value }))}
                height={48}
                barWidth={narrow ? 5 : 7}
                tone="light"
                delay={300}
                highlightIndex={WEEK_BLOCS.indexOf(maxDay)}
                colors={{ bar: 'rgba(255,255,255,0.5)', empty: 'rgba(255,255,255,0.5)' }}
                unit="blocs"
                style={{ height: 48 }}
              />
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
        topGap={12}
        scrollY={scrollY}
        style={{ paddingHorizontal: 4 }}
        onLayout={(e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height)}
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
            {/* Notifications : point orange pulsant (du nouveau, sans compter) ; messages : compteur */}
            <IconButton
              icon="AlertRegular"
              size={HEADER_BUTTON}
              accessibilityLabel={`Notifications, ${unreadNotifications} non lues`}
              dot={unreadNotifications > 0}
              onPress={() => navigation.navigate('Notifications')}
              style={headerButtonStyle}
            />
            <IconButton
              icon="ChatRegular"
              size={HEADER_BUTTON}
              accessibilityLabel={`Messages, ${unreadMessages} non lus`}
              badge={unreadMessages > 0 ? unreadMessages : undefined}
              onPress={() => navigation.navigate('Conversations')}
              style={headerButtonStyle}
            />
            <Pressable onPress={() => openProfile(CURRENT_USER.id)} accessibilityLabel="Mon profil">
              <Image
                source={{ uri: CURRENT_USER.avatarUrl }}
                style={{ width: HEADER_BUTTON, height: HEADER_BUTTON, borderRadius: 7 }}
              />
            </Pressable>
          </View>
        }
      >
        <View style={{ gap: theme.spacing.xs }}>
          <Text variant="eyebrow" size={12}>
            {formatToday()}
          </Text>
          <Text variant="display" size={42}>
            Salut {CURRENT_USER.firstName ?? CURRENT_USER.username}
          </Text>
        </View>
      </Header>

      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={homeFeed}
        keyExtractor={(item) => item.data.id}
        scrollEventThrottle={16}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          setScrollY(e.nativeEvent.contentOffset.y)
        }
        ListHeaderComponent={listHeader}
        contentContainerStyle={{
          paddingTop: headerHeight + theme.spacing.sm,
          gap: theme.spacing.lg + 2,
          paddingBottom: 120,
        }}
        renderItem={({ item }: { item: HomeFeedEntry }) => {
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
            case 'meetSuggestions':
              return (
                <MeetSuggestions
                  suggestions={item.data.suggestions}
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
