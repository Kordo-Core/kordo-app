import React from 'react';

export const useSharedValue = (init: unknown) => ({ value: init });
export const useAnimatedStyle = (fn: () => object) => fn();
export const useAnimatedProps = (fn: () => object) => fn();
export const withTiming = (toValue: unknown) => toValue;
export const withSpring = (toValue: unknown) => toValue;
export const withDelay = (_delay: number, animation: unknown) => animation;
export const withRepeat = (animation: unknown) => animation;
export const withSequence = (..._animations: unknown[]) => _animations[0];
export const cancelAnimation = () => {};
export const runOnJS = (fn: (...args: unknown[]) => unknown) => fn;
export const runOnUI = (fn: (...args: unknown[]) => unknown) => fn;
export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  bezier: () => (t: number) => t,
  inOut: () => (t: number) => t,
  out: () => (t: number) => t,
  in: () => (t: number) => t,
};
export const interpolate = (value: number) => value;
export const interpolateColor = (_value: number, _input: number[], output: string[]) => output[0] ?? 'transparent';
export const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };
export const useAnimatedRef = () => React.createRef();
export const useDerivedValue = (fn: () => unknown) => ({ value: fn() });
export const useAnimatedScrollHandler = () => () => {};
export const useAnimatedGestureHandler = () => () => {};
export const createAnimatedComponent = <T>(Component: T): T => Component;

const Animated = {
  View: 'div' as unknown as React.ComponentType,
  Text: 'span' as unknown as React.ComponentType,
  ScrollView: 'div' as unknown as React.ComponentType,
  Image: 'img' as unknown as React.ComponentType,
  createAnimatedComponent,
};

export default Animated;
