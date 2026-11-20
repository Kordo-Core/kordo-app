import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import {
  BarChart,
  Heatmap,
  Icon,
  LevelPyramid,
  ProgressBar,
  SegmentedControl,
  Text,
} from 'kordo-ui';
import { ScreenHeader } from '../../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { RootStackParamList } from '../../../App';

// Progression (design D) : fusion des écrans de stats des propositions A, B et C.
// Données fictives tant que l'API des statistiques n'existe pas.

type Period = 'week' | 'month' | 'year';
const PERIOD_KEYS: Period[] = ['week', 'month', 'year'];
// Texte posé sur l'orange plein de la carte « Niveau max »
const ON_ORANGE = '#0B1410';

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
  const barIndex = Math.min(selectedBar, data.values.length - 1);

  const pyramidColor = {
    primary: theme.colors.primary.base,
    primaryLight: theme.colors.primary.light,
    green: theme.colors.secondary.base,
  };
  const dayLevel = regularity[selectedDay];
  const dayTip = dayLevel
    ? `${['', '1–6', '7–14', '15+'][dayLevel]} blocs ce ${DAYS[selectedDay % 7]}`
    : `Repos ce ${DAYS[selectedDay % 7]}`;

  // Carte blanche de la maquette : filet de 1 px (ombre intérieure), 16 px de marge, 6 px d'écart
  const card = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    boxShadow: theme.shadows.sm,
    padding: 16,
    gap: 6,
  } as const;

  const selectPeriod = (p: Period) => {
    setPeriod(p);
    setSelectedBar(PERIODS[p].values.length - 2);
  };

  return (
    <ScreenLayout>
      <ScreenHeader gap={12} topGap={12} style={{ paddingHorizontal: 4 }}>
        {/* Maquette : surtitre et titre empilés, trophée à droite aligné sur le titre, puis la période */}
        <View style={{ gap: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ gap: 4 }}>
              <Text variant="eyebrow">Tes stats</Text>
              <Text variant="display" size="lg">
                Progression
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('Trophies')}
              accessibilityLabel="Mes trophées"
              style={{
                width: 44,
                height: 44,
                borderRadius: theme.borderRadius.square,
                backgroundColor: theme.colors.surface,
                boxShadow: theme.shadows.sm,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="TrophyRegular" size="sm" />
            </Pressable>
          </View>
          <SegmentedControl
            segments={PERIOD_KEYS.map((p) => ({ text: PERIODS[p].label }))}
            selectedIndex={PERIOD_KEYS.indexOf(period)}
            onSelect={(i) => selectPeriod(PERIOD_KEYS[i])}
            variant="surface"
            size="md"
            borderRadius="square"
            // Pleine largeur : déborde de la marge de 4 px du titre
            style={{ marginHorizontal: -4 }}
          />
        </View>
      </ScreenHeader>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingBottom: 120,
          gap: 12,
        }}
      >
        {/* Héro : sélecteur de période, total de blocs et histogramme interactif */}
        <Animated.View entering={FadeInDown.duration(450)}>
          <LinearGradient
            colors={theme.colors.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: theme.borderRadius.lg, padding: 20, gap: 10 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* Préfixe en capitales, période telle quelle (« 5 – 11 mai ») */}
              <Text size={11} extraBold style={{ color: theme.colors.soft, letterSpacing: 1.6 }}>
                BLOCS VALIDÉS · {data.range}
              </Text>
              <View
                style={{
                  height: 24,
                  paddingHorizontal: 9,
                  borderRadius: 999,
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                }}
              >
                <Text size="xs" extraBold appearance="white">
                  {data.delta}
                </Text>
              </View>
            </View>

            <Animated.View key={`total-${period}`} entering={FadeIn.duration(300)}>
              <Text variant="display" size={99} appearance="white">
                {total}
              </Text>
            </Animated.View>

            <BarChart
              key={`chart-${period}`}
              data={data.values.map((value, i) => ({ value, label: data.labels[i] }))}
              height={80}
              minBarHeight={6}
              fill
              gap={6}
              barRadius={4}
              tone="light"
              showValue
              showLabels
              highlightIndex={barIndex}
              onSelect={setSelectedBar}
              unit="blocs"
              style={{ height: 120 }}
            />
          </LinearGradient>
        </Animated.View>

        {/* Grille de chiffres clés */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(450)}
          style={{ flexDirection: 'row', gap: 10 }}
        >
          <View
            style={[
              card,
              { flex: 1, gap: 4, boxShadow: 'none', backgroundColor: theme.colors.primary.base },
            ]}
          >
            <Text
              variant="eyebrow"
              size={11}
              style={{ color: ON_ORANGE, opacity: 0.75, letterSpacing: 1.6 }}
            >
              Niveau max
            </Text>
            <Text variant="display" size={57} style={{ color: ON_ORANGE }}>
              7A
            </Text>
            <Text size="xs" bold style={{ color: ON_ORANGE }}>
              depuis mars · Excalibur
            </Text>
          </View>
          <View style={[card, { flex: 1 }]}>
            <Text variant="eyebrow" size={11}>
              Temps en salle
            </Text>
            <Text variant="display" size={47} style={{ textTransform: 'none' }}>
              {data.hours}
            </Text>
            <Text size="xs" appearance="gray">
              {data.sessions} activités
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(160).duration(450)}
          style={{ flexDirection: 'row', gap: 10 }}
        >
          <View style={[card, { flex: 1 }]}>
            <Text variant="eyebrow" size={11}>
              Min / séance
            </Text>
            <View style={{ gap: 6 }}>
              <Text variant="display" size={40}>
                134
              </Text>
              <BarChart
                data={SESSION_MINUTES.map((value) => ({ value }))}
                height={34}
                fill
                barRadius={3}
                gap={4}
                delay={300}
                highlightIndex={SESSION_MINUTES.length - 1}
              />
            </View>
          </View>
          <View style={[card, { flex: 1 }]}>
            <Text variant="eyebrow" size={11}>
              Flash
            </Text>
            <Text variant="display" size={40}>
              41 %
            </Text>
            {/* Part des blocs passés au premier essai */}
            <ProgressBar
              value={0.41}
              color={theme.colors.secondary.base}
              height={8}
              accessibilityLabel="41 % de flash"
            />
            <Text size="xs" appearance="gray">
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
          <Heatmap
            values={regularity}
            selectedIndex={selectedDay}
            onSelect={setSelectedDay}
            cellLabel={(i) => `Semaine ${Math.floor(i / 7) + 1}, ${DAYS[i % 7]}`}
            legend={{ less: 'moins', more: 'plus' }}
            style={{ marginTop: 4 }}
          />
        </Animated.View>

        {/* Pyramide de niveaux */}
        <Animated.View entering={FadeInDown.delay(280).duration(450)} style={card}>
          <Text variant="eyebrow" size={11}>
            Pyramide de niveaux
          </Text>
          <LevelPyramid
            levels={PYRAMID.map((p) => ({
              label: p.grade,
              count: p.count,
              color: pyramidColor[p.tone],
            }))}
          />
        </Animated.View>

        {/* Salles les plus visitées, repliable (maquette : pastille d'icône, titre 15 px, barres) */}
        <Animated.View
          entering={FadeInDown.delay(340).duration(450)}
          style={[card, { padding: 0, gap: 0, overflow: 'hidden' }]}
        >
          <Pressable
            onPress={() => setGymsOpen((o) => !o)}
            accessibilityRole="button"
            accessibilityState={{ expanded: gymsOpen }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 5,
                backgroundColor: theme.colors.soft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="LocationRegular" size="sm" color={theme.colors.softText} />
            </View>
            <Text extraBold style={{ flex: 1 }}>
              Salles les plus visitées
            </Text>
            <Icon name={gymsOpen ? 'chevron-up' : 'chevron-down'} size="sm" color="gray" />
          </Pressable>
          {gymsOpen && (
            <View style={{ paddingHorizontal: 14, paddingBottom: 16, gap: 10 }}>
              {TOP_GYMS.map((g, i) => (
                <Animated.View
                  key={g.name}
                  entering={FadeIn.delay(i * 60)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
                >
                  <Text
                    size="sm"
                    numberOfLines={1}
                    style={{ width: 120, fontFamily: theme.fonts.semiBold }}
                  >
                    {g.name}
                  </Text>
                  <ProgressBar
                    value={g.visits / TOP_GYMS[0].visits}
                    color={theme.colors.secondary.base}
                    height={12}
                    delay={i * 80}
                    duration={600}
                    style={{ flex: 1 }}
                  />
                  <Text size="sm" extraBold style={{ width: 22, textAlign: 'right' }}>
                    {g.visits}
                  </Text>
                </Animated.View>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </ScreenLayout>
  );
}
