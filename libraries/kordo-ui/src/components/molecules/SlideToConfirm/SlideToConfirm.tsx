import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useTheme } from '@emotion/react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { SlideToConfirmProps } from './SlideToConfirm.types';
import { Text } from '../../atoms/Text/Text';

const HEIGHT = 68;
const PAD = 6;
const KNOB = HEIGHT - PAD * 2;
// Part de la course à atteindre pour valider
const THRESHOLD = 0.82;
// Retour et arrivée du curseur : courbe du design D, avec un léger dépassement
const GLIDE = { duration: 600, easing: Easing.bezier(0.34, 1.3, 0.64, 1) };
const SHIMMER_WIDTH = 200;

const ARROW = 'M5 12h14M13 6l6 6-6 6';
const CHECK = 'M20 6L9 17l-5-5';

// « Glisser pour publier » (design D) : l'action finale se confirme d'un geste, ce qui évite
// les publications accidentelles. Un simple appui sur le curseur fonctionne aussi.
export const SlideToConfirm: React.FC<SlideToConfirmProps> = ({
  label,
  doneLabel = 'C’est fait !',
  onConfirm,
  resetAfter = 1800,
  disabled,
  style,
}) => {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const [done, setDone] = useState(false);
  const x = useSharedValue(0);
  // 0 = à valider, 1 = validé : pilote le fond, le libellé et l'icône en fondu
  const doneProgress = useSharedValue(0);
  const max = Math.max(0, width - KNOB - PAD * 2);

  // Reflet qui balaie la piste tant que rien n'est validé
  const shimmer = useSharedValue(0);
  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 2200, easing: Easing.linear }), -1);
  }, [shimmer]);

  const confirm = () => {
    setDone(true);
    onConfirm();
    if (resetAfter > 0) {
      setTimeout(() => {
        // Le fond et l'icône repassent en fondu pendant que le curseur revient
        doneProgress.value = withTiming(0, { duration: 400 });
        x.value = withTiming(0, GLIDE, (finished) => {
          if (finished) runOnJS(setDone)(false);
        });
      }, resetAfter);
    }
  };

  const settleDone = () => {
    'worklet';
    x.value = withTiming(max, GLIDE);
    doneProgress.value = withTiming(1, { duration: 400 });
    runOnJS(confirm)();
  };

  const pan = Gesture.Pan()
    .enabled(!disabled && !done && max > 0)
    .onChange((e) => {
      x.value = Math.min(max, Math.max(0, x.value + e.changeX));
    })
    .onEnd(() => {
      if (x.value >= max * THRESHOLD) settleDone();
      else x.value = withTiming(0, GLIDE);
    });

  const tap = Gesture.Tap()
    .enabled(!disabled && !done && max > 0)
    .onEnd(() => {
      // Appui simple : petit élan puis validation
      x.value = withSequence(withTiming(max * 0.15, { duration: 120 }), withTiming(max, GLIDE));
      doneProgress.value = withTiming(1, { duration: 400 });
      runOnJS(confirm)();
    });

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      doneProgress.value,
      [0, 1],
      [theme.colors.text, theme.colors.secondary.base],
    ),
  }));
  // Le léger dépassement du retour ne fait pas sortir le curseur de la piste
  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.max(-3, x.value) }],
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: max > 0 ? interpolate(x.value, [0, max * 0.55], [1, 0], 'clamp') : 1,
  }));
  const doneLabelStyle = useAnimatedStyle(() => ({ opacity: doneProgress.value }));
  const arrowStyle = useAnimatedStyle(() => ({
    opacity: 1 - doneProgress.value,
    transform: [{ scale: 1 - doneProgress.value * 0.4 }],
  }));
  const checkStyle = useAnimatedStyle(() => ({
    opacity: doneProgress.value,
    transform: [{ scale: 0.6 + doneProgress.value * 0.4 }],
  }));
  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: 1 - doneProgress.value,
    transform: [{ translateX: -SHIMMER_WIDTH + shimmer.value * (width + SHIMMER_WIDTH) }],
  }));

  const icon = (d: string) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d={d} stroke="#0B1410" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
  const labelText = (text: string, color: string) => (
    <Text extraBold size="sm" style={{ letterSpacing: 1.6, textTransform: 'uppercase', color }}>
      {text}
    </Text>
  );

  return (
    <Animated.View
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      style={[
        {
          height: HEIGHT,
          borderRadius: 9,
          overflow: 'hidden',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        trackStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {/* Reflet orangé qui balaie la piste */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: SHIMMER_WIDTH,
            experimental_backgroundImage:
              'linear-gradient(90deg, transparent, rgba(255, 122, 26, 0.28), transparent)',
          },
          shimmerStyle,
        ]}
      />
      {/* Libellés : l'invitation s'efface en glissant, la confirmation apparaît en fondu */}
      <Animated.View
        pointerEvents="none"
        style={[{ alignItems: 'center', paddingLeft: KNOB }, labelStyle]}
      >
        {labelText(label, theme.colors.background)}
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          { position: 'absolute', left: 0, right: 0, alignItems: 'center', paddingLeft: KNOB },
          doneLabelStyle,
        ]}
      >
        {labelText(doneLabel, theme.colors.neutral.white)}
      </Animated.View>
      <GestureDetector gesture={Gesture.Exclusive(pan, tap)}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: PAD,
              width: KNOB,
              height: KNOB,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary.base,
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.18)',
            },
            knobStyle,
          ]}
        >
          {/* Flèche et coche superposées, en fondu croisé */}
          <Animated.View style={[{ position: 'absolute' }, arrowStyle]}>
            {icon(ARROW)}
          </Animated.View>
          <Animated.View style={[{ position: 'absolute' }, checkStyle]}>
            {icon(CHECK)}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
