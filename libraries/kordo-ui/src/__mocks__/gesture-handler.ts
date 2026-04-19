import React from 'react';

const chainable = () => {
  const g: Record<string, unknown> = {};
  [
    'onUpdate', 'onEnd', 'onBegin', 'onFinalize', 'onStart',
    'simultaneousWithExternalGesture', 'enabled', 'minDistance',
    'minVelocity', 'maxPointers', 'activeOffsetX', 'activeOffsetY',
    'failOffsetX', 'failOffsetY', 'runOnJS', 'withTestId',
  ].forEach((m) => { g[m] = () => g; });
  return g;
};

export const Gesture = {
  Pan: chainable,
  Tap: chainable,
  LongPress: chainable,
  Pinch: chainable,
  Rotation: chainable,
  Fling: chainable,
  Simultaneous: (..._args: unknown[]) => chainable(),
  Exclusive: (..._args: unknown[]) => chainable(),
  Race: (..._args: unknown[]) => chainable(),
};

export const GestureDetector = ({ children }: { children: React.ReactNode }) =>
  children as React.ReactElement;

export const GestureHandlerRootView = ({ children }: { children: React.ReactNode }) =>
  children as React.ReactElement;

export const PanGestureHandler = ({ children }: { children: React.ReactNode }) =>
  children as React.ReactElement;

export const TapGestureHandler = ({ children }: { children: React.ReactNode }) =>
  children as React.ReactElement;

export const State = {};
export const Directions = {};
export const gestureHandlerRootHOC = (Comp: unknown) => Comp;
