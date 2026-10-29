import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Icon, Text } from 'kordo-ui';
import { ScreenHeader } from '../../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { CURRENT_USER } from 'fake_data';
import { RootStackParamList } from '../../../App';

// Progression (design D) : fusion des écrans de stats des propositions A, B et C.
// Données fictives tant que l'API des statistiques n'existe pas.

type Period = 'week' | 'month' | 'year';

const PERIODS: Record<
  Period,
  {
    label: string;
    range: string;
    delta: string;
    labels: string[];
    values: number[];
    hours: string;
    sessions: number;
  }
> = {
  week: {
    label: 'Semaine',
    range: '5 – 11 mai',
    delta: '+12 %',
    labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    values: [6, 0, 9, 4, 0, 18, 6],
    hours: '8h54',
    sessions: 4,
  },
  month: {
    label: 'Mois',
    range: 'Mai 2025',
    delta: '+8 %',
    labels: ['S1', 'S2', 'S3', 'S4', 'S5'],
    values: [34, 43, 28, 39, 12],
    hours: '31h',
    sessions: 15,
  },
  year: {
    label: 'Année',
    range: '2025',
    delta: '+21 %',
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J'],
    values: [96, 110, 128, 102, 134, 120, 88],
    hours: '196h',
    sessions: 98,
  },
};

// Durée moyenne des six dernières séances, en minutes
const SESSION_MINUTES = [80, 120, 95, 140, 110, 134];

const PYRAMID: { grade: string; count: number; tone: 'primary' | 'primaryLight' | 'green' }[] = [
  { grade: '7A', count: 14, tone: 'primary' },
  { grade: '6C', count: 58, tone: 'primaryLight' },
  { grade: '6B', count: 132, tone: 'green' },
  { grade: '6A', count: 214, tone: 'green' },
  { grade: '≤5', count: 360, tone: 'green' },
];

const TOP_GYMS = [
  { name: 'Arkose Nation', visits: 42 },
  { name: 'Climb Up Paris', visits: 33 },
  { name: 'Arkose Massy', visits: 27 },
  { name: 'Murmur', visits: 21 },
];

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const WEEKS = 15;

// Niveau d'activité par jour sur 15 semaines (0 = repos, 3 = grosse séance), pseudo-aléatoire
// mais stable d'un rendu à l'autre.
const buildRegularity = () => {
  const levels: number[] = [];
  let seed = 7;
  for (let i = 0; i < WEEKS * 7; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const climbingDay = [1, 3, 5, 6].includes(i % 7);
    levels.push(climbingDay ? (r > 0.25 ? Math.ceil(r * 3) : 0) : r > 0.8 ? 1 : 0);
  }
  return levels;
};

// Barre verticale animée : sa hauteur pousse depuis zéro à chaque changement de période.
const GrowBar: React.FC<{
  height: number;
  color: string;
  delay: number;
  width?: number;
  radius?: number;
}> = ({ height, color, delay, width = 22, radius = 7 }) => {
  const h = useSharedValue(0);
  useEffect(() => {
    h.value = withDelay(delay, withTiming(height, { duration: 500 }));
  }, [height, delay]);
  const style = useAnimatedStyle(() => ({ height: h.value }));
  return <Animated.View style={[{ width, borderRadius: radius, backgroundColor: color }, style]} />;
};

// Jauge horizontale animée (pyramide, salles)
const GrowGauge: React.FC<{ ratio: number; color: string; delay: number; track: string }> = ({
  ratio,
  color,
  delay,
  track,
}) => {
  const w = useSharedValue(0);
  useEffect(() => {
    w.value = withDelay(delay, withTiming(ratio * 100, { duration: 600 }));
  }, [ratio, delay]);
  const style = useAnimatedStyle(() => ({ width: `${w.value}%` }));
  return (
    <View style={{ flex: 1, height: 10, borderRadius: 999, backgroundColor: track }}>
      <Animated.View style={[{ height: 10, borderRadius: 999, backgroundColor: color }, style]} />
    </View>
  );
};

export default function StatsScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [period, setPeriod] = useState<Period>('week');
  const data = PERIODS[period];
  const [selectedBar, setSelectedBar] = useState(5);
  const [selectedDay, setSelectedDay] = useState(WEEKS * 7 - 4);
  const [gymsOpen, setGymsOpen] = useState(true);

  const regularity = useMemo(buildRegularity, []);
  const total = data.values.reduce((a, b) => a + b, 0);
  const max = Math.max(...data.values);
  const barIndex = Math.min(selectedBar, data.values.length - 1);

  const heat = [theme.colors.border, '#B3D4C4', '#57987D', theme.colors.secondary.base];
  const pyramidColor = {
    primary: theme.colors.primary.base,
    primaryLight: theme.colors.primary.light,
    green: theme.colors.secondary.base,
  };
  const dayLevel = regularity[selectedDay];
  const dayTip = dayLevel
    ? `${['', '1–6', '7–14', '15+'][dayLevel]} blocs ce ${DAYS[selectedDay % 7]}`
    : `Repos ce ${DAYS[selectedDay % 7]}`;

  const card = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  } as const;

  const selectPeriod = (p: Period) => {
    setPeriod(p);
    setSelectedBar(PERIODS[p].values.length - 2);
  };

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Progression"
        eyebrow={data.range}
        right={
          <Pressable
            onPress={() => navigation.navigate('UserProfile', { userId: CURRENT_USER.id })}
            accessibilityLabel="Mes trophées"
            style={{
              width: 44,
              height: 44,
              borderRadius: theme.borderRadius.square,
              backgroundColor: theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="TrophyRegular" size="sm" />
          </Pressable>
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: 130,
          gap: theme.spacing.md,
        }}
      >
        {/* Héro : sélecteur de période, total de blocs et histogramme interactif */}
        <Animated.View entering={FadeInDown.duration(450)}>
          <LinearGradient
            colors={theme.colors.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: theme.borderRadius.lg, padding: theme.spacing.xl, gap: 14 }}
          >
            <View
              style={{
                flexDirection: 'row',
                padding: 4,
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.14)',
              }}
            >
              {(Object.keys(PERIODS) as Period[]).map((p) => {
                const on = p === period;
                return (
                  <Pressable
                    key={p}
                    onPress={() => selectPeriod(p)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: on }}
                    style={{
                      flex: 1,
                      height: 34,
                      borderRadius: 999,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: on ? theme.colors.neutral.white : 'transparent',
                    }}
                  >
                    <Text size="sm" extraBold style={{ color: on ? '#13201B' : '#FFFFFF' }}>
                      {PERIODS[p].label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text variant="eyebrow" size={11} appearance="white" style={{ opacity: 0.8 }}>
                Blocs validés · {data.range}
              </Text>
              <Text size="xs" extraBold appearance="white">
                {data.delta}
              </Text>
            </View>

            <Animated.View key={period} entering={FadeIn.duration(300)}>
              <Text variant="display" size={64} appearance="white">
                {total}
              </Text>
            </Animated.View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: 110,
              }}
            >
              {data.values.map((v, i) => {
                const on = i === barIndex;
                return (
                  <Pressable
                    key={`${period}-${i}`}
                    onPress={() => setSelectedBar(i)}
                    accessibilityLabel={`${data.labels[i]} : ${v} blocs`}
                    style={{ alignItems: 'center', gap: 6, flex: 1 }}
                  >
                    <Text size="xs" extraBold appearance="white" style={{ opacity: on ? 1 : 0 }}>
                      {v}
                    </Text>
                    <GrowBar
                      height={Math.max(6, (v / max) * 72)}
                      delay={i * 40}
                      color={
                        on
                          ? theme.colors.primary.base
                          : v
                            ? 'rgba(255,255,255,0.55)'
                            : 'rgba(255,255,255,0.15)'
                      }
                    />
                    <Text size="xs" bold appearance="white" style={{ opacity: 0.7 }}>
                      {data.labels[i]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Grille de chiffres clés */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(450)}
          style={{ flexDirection: 'row', gap: theme.spacing.md }}
        >
          <View style={[card, { flex: 1, backgroundColor: theme.colors.primary.lightest }]}>
            <Text variant="eyebrow" size={11} appearance="primary">
              Niveau max
            </Text>
            <Text variant="display" size={44}>
              7A
            </Text>
            <Text size="xs" appearance="gray">
              depuis mars · Excalibur
            </Text>
          </View>
          <View style={[card, { flex: 1 }]}>
            <Text variant="eyebrow" size={11}>
              Temps en salle
            </Text>
            <Text variant="display" size={44}>
              {data.hours}
            </Text>
            <Text size="xs" appearance="gray">
              {data.sessions} activités
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(160).duration(450)}
          style={{ flexDirection: 'row', gap: theme.spacing.md }}
        >
          <View style={[card, { flex: 1 }]}>
            <Text variant="eyebrow" size={11}>
              Min / séance
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
              <Text variant="display" size={36}>
                134
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 36 }}>
                {SESSION_MINUTES.map((m, i) => (
                  <GrowBar
                    key={i}
                    width={6}
                    radius={3}
                    delay={300 + i * 50}
                    height={(m / 140) * 36}
                    color={
                      i === SESSION_MINUTES.length - 1
                        ? theme.colors.primary.base
                        : theme.colors.secondary.base
                    }
                  />
                ))}
              </View>
            </View>
          </View>
          <View style={[card, { flex: 1 }]}>
            <Text variant="eyebrow" size={11}>
              Flash
            </Text>
            <Text variant="display" size={36}>
              41 %
            </Text>
            <Text size="xs" bold appearance="secondary">
              +6 pts ce mois
            </Text>
          </View>
        </Animated.View>

        {/* Régularité : heatmap 15 semaines, une colonne par semaine */}
        <Animated.View entering={FadeInDown.delay(220).duration(450)} style={card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="eyebrow" size={11}>
              Régularité · {WEEKS} semaines
            </Text>
            <Text size="xs" bold appearance="secondary">
              {dayTip}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
            {Array.from({ length: WEEKS }, (_, w) => (
              <View key={w} style={{ flex: 1, gap: 4 }}>
                {Array.from({ length: 7 }, (_, d) => {
                  const i = w * 7 + d;
                  return (
                    <Pressable
                      key={d}
                      onPress={() => setSelectedDay(i)}
                      accessibilityLabel={`Semaine ${w + 1}, ${DAYS[d]}`}
                      style={{
                        aspectRatio: 1,
                        borderRadius: 4,
                        backgroundColor: heat[regularity[i]],
                        borderWidth: i === selectedDay ? 2 : 0,
                        borderColor: theme.colors.text,
                      }}
                    />
                  );
                })}
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 4,
            }}
          >
            <Text size="xs" appearance="gray">
              moins
            </Text>
            {heat.map((c) => (
              <View
                key={c}
                style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: c }}
              />
            ))}
            <Text size="xs" appearance="gray">
              plus
            </Text>
          </View>
        </Animated.View>

        {/* Pyramide de niveaux */}
        <Animated.View entering={FadeInDown.delay(280).duration(450)} style={card}>
          <Text variant="eyebrow" size={11}>
            Pyramide de niveaux
          </Text>
          {PYRAMID.map((p, i) => (
            <View key={p.grade} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text bold style={{ width: 30 }}>
                {p.grade}
              </Text>
              <GrowGauge
                ratio={Math.max(0.08, p.count / 360)}
                color={pyramidColor[p.tone]}
                track={theme.colors.surfaceAlt}
                delay={i * 80}
              />
              <Text size="sm" bold appearance="gray" style={{ width: 36, textAlign: 'right' }}>
                {p.count}
              </Text>
            </View>
          ))}
        </Animated.View>

        {/* Salles les plus visitées, repliable */}
        <Animated.View entering={FadeInDown.delay(340).duration(450)} style={card}>
          <Pressable
            onPress={() => setGymsOpen((o) => !o)}
            accessibilityRole="button"
            accessibilityState={{ expanded: gymsOpen }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text variant="eyebrow" size={11} style={{ flex: 1 }}>
              Salles les plus visitées
            </Text>
            <Icon name={gymsOpen ? 'chevron-up' : 'chevron-down'} size="sm" color="gray" />
          </Pressable>
          {gymsOpen &&
            TOP_GYMS.map((g, i) => (
              <Animated.View
                key={g.name}
                entering={FadeIn.delay(i * 60)}
                style={{ gap: 6, marginTop: 4 }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text size="sm" bold>
                    {g.name}
                  </Text>
                  <Text size="sm" bold appearance="gray">
                    {g.visits} visites
                  </Text>
                </View>
                <GrowGauge
                  ratio={g.visits / TOP_GYMS[0].visits}
                  color={i === 0 ? theme.colors.primary.base : theme.colors.secondary.base}
                  track={theme.colors.surfaceAlt}
                  delay={i * 80}
                />
              </Animated.View>
            ))}
        </Animated.View>
      </ScrollView>
    </ScreenLayout>
  );
}
