import { useRef, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Tag, Text, useWebDragScroll } from 'kordo-ui';
import { Gym, FAVORITE_GYMS, GYM_LIVE_COUNTS } from '../../../../fake_data/gyms.fake';
import { GymHeart } from './GymHeart';

const CARD_WIDTH = 250;
const CARD_HEIGHT = 300;
const CARD_FRAME = 6;
const GAP = 12;
const SIDE_SCALE = 0.9;
const NAME_SIZE = 92;
const NAME_LINE_RATIO = 0.86;
// Largeur moyenne d'une capitale de la typo des titres, rapportée à sa taille
const NAME_CHAR_RATIO = 0.52;
const NAME_SIDE = 10;
const NAME_TOP = 30;
const CARDS_TOP = 112;
const BAND_ANGLE = '-3deg';
// Dépassement de la bande sur les côtés, pour que sa pente ne découvre jamais les bords
const BAND_OVERFLOW = -40;
const TIMING = { duration: 400, easing: Easing.bezier(0.22, 1, 0.36, 1) };

// Coupe le nom en deux lignes équilibrées et choisit la taille qui les fait tenir sans couper de mot
function fitName(name: string, available: number) {
  const words = name.split(' ');
  const splits = words.map((_, i) =>
    i === 0 ? [name] : [words.slice(0, i).join(' '), words.slice(i).join(' ')],
  );
  const longest = (lines: string[]) => Math.max(...lines.map((line) => line.length));
  const lines = splits.reduce((best, split) => (longest(split) <= longest(best) ? split : best));
  const size = Math.min(NAME_SIZE, Math.floor(available / (longest(lines) * NAME_CHAR_RATIO)));
  return { text: lines.join('\n'), size };
}

function FavoriteCard({
  gym,
  centered,
  liked,
  onToggleLike,
  onPress,
}: {
  gym: Gym;
  centered: boolean;
  liked: boolean;
  onToggleLike: () => void;
  onPress: () => void;
}) {
  const theme = useTheme();
  const white = theme.colors.neutral.white;
  const scale = useDerivedValue(() => withTiming(centered ? 1 : SIDE_SCALE, TIMING));
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={cardStyle}>
      <Pressable
        onPress={onPress}
        accessibilityLabel={gym.name}
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          borderRadius: 12,
          borderWidth: CARD_FRAME,
          borderColor: white,
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: gym.imageUri }}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Le voile reste derrière le texte : le haut de la photo garde ses couleurs */}
        <LinearGradient
          colors={['transparent', `rgba(${theme.colors.scrim}, 0.82)`]}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '42%' }}
        />
        <Tag
          title={gym.shortName}
          appearance="primary"
          style={{ position: 'absolute', left: 10, top: 10 }}
        />
        <GymHeart liked={liked} onToggle={onToggleLike} />
        <View
          pointerEvents="none"
          style={{ position: 'absolute', left: 12, right: 10, bottom: 12, gap: 6 }}
        >
          <Text variant="display" size={34} numberOfLines={2} style={{ color: white }}>
            {gym.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: '#1FD18A' }} />
              <Text size="xs" bold style={{ color: white }}>
                {GYM_LIVE_COUNTS[gym.id]} en séance
              </Text>
            </View>
            <Text size="xs" bold style={{ color: white }}>
              ★ {String(gym.rating).replace('.', ',')}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// Vos salles favorites : une bande verte penchée soulignée d'orange, le nom de la salle du centre
// en très grand derrière des cartes encadrées qui défilent.
export function FavoriteGyms({
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
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  useWebDragScroll(scrollRef as never, (x) => x);
  const name = fitName(FAVORITE_GYMS[index].name, width - NAME_SIDE * 2);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + GAP));
    const bounded = Math.min(Math.max(next, 0), FAVORITE_GYMS.length - 1);
    if (bounded !== index) setIndex(bounded);
  };

  return (
    <View>
      <Text variant="display" size={28} style={{ marginHorizontal: 14 }}>
        Vos favorites
      </Text>
      <View
        onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
        style={{ overflow: 'hidden', paddingTop: 22, paddingBottom: 50 }}
      >
        {/* Le liseré orange dépasse sous la bande ; les deux gardent la même pente */}
        <View
          style={{
            position: 'absolute',
            top: 44,
            bottom: 18,
            left: BAND_OVERFLOW,
            right: BAND_OVERFLOW,
            backgroundColor: theme.colors.primary.base,
            transform: [{ rotate: BAND_ANGLE }],
          }}
        />
        <LinearGradient
          colors={theme.mode === 'dark' ? ['#00A36F', '#06261B'] : ['#00845A', '#06261B']}
          locations={[0.36, 1]}
          style={{
            position: 'absolute',
            top: 16,
            bottom: 32,
            left: BAND_OVERFLOW,
            right: BAND_OVERFLOW,
            transform: [{ rotate: BAND_ANGLE }],
          }}
        />
        {/* Tant que la largeur n'est pas mesurée, fitName renverrait une taille négative
            (crash Android : « FontSize should be a positive value ») */}
        {name.size > 0 && (
          <Animated.View
            key={FAVORITE_GYMS[index].id}
            entering={FadeIn.duration(350)}
            pointerEvents="none"
            style={{ position: 'absolute', top: NAME_TOP, left: NAME_SIDE, right: NAME_SIDE }}
          >
            <Text
              variant="display"
              size={name.size}
              style={{
                lineHeight: Math.round(name.size * NAME_LINE_RATIO),
                textAlign: 'center',
                color: white,
              }}
            >
              {name.text}
            </Text>
          </Animated.View>
        )}
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + GAP}
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={32}
          contentContainerStyle={{
            paddingHorizontal: Math.max(0, (width - CARD_WIDTH) / 2),
            paddingTop: CARDS_TOP,
            paddingBottom: 18,
            gap: GAP,
          }}
        >
          {FAVORITE_GYMS.map((gym, i) => (
            <FavoriteCard
              key={gym.id}
              gym={gym}
              centered={i === index}
              liked={isLiked(gym.id)}
              onToggleLike={() => onToggleLike(gym.id)}
              onPress={() => onPressGym(gym)}
            />
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
          {FAVORITE_GYMS.map((gym, i) => (
            <View
              key={gym.id}
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === index ? white : 'rgba(255, 255, 255, 0.4)',
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
