import { ReactNode, useEffect, useMemo } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { Button, Text } from 'kordo-ui';
import { RankingRow } from './components/RankingRow/RankingRow';
import { RankingEntry, getCurrentUserRank, getGymRanking } from '../../../../fake_data';
import { RootStackParamList } from '../../../../App';

const PERIODS = ['Semaine', 'Mois', 'Saison'];
// Points de la période, en attendant une API par période : le mois est la référence
const PERIOD_FACTORS = [0.25, 1, 3.2];

// « Adam O. » : prénom et initiale du nom, pour tenir sous un avatar
const shortName = (first?: string, last?: string) =>
  [first, last ? `${last[0]}.` : undefined].filter(Boolean).join(' ');

// Couronne du premier : flotte à peine, très lentement
function Crown({ color }: { color: string }) {
  const float = useSharedValue(0);
  useEffect(() => {
    float.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [float]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: -2 * float.value }] }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', top: -23, left: 0, right: 0, alignItems: 'center' }, style]}
    >
      <Svg width={24} height={18} viewBox="0 0 24 18" fill="none">
        <Path
          d="M2 16h20M3 13L2 3l6 5 4-7 4 7 6-5-1 10z"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          fill={color}
        />
      </Svg>
    </Animated.View>
  );
}

// Marche du podium : monte sans rebond à l'apparition, rang inscrit en haut
function Step({
  height,
  delay,
  first,
  label,
}: {
  height: number;
  delay: number;
  first: boolean;
  label: string;
}) {
  const theme = useTheme();
  const rise = useSharedValue(0);
  useEffect(() => {
    rise.value = withDelay(
      delay,
      withTiming(1, { duration: 420, easing: Easing.bezier(0.2, 0, 0, 1) }),
    );
  }, [rise, delay]);
  const riseStyle = useAnimatedStyle(() => ({ height: height * rise.value }));
  return (
    <Animated.View
      style={[
        {
          width: 90,
          overflow: 'hidden',
          alignItems: 'center',
          paddingTop: 8,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: first ? theme.colors.primary.base : 'rgba(255, 255, 255, 0.16)',
        },
        riseStyle,
      ]}
    >
      <Text variant="display" size={40} style={{ color: first ? theme.colors.text : '#FFFFFF' }}>
        {label}
      </Text>
    </Animated.View>
  );
}

export interface RankingTabProps {
  gymId: string;
  gymImage?: string;
  /** En-tête de la page salle, identique sur Classement et Les blocs */
  header: ReactNode;
  /** 0 semaine, 1 mois, 2 saison */
  period: number;
  onPeriodChange: (period: number) => void;
}

// Classement d'une salle (design D) : une page qui défile, avec l'en-tête, la carte verte (période
// et podium) puis les grimpeurs à partir du 4e. Ma position reste épinglée en bas de l'écran.
export function RankingTab({ gymId, gymImage, header, period, onPeriodChange }: RankingTabProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const ranking = useMemo<RankingEntry[]>(
    () =>
      getGymRanking(gymId).map((e) => ({
        ...e,
        totalPoints: Math.round(e.totalPoints * PERIOD_FACTORS[period]),
      })),
    [gymId, period],
  );
  const podium = [
    { entry: ranking[1], bar: 78, delay: 60, label: '2' },
    { entry: ranking[0], bar: 110, delay: 0, label: '1' },
    { entry: ranking[2], bar: 58, delay: 120, label: '3' },
  ].filter((p) => p.entry);
  const rest = ranking.slice(3);

  const me = useMemo(() => getCurrentUserRank(gymId), [gymId]);
  const myPoints = me ? Math.round(me.totalPoints * PERIOD_FACTORS[period]) : 0;
  // Prochain objectif : le top 10 si on en est loin, sinon la place juste au-dessus
  const nextGoal = (() => {
    if (!me) return '';
    if (me.rank === 1) return 'En tête du classement';
    const target = me.rank > 10 ? ranking[9] : ranking[me.rank - 2];
    if (!target) return `${myPoints.toLocaleString('fr-FR')} pts`;
    const gap = (target.totalPoints - myPoints + 1).toLocaleString('fr-FR');
    if (me.rank > 10) return `Encore ${gap} pts pour le top 10`;
    return `Encore ${gap} pts pour la ${me.rank === 2 ? '1re' : `${me.rank - 1}e`}`;
  })();

  // Parallaxe discrète : en défilant, le podium remonte un peu moins vite que la page et
  // s'estompe légèrement, la photo en filigrane glisse à peine
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });
  const podiumStyle = useAnimatedStyle(() => {
    const y = Math.max(0, scrollY.value);
    return {
      opacity: interpolate(y, [0, 260], [1, 0.55], Extrapolation.CLAMP),
      transform: [{ translateY: y * 0.18 }],
    };
  });
  const textureStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(0, scrollY.value) * 0.3 }],
  }));

  const openProfile = (userId: string) => navigation.push('UserProfile', { userId });

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: me ? Math.max(24, insets.bottom) + 66 + 30 : 30,
          gap: theme.spacing.md + 2,
        }}
      >
        {header}

        {/* Carte verte : période et podium */}
        <LinearGradient
          colors={theme.colors.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            marginHorizontal: 14,
            paddingTop: theme.spacing.lg,
            paddingHorizontal: 14,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: `0px 16px 32px ${theme.mode === 'dark' ? 'rgba(0, 163, 111, 0.25)' : 'rgba(0, 132, 90, 0.25)'}`,
          }}
        >
          {/* Photo de la salle en filigrane */}
          {!!gymImage && (
            <Animated.Image
              source={{ uri: gymImage }}
              style={[
                { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.12 },
                textureStyle,
              ]}
              resizeMode="cover"
            />
          )}

          {/* Période */}
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {PERIODS.map((label, i) => (
              <Pressable
                key={label}
                onPress={() => onPeriodChange(i)}
                accessibilityRole="tab"
                accessibilityState={{ selected: i === period }}
                style={({ pressed }) => ({
                  height: 32,
                  paddingHorizontal: 14,
                  borderRadius: theme.borderRadius.rounded,
                  borderWidth: 1.5,
                  borderColor: i === period ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)',
                  justifyContent: 'center',
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                })}
              >
                <Text size="xs" extraBold appearance="white">
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Podium : les marches reposent sur le bord bas du bandeau */}
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: theme.spacing.sm,
                marginTop: 26,
              },
              podiumStyle,
            ]}
          >
            {podium.map(({ entry, bar, delay, label }) => (
              <View key={entry.user.id} style={{ width: 98, alignItems: 'center', gap: 6 }}>
                <Pressable
                  onPress={() => openProfile(entry.user.id)}
                  style={{ alignItems: 'center', gap: 6 }}
                >
                  {/* Anneau de 3 px autour de l'avatar : orange pour le premier */}
                  <View
                    style={{
                      borderRadius: 8,
                      boxShadow: `0px 0px 0px 3px ${
                        label === '1' ? theme.colors.primary.base : 'rgba(255, 255, 255, 0.5)'
                      }`,
                    }}
                  >
                    <Image
                      source={{ uri: entry.user.avatarUrl }}
                      style={{
                        width: label === '1' ? 68 : 56,
                        height: label === '1' ? 68 : 56,
                        borderRadius: 8,
                      }}
                    />
                    {label === '1' && <Crown color={theme.colors.primary.base} />}
                  </View>
                  <Text size={13} extraBold appearance="white" numberOfLines={1}>
                    {shortName(entry.user.firstName, entry.user.lastName)}
                  </Text>
                  <Text size="xs" bold style={{ color: theme.colors.soft }}>
                    {entry.totalPoints.toLocaleString('fr-FR')} pts
                  </Text>
                </Pressable>
                <Step height={bar} delay={delay} first={label === '1'} label={label} />
              </View>
            ))}
          </Animated.View>
        </LinearGradient>

        {/* Liste, posée sous la carte */}
        <View style={{ paddingHorizontal: 14, gap: 8 }}>
          {rest.map((entry, i) => (
            <Animated.View
              key={`${period}-${entry.user.id}`}
              entering={FadeIn.delay(Math.min(i, 6) * 30).duration(260)}
            >
              <Pressable
                onPress={() => openProfile(entry.user.id)}
                style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}
              >
                <RankingRow entry={entry} />
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </Animated.ScrollView>

      {/* Ma position, épinglée en bas : mon prochain objectif et un raccourci pour enregistrer
          un bloc */}
      {me && (
        <Animated.View
          entering={FadeInDown.delay(500).duration(600)}
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            // Même place et même hauteur que la barre de navigation flottante des onglets
            bottom: Math.max(24, insets.bottom),
            height: 66,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingLeft: 14,
            paddingRight: 12,
            borderRadius: 9,
            // Bandeau inversé : encre sur fond clair en sombre, comme la maquette
            backgroundColor: theme.colors.text,
            boxShadow: '0px 14px 30px rgba(0, 0, 0, 0.28)',
          }}
        >
          <Text variant="display" size={24} style={{ width: 28, color: theme.colors.primary.base }}>
            {me.rank}
          </Text>
          <Image
            source={{ uri: me.user.avatarUrl }}
            style={{ width: 42, height: 42, borderRadius: 6 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              bold
              style={{
                color: theme.mode === 'dark' ? theme.colors.background : theme.colors.neutral.white,
              }}
            >
              Toi
            </Text>
            <Text size="xs" bold numberOfLines={2} style={{ color: '#7F8C86' }}>
              {nextGoal}
            </Text>
          </View>
          <Button
            appearance="primary"
            size="sm"
            borderRadius="square"
            textSize={13}
            containerStyle={{ height: 40, paddingHorizontal: 14, borderRadius: 6 }}
            title="+ Bloc"
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({ name: 'MainTabs', params: { screen: 'Add' } }),
              )
            }
          />
        </Animated.View>
      )}
    </View>
  );
}
