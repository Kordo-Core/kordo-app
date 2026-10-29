import { Fragment, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Icon, IconButton, ListRow, Section, Text } from 'kordo-ui';
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
const WEEK = [
  { value: '3', label: 'activités' },
  { value: '6h51', label: 'en salle' },
  { value: '33', label: 'blocs' },
];

export default function UserProfile() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'UserProfile'>>();

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

  // Pastilles d'icône des lignes de navigation, selon le thème
  const tones = {
    green: [theme.colors.soft, theme.colors.softText],
    blue: [theme.colors.info.lighter, theme.colors.info.base],
    orange: [theme.colors.primary.lightest, theme.colors.accentText],
    red: [theme.colors.error.lighter, theme.colors.error.base],
    neutral: [theme.colors.surfaceAlt, theme.colors.text],
  } as const;

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: theme.spacing.xxl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Couverture photo, coins inférieurs arrondis */}
        <View
          style={{
            height: 210,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            overflow: 'hidden',
          }}
        >
          <Image source={{ uri: COVER_URI }} style={{ width: '100%', height: '100%' }} />
          <LinearGradient
            colors={['rgba(19,32,27,0.5)', 'rgba(19,32,27,0.05)']}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </View>

        <View
          style={{
            marginTop: -52,
            paddingHorizontal: theme.spacing.lg,
            gap: theme.spacing.lg,
          }}
        >
          <ProfileSummary
            user={user}
            stats={stats}
            isOwnProfile={isOwnProfile}
            followStatus={followStatus}
            onToggleFollow={handleToggleFollow}
            onPressMessage={openConversation}
            onPressStat={openRelations}
          />

          {/* Résumé de la semaine : carte héro verte */}
          <LinearGradient
            colors={theme.colors.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: theme.borderRadius.card + 2,
              padding: theme.spacing.lg + 2,
              gap: theme.spacing.sm + 2,
            }}
          >
            <Text variant="eyebrow" size={11} appearance="white" style={{ opacity: 0.8 }}>
              Cette semaine
            </Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              {WEEK.map((w) => (
                <View key={w.label}>
                  <Text variant="display" size={32} appearance="white">
                    {w.value}
                  </Text>
                  <Text size="xs" bold appearance="white" style={{ opacity: 0.75 }}>
                    {w.label}
                  </Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
          <Section gap="xs">
            {NAV_ITEMS.map(({ label, icon, tone, pivot }) => (
              <Fragment key={label}>
                <Pressable
                  disabled={!pivot}
                  onPress={pivot ? () => openRelations(pivot) : undefined}
                >
                  <ListRow
                    left={
                      <View
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: tones[tone][0],
                        }}
                      >
                        <Icon name={icon} size={19} color={tones[tone][1]} />
                      </View>
                    }
                    primaryText={<Text bold>{label}</Text>}
                    right={<Icon name="chevron-right" color={theme.colors.textMuted} />}
                  />
                </Pressable>
              </Fragment>
            ))}
          </Section>

          <Section gap="md" style={{ paddingVertical: theme.spacing.lg }}>
            <TrophyShelf title={isOwnProfile ? 'Mes trophées' : 'Collection de trophées'} />
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
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.sm,
          }}
        >
          <IconButton
            icon="ArrowLeftRegular"
            variant="glass"
            accessibilityLabel="Retour"
            onPress={() => navigation.goBack()}
          />
          <IconButton
            icon={isOwnProfile ? 'settings' : 'more-vertical'}
            variant="glass"
            accessibilityLabel={isOwnProfile ? 'Paramètres' : 'Plus d’options'}
            onPress={isOwnProfile ? () => navigation.navigate('Settings') : undefined}
          />
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
}
