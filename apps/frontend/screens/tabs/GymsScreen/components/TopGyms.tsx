import { useState } from 'react';
import { Image, LayoutChangeEvent, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon, motion, Text } from 'kordo-ui';
import { Gym, POPULAR_GYMS } from '../../../../fake_data/gyms.fake';

const TOP_COUNT = 5;
const CLOSED_HEIGHT = 84;
const OPEN_HEIGHT = 240;
const THUMB = 60;
const DURATION = 520;
const EASING = Easing.bezier(0.22, 1, 0.36, 1);

// Le chiffre est dessiné à sa grande taille puis réduit quand la ligne est fermée
const NUMERAL_SIZE = 153;
const NUMERAL_BOX = { width: 90, height: 118 };
const NUMERAL_CLOSED_SCALE = 0.708;
const NUMERAL_CLOSED_X = -(NUMERAL_BOX.width * (1 - NUMERAL_CLOSED_SCALE)) / 2;
const NUMERAL_CLOSED_Y = (CLOSED_HEIGHT - NUMERAL_BOX.height) / 2;
const NUMERAL_OPEN_X = 14;
const NUMERAL_OPEN_Y = OPEN_HEIGHT - NUMERAL_BOX.height - 2;

const ARROW = 44;
const ARROW_INSET = 14;
// Espace garanti entre le nom de la salle et le bouton
const NAME_ARROW_GAP = 20;

function TopGymRow({
  gym,
  rank,
  open,
  width,
  onSelect,
  onOpenGym,
}: {
  gym: Gym;
  rank: number;
  open: boolean;
  width: number;
  onSelect: () => void;
  onOpenGym: () => void;
}) {
  const theme = useTheme();
  const white = theme.colors.neutral.white;
  const paleNumeral = theme.mode === 'dark' ? '#2A3530' : '#D9F7E9';
  const progress = useDerivedValue(() =>
    withTiming(open ? 1 : 0, { duration: DURATION, easing: EASING }),
  );

  // La ligne grandit et sa vignette devient la grande photo
  const rowStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [CLOSED_HEIGHT, OPEN_HEIGHT]),
    borderRadius: interpolate(progress.value, [0, 1], [0, 28]),
  }));
  const photoStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [THUMB, width]),
    height: interpolate(progress.value, [0, 1], [THUMB, OPEN_HEIGHT]),
    top: interpolate(progress.value, [0, 1], [(CLOSED_HEIGHT - THUMB) / 2, 0]),
    borderRadius: interpolate(progress.value, [0, 1], [18, 28]),
  }));
  const shadeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.2, 1], [0, 1], Extrapolation.CLAMP),
  }));

  // Le chiffre glisse, grandit et passe du pâle à l'orange
  const numeralStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [NUMERAL_CLOSED_X, NUMERAL_OPEN_X]) },
      { translateY: interpolate(progress.value, [0, 1], [NUMERAL_CLOSED_Y, NUMERAL_OPEN_Y]) },
      { scale: interpolate(progress.value, [0, 1], [NUMERAL_CLOSED_SCALE, 1]) },
    ],
  }));
  const numeralOpenStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  // Le chiffre pâle s'efface pendant que l'orange apparaît : aucun bout pâle ne dépasse de l'orange
  const numeralClosedStyle = useAnimatedStyle(() => ({ opacity: 1 - progress.value }));

  // Les textes de la ligne fermée partent vite, ceux de la ligne ouverte arrivent ensuite
  const closedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.3], [1, 0], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(progress.value, [0, 0.3], [0, -6], Extrapolation.CLAMP) },
    ],
  }));
  const openTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.45, 0.85], [0, 1], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(progress.value, [0.45, 1], [14, 0], Extrapolation.CLAMP) },
    ],
  }));
  const arrowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.6, 1], [0, 1], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(progress.value, [0.6, 1], [0.6, 1], Extrapolation.CLAMP) }],
  }));

  return (
    <Pressable
      onPress={open ? undefined : onSelect}
      accessibilityLabel={`Numéro ${rank}, ${gym.name}`}
      accessibilityState={{ expanded: open }}
    >
      <Animated.View style={[{ overflow: 'hidden' }, rowStyle]}>
        {/* Le voile vit dans la photo : il grandit avec elle et ne déborde jamais */}
        <Animated.View style={[{ position: 'absolute', right: 0, overflow: 'hidden' }, photoStyle]}>
          <Image
            source={{ uri: gym.imageUri }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
          <Animated.View
            pointerEvents="none"
            style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, shadeStyle]}
          >
            <LinearGradient
              colors={['transparent', `rgba(${theme.colors.scrim}, 0.9)`]}
              locations={[0.3, 1]}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </Animated.View>

        {/* Un seul chiffre pour les deux états : le pâle et l'orange se superposent */}
        <Animated.View
          pointerEvents="none"
          style={[{ position: 'absolute', left: 0, top: 0, ...NUMERAL_BOX }, numeralStyle]}
        >
          <Animated.View
            style={[
              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
              numeralClosedStyle,
            ]}
          >
            <Text
              variant="display"
              size={NUMERAL_SIZE}
              style={{ lineHeight: NUMERAL_BOX.height, color: paleNumeral }}
            >
              {rank}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
              numeralOpenStyle,
            ]}
          >
            <Text
              variant="display"
              size={NUMERAL_SIZE}
              style={{ lineHeight: NUMERAL_BOX.height, color: theme.colors.primary.base }}
            >
              {rank}
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Ligne fermée : nom et adresse */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              left: 66,
              right: THUMB + 12,
              height: CLOSED_HEIGHT,
              justifyContent: 'center',
              gap: 3,
            },
            closedTextStyle,
          ]}
        >
          <Text variant="display" size={22} numberOfLines={1}>
            {gym.name}
          </Text>
          <Text size="xs" appearance="gray" numberOfLines={1}>
            {gym.address}
          </Text>
        </Animated.View>

        {/* Ligne ouverte : nom et adresse sur la photo */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              left: 92,
              right: ARROW_INSET + ARROW + NAME_ARROW_GAP,
              bottom: 16,
              gap: 3,
            },
            openTextStyle,
          ]}
        >
          <Text variant="display" size={33} numberOfLines={2} style={{ color: white }}>
            {gym.name}
          </Text>
          <Text size="xs" numberOfLines={1} style={{ color: white, opacity: 0.92 }}>
            {gym.address}
          </Text>
        </Animated.View>

        {/* Le seul accès à la page de la salle */}
        <Animated.View
          pointerEvents={open ? 'auto' : 'none'}
          style={[{ position: 'absolute', right: ARROW_INSET, bottom: ARROW_INSET }, arrowStyle]}
        >
          <Pressable
            onPress={onOpenGym}
            accessibilityRole="button"
            accessibilityLabel={`Voir ${gym.name}`}
            style={({ pressed }) => ({
              width: ARROW,
              height: ARROW,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: white,
              transform: [{ scale: pressed ? motion.pressScale : 1 }],
            })}
          >
            <Icon name="ArrowRightFilled" size="sm" color="#0B1410" />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

// Le top 5 : la salle choisie se déplie en grande photo, celle qui l'était se replie en ligne.
// La flèche de la grande photo ouvre la page de la salle.
export function TopGyms({ onPressGym }: { onPressGym: (gym: Gym) => void }) {
  const theme = useTheme();
  const gyms = POPULAR_GYMS.slice(0, TOP_COUNT);
  const [openId, setOpenId] = useState(gyms[0].id);
  const [width, setWidth] = useState(0);

  return (
    <View style={{ paddingHorizontal: theme.spacing.lg, gap: 10 }}>
      <Text variant="display" size={28} style={{ marginHorizontal: 2 }}>
        Le top 5
      </Text>
      <View onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}>
        {width > 0 &&
          gyms.map((gym, i) => (
            <View
              key={gym.id}
              style={{
                borderBottomWidth: gym.id === openId || i === gyms.length - 1 ? 0 : 1,
                borderBottomColor: theme.colors.border,
              }}
            >
              <TopGymRow
                gym={gym}
                rank={i + 1}
                open={gym.id === openId}
                width={width}
                onSelect={() => setOpenId(gym.id)}
                onOpenGym={() => onPressGym(gym)}
              />
            </View>
          ))}
      </View>
    </View>
  );
}
