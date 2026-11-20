import { useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { DateSeal, PostageStamp, Text } from 'kordo-ui';
import { Gym, GYMS, PASSPORT_TOTAL, VISIT_LOG } from '../../../../fake_data/gyms.fake';
import { franchiseInk } from './franchiseInk';

const GRID_GAP = 12;
const COLUMNS = 3;
const ROTATIONS = ['-2.5deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg'];
const RING = 72;
const RING_STROKE = 8;
// Le prochain palier du passeport
const NEXT_TROPHY = 10;

// Anneau de progression du passeport, avec le compte au centre
function PassportRing({ count }: { count: number }) {
  const theme = useTheme();
  const radius = (RING - RING_STROKE) / 2;
  const length = 2 * Math.PI * radius;
  return (
    <View style={{ width: RING, height: RING, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={RING} height={RING} style={{ position: 'absolute' }}>
        <Circle
          cx={RING / 2}
          cy={RING / 2}
          r={radius}
          stroke={theme.colors.border}
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <Circle
          cx={RING / 2}
          cy={RING / 2}
          r={radius}
          stroke={theme.colors.secondary.base}
          strokeWidth={RING_STROKE}
          fill="none"
          strokeDasharray={`${length * (count / PASSPORT_TOTAL)} ${length}`}
          transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
        />
      </Svg>
      <Text variant="display" size={24} style={{ lineHeight: 21 }}>
        {count}
      </Text>
      <Text
        variant="display"
        size={11}
        appearance="gray"
        style={{ lineHeight: 11, letterSpacing: 0 }}
      >
        / {PASSPORT_TOTAL}
      </Text>
    </View>
  );
}

// Le passeport des salles : la progression, le filtre par franchise et un timbre par salle,
// tamponné de la date de la dernière visite.
export function PassportCard({ onPressGym }: { onPressGym: (gym: Gym) => void }) {
  const theme = useTheme();
  const [franchise, setFranchise] = useState<string | null>(null);
  const [gridWidth, setGridWidth] = useState(0);

  const visits = useMemo(() => new Map(VISIT_LOG.map((v) => [v.gym.id, v])), []);
  const franchises = useMemo(() => [...new Set(GYMS.map((g) => g.shortName))], []);
  const visible = franchise ? GYMS.filter((g) => g.shortName === franchise) : GYMS;
  const stampWidth = (gridWidth - GRID_GAP * (COLUMNS - 1)) / COLUMNS;

  const chips = [null, ...franchises].map((name) => {
    const gyms = name ? GYMS.filter((g) => g.shortName === name) : GYMS;
    return {
      name,
      label: name ?? 'Toutes',
      count: `${gyms.filter((g) => visits.has(g.id)).length}/${gyms.length}`,
    };
  });

  return (
    <View
      style={{
        marginHorizontal: theme.spacing.lg,
        padding: theme.spacing.lg,
        gap: 14,
        borderRadius: 12,
        backgroundColor: theme.colors.soft,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <PassportRing count={VISIT_LOG.length} />
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <Text variant="display" size={28}>
            Ton passeport
          </Text>
          <Text size={13} bold appearance="gray">
            Encore {NEXT_TROPHY - VISIT_LOG.length} salles pour décrocher le trophée Globe-grimpeur.
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -theme.spacing.lg }}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.lg, gap: 6 }}
      >
        {chips.map(({ name, label, count }) => {
          const on = franchise === name;
          return (
            <Pressable
              key={label}
              onPress={() => setFranchise(name)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              style={{
                height: 38,
                paddingHorizontal: 12,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: on ? theme.colors.secondary.base : theme.colors.surface,
              }}
            >
              <Text
                size={13}
                extraBold
                style={on ? { color: theme.colors.neutral.white } : undefined}
              >
                {label}
              </Text>
              <Text
                size="xs"
                bold
                style={{ color: on ? theme.colors.neutral.white : theme.colors.textMuted }}
              >
                {count}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View
        onLayout={(e: LayoutChangeEvent) => setGridWidth(e.nativeEvent.layout.width)}
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: GRID_GAP,
          rowGap: theme.spacing.lg,
          paddingVertical: theme.spacing.xs,
        }}
      >
        {gridWidth > 0 &&
          visible.map((gym, i) => {
            const visit = visits.get(gym.id);
            return (
              <PostageStamp
                key={gym.id}
                image={gym.imageUri}
                title={gym.name}
                caption={visit ? 'Tamponnée' : 'À découvrir'}
                muted={!visit}
                rotate={ROTATIONS[i % ROTATIONS.length]}
                style={{ width: stampWidth }}
                onPress={() => onPressGym(gym)}
                mark={
                  visit && (
                    <DateSeal
                      day={visit.day}
                      month={visit.month}
                      color={franchiseInk(gym.shortName, theme.mode)}
                      style={{ position: 'absolute', right: -7, top: 34 }}
                    />
                  )
                }
              />
            );
          })}
      </View>
    </View>
  );
}
