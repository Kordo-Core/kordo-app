import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { ProgressBar, SegmentedControl, Text, TrophyBadge } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { TROPHIES, TROPHY_TOTAL, Trophy } from '../../fake_data/trophies.fake';
import { RootStackParamList } from '../../App';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RING = 92;
const RING_STROKE = 9;
const RING_R = (RING - RING_STROKE) / 2;
const RING_LENGTH = 2 * Math.PI * RING_R;

const FILTERS = [{ text: 'Tout' }, { text: 'Obtenus' }, { text: 'En cours' }];

// Ligne d'un trophée : pastille d'icône, nom et statut, description, barre de progression
function TrophyRow({
  trophy,
  index,
  onPress,
}: {
  trophy: Trophy;
  index: number;
  onPress: () => void;
}) {
  const theme = useTheme();
  const done = trophy.progress === 100;
  const locked = trophy.progress === 0;

  return (
    <Animated.View entering={FadeInDown.delay(index * 45).duration(400)}>
      <Pressable
        onPress={onPress}
        disabled={!done}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          padding: 14,
          borderRadius: theme.borderRadius.card,
          backgroundColor: theme.colors.surface,
          boxShadow: theme.shadows.sm,
          opacity: locked ? 0.6 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <TrophyBadge icon={trophy.icon} earned={done} />
        <View style={{ flex: 1, minWidth: 0, gap: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <Text size="md" bold numberOfLines={1} style={{ flexShrink: 1 }}>
              {trophy.name}
            </Text>
            <Text size="xs" extraBold appearance={done ? 'primary' : 'gray'}>
              {done ? 'Obtenu' : locked ? 'Verrouillé' : `${trophy.progress} %`}
            </Text>
          </View>
          <Text size="xs" appearance="gray">
            {trophy.description}
          </Text>
          <ProgressBar
            value={trophy.progress / 100}
            delay={index * 45 + 200}
            color={done ? theme.colors.primary.base : theme.colors.secondary.base}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

// Trophées (design D) : anneau de progression et rang actuel, filtre, liste des trophées.
// Un trophée obtenu ouvre sa page « Badge débloqué ».
export default function TrophiesScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filter, setFilter] = useState(0);

  const earned = TROPHIES.filter((t) => t.progress === 100).length;
  const ratio = earned / TROPHY_TOTAL;
  const visible = TROPHIES.filter((t) =>
    filter === 0 ? true : filter === 1 ? t.progress === 100 : t.progress < 100,
  );

  // L'anneau se remplit à l'ouverture de l'écran
  const ring = useSharedValue(0);
  useEffect(() => {
    ring.value = withDelay(
      150,
      withTiming(ratio, { duration: 1200, easing: Easing.bezier(0.2, 0, 0, 1) }),
    );
  }, [ring, ratio]);
  const ringProps = useAnimatedProps(() => ({
    strokeDashoffset: RING_LENGTH * (1 - ring.value),
  }));

  return (
    <ScreenLayout>
      <ScreenHeader
        gap={12}
        title="Trophées"
        eyebrow={`${earned} / ${TROPHY_TOTAL} obtenus`}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: theme.spacing.md,
          paddingHorizontal: 14,
          paddingBottom: 30,
        }}
      >
        {/* Rang actuel autour de l'anneau des trophées obtenus */}
        <Animated.View
          entering={FadeInDown.delay(50).duration(450)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.lg,
            padding: 18,
            borderRadius: theme.borderRadius.card,
            backgroundColor: theme.colors.surface,
            boxShadow: theme.shadows.sm,
          }}
        >
          <View style={{ width: RING, height: RING }}>
            <Svg width={RING} height={RING} style={{ transform: [{ rotate: '-90deg' }] }}>
              <Circle
                cx={RING / 2}
                cy={RING / 2}
                r={RING_R}
                stroke={theme.colors.surfaceAlt}
                strokeWidth={RING_STROKE}
                fill="none"
              />
              <AnimatedCircle
                cx={RING / 2}
                cy={RING / 2}
                r={RING_R}
                stroke={theme.colors.primary.base}
                strokeWidth={RING_STROKE}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={RING_LENGTH}
                animatedProps={ringProps}
              />
            </Svg>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text variant="display" size={22} style={{ textTransform: 'none' }}>
                {Math.round(ratio * 100)} %
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="eyebrow" size={12}>
              Rang actuel
            </Text>
            <Text variant="display" size={26} style={{ textTransform: 'none' }}>
              Tarzan Climber
            </Text>
            <Text size="sm" appearance="gray" style={{ lineHeight: 18 }}>
              Encore 70 défis pour devenir King Climber.
            </Text>
          </View>
        </Animated.View>

        <SegmentedControl
          segments={FILTERS}
          selectedIndex={filter}
          onSelect={setFilter}
          variant="surface"
          size="md"
          borderRadius="square"
        />

        {visible.map((trophy, i) => (
          <TrophyRow
            key={`${filter}-${trophy.id}`}
            trophy={trophy}
            index={i}
            onPress={() => navigation.navigate('Badge', { trophyId: trophy.id })}
          />
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
