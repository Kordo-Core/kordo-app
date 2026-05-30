import { useRef, useState, ReactNode } from 'react';
import { View, ImageBackground } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  makeMutable,
  SharedValue,
} from 'react-native-reanimated';
import { Card, theme } from 'kordo-ui';

const AnimatedCard = Animated.createAnimatedComponent(Card);

const GYM_IMG = {
  uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg',
};

const PEEK = 44;
const SPRING = { damping: 50, stiffness: 500 };
const SWIPE_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 600;

function buildRanks(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    tx: i === 0 ? PEEK : i % 2 === 1 ? 0 : PEEK * 2,
    scale: i === 0 ? 1 : Math.max(0.7, 0.91 - (i - 1) * 0.03),
    z: count - i,
  }));
}

function buildColors(count: number): string[] {
  const start = 0x88;
  const end = 0xeb;
  return Array.from({ length: count }, (_, i) => {
    const v = Math.round(start + (end - start) * (i / Math.max(1, count - 1)));
    return `rgb(${v}, ${v}, ${v})`;
  });
}

interface CardProps {
  txSv: SharedValue<number>;
  scSv: SharedValue<number>;
  zSv: SharedValue<number>;
  frontShared: SharedValue<number>;
  dragX: SharedValue<number>;
  dragY: SharedValue<number>;
  index: number;
  innerWidth: number;
  cardHeight: number;
  color: string;
  isFront: boolean;
  gesture: ReturnType<typeof Gesture.Pan>;
  children?: ReactNode;
}

function GymCard({
  txSv,
  scSv,
  zSv,
  frontShared,
  dragX,
  dragY,
  index,
  innerWidth,
  cardHeight,
  color,
  isFront,
  gesture,
  children,
}: CardProps) {
  const animStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: innerWidth,
    height: cardHeight,
    borderRadius: theme.borderRadius.square,
    zIndex: zSv.value,
    transform: [
      { translateX: txSv.value + (frontShared.value === index ? dragX.value : 0) },
      { translateY: frontShared.value === index ? dragY.value : 0 },
      { scale: scSv.value },
    ],
  }));

  const content = (
    <AnimatedCard style={[animStyle, { backgroundColor: color }]}>
      <ImageBackground
        source={GYM_IMG}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        imageStyle={{ borderRadius: theme.borderRadius.square }}
      />
      {children}
    </AnimatedCard>
  );

  if (isFront) {
    return <GestureDetector gesture={gesture}>{content}</GestureDetector>;
  }
  return content;
}

interface Props {
  cardWidth: number;
  cardHeight?: number;
  count?: number;
}

export function GymCardStack({ cardWidth, cardHeight = 300, count = 3 }: Props) {
  const innerWidth = cardWidth - PEEK * 2;
  const ranks = useRef(buildRanks(count)).current;
  const colors = useRef(buildColors(count)).current;

  const [frontIndex, setFrontIndex] = useState(0);
  const orderRef = useRef(Array.from({ length: count }, (_, i) => i));

  const frontShared = useSharedValue(0);
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);

  const txArr = useRef(ranks.map((r) => makeMutable(r.tx))).current;
  const scArr = useRef(ranks.map((r) => makeMutable(r.scale))).current;
  const zArr = useRef(ranks.map((r) => makeMutable(r.z))).current;

  function cycleFront() {
    const order = orderRef.current;
    const front = order[0];
    const newOrder = [...order.slice(1), front];
    orderRef.current = newOrder;

    // z-index mis à jour immédiatement
    newOrder.forEach((cardIndex, rank) => {
      zArr[cardIndex].value = ranks[rank].z;
    });

    // Spring pour toutes les cartes sauf l'ancienne carte front
    for (let rank = 0; rank < count - 1; rank++) {
      const cardIndex = newOrder[rank];
      txArr[cardIndex].value = withSpring(ranks[rank].tx, SPRING);
      scArr[cardIndex].value = withSpring(ranks[rank].scale, SPRING);
    }

    // Reset instantané de l'ancienne carte front (elle était hors écran)
    txArr[front].value = ranks[count - 1].tx;
    scArr[front].value = ranks[count - 1].scale;

    dragX.value = 0;
    dragY.value = 0;
    frontShared.value = newOrder[0];
    setFrontIndex(newOrder[0]);
  }

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      dragX.value = e.translationX;
      dragY.value = e.translationY * 0.2;
    })
    .onEnd((e) => {
      const shouldSwipe =
        Math.abs(e.translationX) > SWIPE_THRESHOLD || Math.abs(e.velocityX) > VELOCITY_THRESHOLD;

      if (shouldSwipe) {
        const dir = e.translationX > 0 ? 1 : -1;
        dragX.value = withTiming(dir * (innerWidth + 150), { duration: 240 }, () => {
          runOnJS(cycleFront)();
        });
        dragY.value = withTiming(dragY.value * 2, { duration: 240 });
      } else {
        dragX.value = withSpring(0, SPRING);
        dragY.value = withSpring(0, SPRING);
      }
    });

  return (
    <View style={{ height: cardHeight, overflow: 'visible' }}>
      {Array.from({ length: count }, (_, i) => (
        <GymCard
          key={i}
          index={i}
          txSv={txArr[i]}
          scSv={scArr[i]}
          zSv={zArr[i]}
          frontShared={frontShared}
          dragX={dragX}
          dragY={dragY}
          innerWidth={innerWidth}
          cardHeight={cardHeight}
          color={colors[i]}
          isFront={i === frontIndex}
          gesture={pan}
        />
      ))}
    </View>
  );
}
