import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SlideToConfirmProps } from './SlideToConfirm.types';
import { Icon } from '../../atoms/Icon/Icon';
import { Text } from '../../atoms/Text/Text';

const HEIGHT = 68;
const PAD = 6;
const KNOB = HEIGHT - PAD * 2;
// Part de la course à atteindre pour valider
const THRESHOLD = 0.82;
const SPRING = { damping: 18, stiffness: 180 };

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
  const max = Math.max(0, width - KNOB - PAD * 2);

  const confirm = () => {
    setDone(true);
    onConfirm();
    if (resetAfter > 0) {
      setTimeout(() => {
        setDone(false);
        x.value = withTiming(0, { duration: 350 });
      }, resetAfter);
    }
  };

  const pan = Gesture.Pan()
    .enabled(!disabled && !done && max > 0)
    .onChange((e) => {
      x.value = Math.min(max, Math.max(0, x.value + e.changeX));
    })
    .onEnd(() => {
      if (x.value >= max * THRESHOLD) {
        x.value = withSpring(max, SPRING);
        runOnJS(confirm)();
      } else {
        x.value = withSpring(0, SPRING);
      }
    });

  const tap = Gesture.Tap()
    .enabled(!disabled && !done && max > 0)
    .onEnd(() => {
      x.value = withSpring(max, SPRING);
      runOnJS(confirm)();
    });

  const knobStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const fillStyle = useAnimatedStyle(() => ({ width: x.value + KNOB + PAD }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: max > 0 ? interpolate(x.value, [0, max * 0.6], [1, 0]) : 1,
  }));

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      style={[
        {
          height: HEIGHT,
          borderRadius: 22,
          overflow: 'hidden',
          justifyContent: 'center',
          backgroundColor: done ? theme.colors.secondary.base : theme.colors.text,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {/* Remplissage vert qui suit le curseur */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.colors.secondary.base,
            opacity: 0.35,
          },
          fillStyle,
        ]}
      />
      <Animated.View
        style={[{ alignItems: 'center', paddingLeft: KNOB }, done ? undefined : labelStyle]}
      >
        <Text
          extraBold
          size="sm"
          style={{
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: done ? theme.colors.neutral.white : theme.colors.background,
          }}
        >
          {done ? doneLabel : label}
        </Text>
      </Animated.View>
      <GestureDetector gesture={Gesture.Exclusive(pan, tap)}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: PAD,
              width: KNOB,
              height: KNOB,
              borderRadius: 17,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary.base,
              boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
            },
            knobStyle,
          ]}
        >
          <Icon name={done ? 'CheckmarkFilled' : 'ArrowRightFilled'} size={24} color="#13201B" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
