import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import { Marquee, Text } from 'kordo-ui';
import {
  FAVORITE_GYMS,
  Gym,
  GYM_LIVE_COUNTS,
  PASSPORT_TOTAL,
  VISIT_LOG,
} from '../../../fake_data/gyms.fake';
import { getBlocsByGym, getCurrentUserRank } from '../../../fake_data';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { RootStackParamList } from '../../../App';
import { GymCoverCard } from './components/GymCoverCard';
import { PassportCard } from './components/PassportCard';
import { VisitTimeline } from './components/VisitTimeline';
import { TopGyms } from './components/TopGyms';
import { FavoriteGyms } from './components/FavoriteGyms';
import { GymCategories } from './components/GymCategories';
import { AllGymsTeaser } from './components/AllGymsTeaser';

const SECTION_GAP = 30;

// Onglet Salles (design D) : la dernière salle visitée, le passeport, les dernières visites, le
// top 5, les favorites, les catégories, puis l'accès à toutes les salles.
export default function GymsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Les salles favorites sont, par définition, aimées au départ
  const [likedGyms, setLikedGyms] = useState<Set<string>>(
    () => new Set(FAVORITE_GYMS.map((g) => g.id)),
  );
  const toggleLike = (gymId: string) =>
    setLikedGyms((prev) => {
      const next = new Set(prev);
      if (next.has(gymId)) next.delete(gymId);
      else next.add(gymId);
      return next;
    });
  const isLiked = (gymId: string) => likedGyms.has(gymId);

  const openGym = (gym: Gym) => navigation.navigate('Gym', { gymId: gym.id });

  const lastVisit = VISIT_LOG[0];
  const rank = useMemo(() => getCurrentUserRank(lastVisit.gym.id)?.rank, [lastVisit.gym.id]);
  const blocCount = useMemo(() => getBlocsByGym(lastVisit.gym.id).length, [lastVisit.gym.id]);

  return (
    <ScreenLayout>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 120 }}
      >
        <View style={{ paddingHorizontal: 14, gap: theme.spacing.xs }}>
          <Text variant="eyebrow" size={12} appearance="gray">
            {PASSPORT_TOTAL} salles partenaires
          </Text>
          <Text variant="display" size={47}>
            Salles
          </Text>
        </View>

        <View style={{ marginTop: theme.spacing.lg, gap: theme.spacing.lg }}>
          <GymCoverCard
            gym={lastVisit.gym}
            lastVisit={lastVisit.when.toLowerCase()}
            rank={rank}
            blocCount={blocCount}
            liveCount={GYM_LIVE_COUNTS[lastVisit.gym.id]}
            onPressRanking={() => openGym(lastVisit.gym)}
            onPressBlocs={() =>
              navigation.navigate('Gym', { gymId: lastVisit.gym.id, initialTab: 'blocs' })
            }
          />
          <PassportCard onPressGym={openGym} />
        </View>

        {/* Bandeau qui défile, légèrement incliné */}
        <View
          style={{
            marginTop: 28,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.colors.primary.base,
            transform: [{ rotate: '-1.4deg' }, { scale: 1.03 }],
          }}
        >
          <Marquee>
            <Text variant="display" size={31} numberOfLines={1} style={{ color: '#0B1410' }}>
              Pense à mettre à jour les blocs réussis pour grimper au classement.
            </Text>
          </Marquee>
        </View>

        <View style={{ marginTop: SECTION_GAP, gap: SECTION_GAP }}>
          <VisitTimeline onPressGym={openGym} />
          <TopGyms onPressGym={openGym} />
          <FavoriteGyms isLiked={isLiked} onToggleLike={toggleLike} onPressGym={openGym} />
          <GymCategories isLiked={isLiked} onToggleLike={toggleLike} onPressGym={openGym} />

          <AllGymsTeaser onPress={() => navigation.navigate('AllGyms')} />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
