import { Image, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AvatarStack, Button, motion, Text } from 'kordo-ui';
import {
  Gym,
  CROWD_BY_HOUR,
  CROWD_NOW_INDEX,
  FRIENDS_ON_SITE,
} from '../../../../fake_data/gyms.fake';

// Barres d'affluence : les heures passées sont plus marquées, l'heure en cours ressort en orange
function CrowdBars() {
  const theme = useTheme();
  return (
    <View
      accessible
      accessibilityLabel="Affluence par heure, il y a du monde et le pic est vers 21 h"
      style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 60 }}
    >
      {CROWD_BY_HOUR.map((value, i) => (
        <Animated.View
          key={i}
          entering={FadeInDown.delay(i * 30).duration(300)}
          style={{
            flex: 1,
            height: `${value}%`,
            borderRadius: 3,
            backgroundColor:
              i === CROWD_NOW_INDEX
                ? theme.colors.primary.base
                : i < CROWD_NOW_INDEX
                  ? 'rgba(255, 255, 255, 0.45)'
                  : 'rgba(255, 255, 255, 0.2)',
          }}
        />
      ))}
    </View>
  );
}

// Bandeau de la dernière salle visitée, sur sa photo : rang, affluence, amis présents, accès directs.
export function GymCoverCard({
  gym,
  lastVisit,
  rank,
  blocCount,
  liveCount,
  onPressRanking,
  onPressBlocs,
}: {
  gym: Gym;
  lastVisit: string;
  rank?: number;
  blocCount: number;
  liveCount: number;
  onPressRanking: () => void;
  onPressBlocs: () => void;
}) {
  const theme = useTheme();
  const white = theme.colors.neutral.white;
  return (
    <View
      style={{
        marginHorizontal: 14,
        padding: theme.spacing.lg,
        gap: 14,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: `0px 16px 32px rgba(${theme.colors.scrim}, 0.24)`,
      }}
    >
      <Image
        source={{ uri: gym.imageUri }}
        resizeMode="cover"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <LinearGradient
        colors={[
          `rgba(${theme.colors.scrim}, 0.68)`,
          `rgba(${theme.colors.scrim}, 0.3)`,
          `rgba(${theme.colors.scrim}, 0.72)`,
          `rgba(${theme.colors.scrim}, 0.94)`,
        ]}
        locations={[0, 0.3, 0.5, 0.82]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flex: 1, gap: 6 }}>
          <Text variant="eyebrow" size={12} style={{ color: theme.colors.soft }}>
            Ta salle · {lastVisit}
          </Text>
          <Text variant="display" size={35} numberOfLines={2} style={{ color: white }}>
            {gym.name}
          </Text>
        </View>
        {rank !== undefined && (
          <View style={{ alignItems: 'flex-end' }}>
            <Text variant="display" size={35} style={{ color: white, textTransform: 'none' }}>
              {rank}e
            </Text>
            <Text size={11} bold style={{ color: theme.colors.soft }}>
              au classement
            </Text>
          </View>
        )}
      </View>

      <View style={{ height: 44 }} />

      <View style={{ gap: 6 }}>
        <CrowdBars />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text size={11} bold style={{ color: theme.colors.soft }}>
            10 h
          </Text>
          <Text size={11} bold style={{ color: white }}>
            {liveCount} en séance, ça se remplit
          </Text>
          <Text size={11} bold style={{ color: theme.colors.soft }}>
            23 h
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <AvatarStack
          uris={FRIENDS_ON_SITE.map((u) => u.avatarUrl)}
          borderColor={`rgba(${theme.colors.scrim}, 0.8)`}
        />
        <Text size="sm" bold numberOfLines={1} style={{ flex: 1, color: white }}>
          {FRIENDS_ON_SITE[0].firstName}, {FRIENDS_ON_SITE[1].firstName} et 3 amis sur place
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        {/* Bouton carte : blanc en clair, sombre cerné d'un filet en sombre (maquettes) */}
        <Pressable
          onPress={onPressRanking}
          accessibilityRole="button"
          style={({ pressed }) => ({
            flex: 1,
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.surface,
            boxShadow: theme.shadows.sm,
            transform: [{ scale: pressed ? motion.pressScale : 1 }],
          })}
        >
          <Text extraBold style={{ color: theme.colors.text }}>
            Classement
          </Text>
        </Pressable>
        <Button
          title={`${blocCount} blocs`}
          appearance="primary"
          borderRadius="square"
          style={{ flex: 1 }}
          containerStyle={{ height: 44 }}
          onPress={onPressBlocs}
        />
      </View>
    </View>
  );
}
