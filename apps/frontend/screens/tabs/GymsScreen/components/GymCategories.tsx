import { useMemo, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Slider, Text } from 'kordo-ui';
import { Gym, GYM_CATEGORIES, getGymsByCategory, GYMS } from '../../../../fake_data/gyms.fake';
import { GymHeart } from './GymHeart';

const ROW_HEIGHT = 104;
const CARD_WIDTH = 158;
const CARD_HEIGHT = 194;
// Largeurs des tuiles sur chaque ligne : grande puis petite, puis l'inverse
const FLEX = [3, 2, 2, 3];

// Catégories : quatre blocs de couleur de tailles différentes, puis les salles correspondantes.
export function GymCategories({
  isLiked,
  onToggleLike,
  onPressGym,
}: {
  isLiked: (gymId: string) => boolean;
  onToggleLike: (gymId: string) => void;
  onPressGym: (gym: Gym) => void;
}) {
  const theme = useTheme();
  const white = theme.colors.neutral.white;
  const [selected, setSelected] = useState<string | null>(null);
  const gyms = useMemo(() => (selected ? getGymsByCategory(selected) : GYMS), [selected]);

  const tones = [
    { bg: theme.colors.primary.base, fg: '#0B1410' },
    { bg: theme.colors.soft, fg: theme.colors.softText },
    { bg: theme.colors.navBar, fg: white },
    { bg: theme.colors.secondary.base, fg: white },
  ];

  const tile = (i: number) => {
    const { label, icon } = GYM_CATEGORIES[i];
    const on = selected === label;
    const { bg, fg } = tones[i];
    return (
      <Pressable
        key={label}
        onPress={() => setSelected(on ? null : label)}
        accessibilityRole="button"
        accessibilityState={{ selected: on }}
        style={({ pressed }) => ({
          flex: FLEX[i],
          height: ROW_HEIGHT,
          padding: theme.spacing.md,
          borderRadius: 9,
          justifyContent: 'space-between',
          backgroundColor: bg,
          borderWidth: 2,
          borderColor: on ? theme.colors.text : 'transparent',
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <Icon name={icon} size={24} color={fg} />
        <View>
          <Text variant="display" size={26} style={{ color: fg }}>
            {label}
          </Text>
          <Text size="xs" bold style={{ color: fg, opacity: 0.8 }}>
            {getGymsByCategory(label).length} salles
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ gap: theme.spacing.md }}>
      <Text variant="display" size={28} style={{ marginHorizontal: 14 }}>
        Catégories
      </Text>
      <View style={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.sm }}>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>{[0, 1].map(tile)}</View>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>{[2, 3].map(tile)}</View>
      </View>
      <Slider key={selected ?? 'all'} height={CARD_HEIGHT} gap={10}>
        {gyms.map((gym) => (
          <Pressable
            key={gym.id}
            onPress={() => onPressGym(gym)}
            accessibilityLabel={gym.name}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 9, overflow: 'hidden' }}
          >
            <Image
              source={{ uri: gym.imageUri }}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
            <LinearGradient
              colors={['transparent', `rgba(${theme.colors.scrim}, 0.88)`]}
              locations={[0.35, 1]}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <GymHeart liked={isLiked(gym.id)} onToggle={() => onToggleLike(gym.id)} />
            <View
              pointerEvents="none"
              style={{ position: 'absolute', left: 10, right: 10, bottom: 10, gap: 4 }}
            >
              <Text variant="display" size={20} numberOfLines={2} style={{ color: white }}>
                {gym.name}
              </Text>
              <Text size="xs" bold style={{ color: white }}>
                ★ {String(gym.rating).replace('.', ',')}
              </Text>
            </View>
          </Pressable>
        ))}
      </Slider>
    </View>
  );
}
