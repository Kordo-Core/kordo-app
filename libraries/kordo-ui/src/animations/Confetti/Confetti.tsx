import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ConfettiProps } from './Confetti.types';

// Couleur et direction de chaque morceau ; les distances sont ramenées à `radius`
const PIECES: { color: string; x: number; y: number }[] = [
  { color: '#FF7A1A', x: -0.58, y: -0.77 },
  { color: '#2F80ED', x: 0.54, y: -0.85 },
  { color: '#EB4D5F', x: -0.38, y: 0.92 },
  { color: '#27AE60', x: 0.46, y: 0.77 },
  { color: '#9B51E0', x: 0.65, y: 0.08 },
  { color: '#F2C94C', x: -0.65, y: 0.15 },
  { color: '#3DFFA8', x: 0.12, y: -1 },
  { color: '#FFFFFF', x: -0.15, y: 1 },
  { color: '#FF7A1A', x: 0.31, y: -0.62 },
  { color: '#EB4D5F', x: -0.5, y: -0.23 },
];

const SIZES = { sm: { width: 8, height: 12 }, md: { width: 9, height: 14 } };

function Piece({
  color,
  x,
  y,
  trigger,
  playOnMount,
  duration,
  delay,
  size,
}: {
  color: string;
  x: number;
  y: number;
  trigger: number;
  playOnMount: boolean;
  duration: number;
  delay: number;
  size: { width: number; height: number };
}) {
  // 1 = morceau au repos, invisible ; il repart de 0 à chaque éclat
  const t = useSharedValue(1);
  useEffect(() => {
    if (!trigger && !playOnMount) return;
    t.value = 0;
    t.value = withDelay(
      trigger ? 0 : delay,
      withTiming(1, { duration, easing: Easing.bezier(0.2, 0.6, 0.4, 1) }),
    );
  }, [t, trigger, playOnMount, duration, delay]);
  const style = useAnimatedStyle(() => ({
    opacity: t.value < 1 ? 1 - t.value : 0,
    transform: [
      { translateX: x * t.value },
      { translateY: y * t.value },
      { rotate: `${400 * t.value}deg` },
    ],
  }));
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: -size.width / 2,
          top: -size.height / 2,
          width: size.width,
          height: size.height,
          borderRadius: 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

// Éclat de confettis depuis le centre du conteneur (validation d'un bloc, trophée débloqué).
// À poser dans un parent positionné ; il ne capte aucune touche et ne déforme pas la mise en page.
export const Confetti: React.FC<ConfettiProps> = ({
  trigger,
  playOnMount = false,
  radius = 120,
  duration = 900,
  delay = 0,
  size = 'sm',
}) => (
  <View
    pointerEvents="none"
    style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 }}
  >
    {PIECES.map((p, i) => (
      <Piece
        key={i}
        color={p.color}
        x={p.x * radius}
        y={p.y * radius}
        trigger={trigger}
        playOnMount={playOnMount}
        duration={duration}
        delay={delay}
        size={SIZES[size]}
      />
    ))}
  </View>
);
