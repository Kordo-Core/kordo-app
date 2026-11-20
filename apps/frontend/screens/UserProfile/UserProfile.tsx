import { useState } from 'react';
import { Image, Pressable, ScrollView, Share, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Icon, IconButton, Section, Text } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { ProfileSummary } from './components/ProfileSummary/ProfileSummary';
import { FollowStatus } from './components/ProfileSummary/ProfileSummary.types';
import { TrophyShelf } from './components/TrophyShelf/TrophyShelf';
import {
  CURRENT_USER,
  findConversationWith,
  getFollowStatus,
  getUserById,
  getUserProfileStats,
  getUserClimbingCounts,
} from 'fake_data';
import { RootStackParamList } from '../../App';
import { RelationPivot } from '../UserRelations/UserRelationsScreen.types';

// `pivot` renseigné = la ligne ouvre l'écran des listes du profil sur cet onglet.
// `tone` : couleur de la pastille d'icône (vert, bleu, orange, rouge, neutre)
const NAV_ITEMS: {
  label: string;
  icon: string;
  tone: 'green' | 'blue' | 'orange' | 'red' | 'neutral';
  pivot?: RelationPivot;
}[] = [
  { label: 'Activités', icon: 'list', tone: 'green', pivot: 'activities' },
  { label: 'Salles visitées', icon: 'location', tone: 'blue', pivot: 'gyms' },
  { label: 'Blocs validés', icon: 'checkmark-circle', tone: 'orange' },
  { label: 'Bêtas', icon: 'play', tone: 'red' },
  { label: 'Statistiques', icon: 'grid', tone: 'neutral' },
];

const COVER_URI =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg';

// Résumé de la semaine (données fictives tant que l'API des statistiques n'existe pas)
// Courbe de tendance de la carte (blocs par jour, normalisés sur la hauteur du tracé)
const TREND_PATH = 'M2 30 L14 24 L26 27 L38 16 L50 19 L62 9 L78 4';

const WEEK = [
  { value: '3', label: 'activités' },
  { value: '6h51', label: 'temps' },
  { value: '33', label: 'blocs' },
];

// Texte pâle posé sur le dégradé vert (clair comme sombre)

export default function UserProfile() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'UserProfile'>>();

  // Redessine l'écran au retour de « Modifier le profil » (données fictives modifiées en place)
  useIsFocused();
  const user = getUserById(params.userId);
  const isOwnProfile = params.userId === CURRENT_USER.id;
  const stats = getUserProfileStats(params.userId);

  // Statut de suivi local : initialisé depuis les fake_data, modifiable au tap (pas de backend).
  const [followStatus, setFollowStatus] = useState<FollowStatus>(() =>
    getFollowStatus(params.userId),
  );

  if (!user) return null;

  const handleToggleFollow = () =>
    setFollowStatus((current) => (current === 'following' ? 'none' : 'following'));

  const openRelations = (pivot: RelationPivot) =>
    navigation.navigate('UserRelations', { userId: params.userId, pivot });

  // Faute de backend, un fil inexistant ne peut pas être créé : on ouvre celui qui existe, sinon
  // on présente le choix du destinataire — même règle que l'écran « Nouveau message ».
  const openConversation = () => {
    const existing = findConversationWith(params.userId);
    if (existing) {
      navigation.navigate('Chat', { conversationId: existing.id });
      return;
    }
    navigation.navigate('NewConversation');
  };

  const climbing = getUserClimbingCounts(params.userId);

  // Compteurs affichés à droite des lignes de navigation, quand la donnée existe
  const counts: Record<string, number | undefined> = {
    Activités: stats.activitiesCount,
    'Salles visitées': stats.gymsVisitedCount,
    'Blocs validés': climbing.tops,
    Bêtas: climbing.betas,
  };

  // Pastilles d'icône des lignes de navigation, selon le thème
  const tones = {
    green: [theme.colors.soft, theme.colors.softText],
    blue: [theme.colors.info.lighter, theme.colors.info.base],
    orange: [theme.colors.primary.lighter, theme.colors.accentText],
    red: [theme.colors.error.lighter, theme.colors.error.base],
    neutral: [theme.colors.surfaceAlt, theme.colors.text],
  } as const;

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Couverture photo, coins inférieurs arrondis */}
        <View
          style={{
            height: 200,
            borderBottomLeftRadius: 13,
            borderBottomRightRadius: 13,
            overflow: 'hidden',
          }}
        >
          <Image source={{ uri: COVER_URI }} style={{ width: '100%', height: '100%' }} />
          <LinearGradient
            colors={[`rgba(${theme.colors.scrim}, 0.5)`, `rgba(${theme.colors.scrim}, 0.05)`]}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </View>

        <View
          style={{
            marginTop: -48,
            paddingHorizontal: 14,
            gap: 14,
          }}
        >
          <ProfileSummary
            user={user}
            stats={stats}
            isOwnProfile={isOwnProfile}
            followStatus={followStatus}
            onToggleFollow={handleToggleFollow}
            onPressMessage={openConversation}
            onPressEdit={() => navigation.navigate('EditProfile')}
            onPressStat={openRelations}
          />

          {/* Résumé de la semaine : carte héro verte */}
          <LinearGradient
            colors={theme.colors.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: theme.borderRadius.card,
              padding: 18,
              gap: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                variant="eyebrow"
                size={11}
                style={{ color: theme.colors.soft, letterSpacing: 1.6 }}
              >
                12 – 18 mai 2025
              </Text>
              {isOwnProfile && (
                <Pressable
                  onPress={() =>
                    navigation.dispatch(
                      CommonActions.navigate({ name: 'MainTabs', params: { screen: 'Stats' } }),
                    )
                  }
                  hitSlop={8}
                >
                  <Text size="xs" extraBold appearance="white">
                    Voir plus ›
                  </Text>
                </Pressable>
              )}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 20 }}>
              {WEEK.map((w) => (
                <View key={w.label}>
                  {/* Casse normale : « 6h51 » et non « 6H51 » */}
                  <Text
                    variant="display"
                    size={38}
                    appearance="white"
                    style={{ textTransform: 'none' }}
                  >
                    {w.value}
                  </Text>
                  <Text size={11} style={{ color: theme.colors.soft }}>
                    {w.label}
                  </Text>
                </View>
              ))}
              {/* Tendance de la semaine : courbe orange */}
              <Svg width={80} height={36} viewBox="0 0 80 36" style={{ marginLeft: 'auto' }}>
                <Path
                  d={TREND_PATH}
                  stroke={theme.colors.primary.base}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
          </LinearGradient>
        </View>

        <View style={{ gap: 14, marginTop: 14 }}>
          {/* Raccourcis : rangées de 62 px séparées par un filet (maquette « sport ») */}
          <Section
            gap="xs"
            style={{ paddingVertical: 0, paddingHorizontal: 0, gap: 0, overflow: 'hidden' }}
          >
            {NAV_ITEMS.map(({ label, icon, tone, pivot }, i) => (
              <Pressable
                key={label}
                disabled={!pivot}
                onPress={pivot ? () => openRelations(pivot) : undefined}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderTopWidth: i ? 1 : 0,
                  borderTopColor: theme.colors.border,
                }}
              >
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tones[tone][0],
                  }}
                >
                  <Icon name={icon} size={19} color={tones[tone][1]} />
                </View>
                <Text style={{ flex: 1, fontFamily: theme.fonts.semiBold }}>{label}</Text>
                {counts[label] !== undefined && (
                  <Text size="sm" bold appearance="gray">
                    {counts[label]}
                  </Text>
                )}
                <Icon name="chevron-right" size={18} color={theme.colors.textMuted} />
              </Pressable>
            ))}
          </Section>

          <Section gap="md" style={{ padding: 16 }}>
            <TrophyShelf
              title={isOwnProfile ? 'Mes trophées' : 'Collection de trophées'}
              onPressAll={() => navigation.navigate('Trophies')}
              // Les pages Badge s'adressent à moi : seulement depuis mon profil
              onPressTrophy={
                isOwnProfile ? (trophyId) => navigation.navigate('Badge', { trophyId }) : undefined
              }
              earnedOnly={!isOwnProfile}
            />
          </Section>
        </View>
      </ScrollView>

      {/* Boutons flottants sur la couverture */}
      <SafeAreaView
        edges={['top']}
        pointerEvents="box-none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
      >
        <View
          pointerEvents="box-none"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingTop: 14,
          }}
        >
          <IconButton
            icon="ChevronLeftRegular"
            variant="glass"
            size={42}
            accessibilityLabel="Retour"
            onPress={() => navigation.goBack()}
          />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {isOwnProfile && (
              <IconButton
                icon="share"
                variant="glass"
                size={42}
                accessibilityLabel="Partager"
                onPress={() =>
                  Share.share({ message: `Retrouve-moi sur Kordo : @${user.username}` }).catch(
                    () => {},
                  )
                }
              />
            )}
            <IconButton
              icon={isOwnProfile ? 'options' : 'more-vertical'}
              variant="glass"
              size={42}
              accessibilityLabel={isOwnProfile ? 'Paramètres' : 'Plus d’options'}
              onPress={isOwnProfile ? () => navigation.navigate('Settings') : undefined}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
}
