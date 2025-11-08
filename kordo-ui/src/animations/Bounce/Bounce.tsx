import React from 'react';
import { Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BounceProps } from './Bounce.types';

export const Bounce: React.FC<BounceProps> = (props) => {
  const { children, onPress, scaleTo = 0.95, duration = 200 } = props;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(scaleTo, { duration });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration });
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};
