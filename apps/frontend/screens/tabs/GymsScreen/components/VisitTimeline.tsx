import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Icon, motion, Text } from 'kordo-ui';
import { Gym, VISIT_CALENDAR, VISIT_LOG } from '../../../../fake_data/gyms.fake';

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const DAYS_PER_WEEK = 7;
const CELL_HEIGHT = 46;
const CELL_RADIUS = 6;
const CELL_GAP = 5;

const WEEKS = Array.from({ length: VISIT_CALENDAR.length / DAYS_PER_WEEK }, (_, i) =>
  VISIT_CALENDAR.slice(i * DAYS_PER_WEEK, (i + 1) * DAYS_PER_WEEK),
);

// Dernières salles visitées : un calendrier dont les jours grimpés sont remplis par la photo de la
// salle. Un appui sur l'un d'eux affiche la séance juste en dessous.
export function VisitTimeline({ onPressGym }: { onPressGym: (gym: Gym) => void }) {
  const theme = useTheme();
  const dark = theme.mode === 'dark';
  const [selected, setSelected] = useState(VISIT_LOG[0]);
  const { gym, when, blocs } = selected;

  return (
    <View style={{ paddingHorizontal: 14, gap: theme.spacing.md }}>
      <Text variant="display" size={28}>
        Dernières salles visitées
      </Text>

      <View style={{ gap: CELL_GAP }}>
        <View style={{ flexDirection: 'row', gap: CELL_GAP }}>
          {WEEKDAYS.map((label, i) => (
            <Text
              key={i}
              size={11}
              extraBold
              appearance="gray"
              style={{ flex: 1, textAlign: 'center' }}
            >
              {label}
            </Text>
          ))}
        </View>
        {WEEKS.map((week) => (
          <View key={week[0].day} style={{ flexDirection: 'row', gap: CELL_GAP }}>
            {week.map(({ day, month }) => {
              const visit = VISIT_LOG.find((v) => v.day === day && v.month === month);
              const isSelected = visit === selected;
              return (
                <Pressable
                  key={day}
                  disabled={!visit}
                  onPress={() => visit && setSelected(visit)}
                  accessibilityLabel={visit ? `${day} ${month}, ${visit.gym.name}` : undefined}
                  accessibilityState={{ selected: isSelected, disabled: !visit }}
                  style={{ flex: 1, height: CELL_HEIGHT }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderRadius: CELL_RADIUS,
                      overflow: 'hidden',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: dark ? '#111815' : '#D9F7E9',
                    }}
                  >
                    {visit && (
                      <>
                        <Image
                          source={{ uri: visit.gym.imageUri }}
                          style={{ position: 'absolute', width: '100%', height: '100%' }}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: `rgba(${theme.colors.scrim}, 0.38)`,
                          }}
                        />
                      </>
                    )}
                    <Text
                      size={14}
                      extraBold
                      style={{
                        color: visit ? theme.colors.neutral.white : dark ? '#8E9B95' : '#7F8C86',
                      }}
                    >
                      {day}
                    </Text>
                  </View>
                  {isSelected && (
                    <View
                      pointerEvents="none"
                      style={{
                        position: 'absolute',
                        top: -4,
                        bottom: -4,
                        left: -4,
                        right: -4,
                        borderRadius: CELL_RADIUS + 2,
                        borderWidth: 2,
                        borderColor: theme.colors.primary.base,
                      }}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {/* La séance du jour choisi, en simple ligne pour laisser la vedette au calendrier */}
      <Animated.View
        key={gym.id}
        entering={FadeIn.duration(300)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
          paddingHorizontal: 2,
        }}
      >
        <Image source={{ uri: gym.imageUri }} style={{ width: 52, height: 52, borderRadius: 7 }} />
        <View style={{ flex: 1, gap: 3 }}>
          <Text variant="display" size={21} numberOfLines={1}>
            {gym.name}
          </Text>
          <Text size="xs" appearance="gray" numberOfLines={1}>
            {when} · {blocs} blocs
          </Text>
        </View>
        <Pressable
          onPress={() => onPressGym(gym)}
          accessibilityRole="button"
          accessibilityLabel={`Voir ${gym.name}`}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary.base,
            transform: [{ scale: pressed ? motion.pressScale : 1 }],
          })}
        >
          <Icon name="ArrowRightFilled" size="sm" color="#0B1410" />
        </Pressable>
      </Animated.View>
    </View>
  );
}
