import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { textDefaults, toWebStyle, viewDefaults } from './rn-style';
import { createRNPrimitive } from './rn-primitives';

// Implémentation web minimale de react-native-reanimated pour Storybook.
//
// L'ancien stub renvoyait des valeurs figées : `withTiming` retournait immédiatement la cible,
// `useAnimatedStyle` n'était évalué qu'une fois et `Animated.View` était la chaîne 'div'.
// Résultat : aucune animation ne bougeait. Ici les valeurs partagées sont réellement
// interpolées dans le temps via requestAnimationFrame et notifient les vues animées.

type Listener = () => void;

const listeners = new Set<Listener>();

// Les notifications sont regroupées dans une microtâche. Un style animé peut écrire dans une
// valeur partagée pendant son évaluation (SegmentedControl mémorise la couleur atteinte) :
// notifier sur le champ déclencherait un `setState` en pleine phase de rendu, donc un rendu
// en boucle. Différer sort de la phase de rendu tout en restant avant la peinture.
let scheduled = false;
const notify = () => {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    listeners.forEach((listener) => listener());
  });
};

// ─── Easing ──────────────────────────────────────────────────────────────────

type EasingFn = (t: number) => number;

const cubicBezier = (x1: number, y1: number, x2: number, y2: number): EasingFn => {
  // Résolution approchée par bissection : suffisant pour du rendu à l'écran.
  const curve = (a: number, b: number, t: number) => {
    const u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  };
  return (t) => {
    let low = 0;
    let high = 1;
    let mid = t;
    for (let i = 0; i < 20; i += 1) {
      mid = (low + high) / 2;
      if (curve(x1, x2, mid) < t) low = mid;
      else high = mid;
    }
    return curve(y1, y2, mid);
  };
};

const linear: EasingFn = (t) => t;

export const Easing = {
  linear,
  ease: cubicBezier(0.42, 0, 1, 1),
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  bezier: (x1: number, y1: number, x2: number, y2: number) => cubicBezier(x1, y1, x2, y2),
  in: (easing: EasingFn = linear) => easing,
  out:
    (easing: EasingFn = linear): EasingFn =>
    (t) =>
      1 - easing(1 - t),
  inOut:
    (easing: EasingFn = linear): EasingFn =>
    (t) =>
      t < 0.5 ? easing(t * 2) / 2 : 1 - easing((1 - t) * 2) / 2,
};

// ─── Descripteurs d'animation ────────────────────────────────────────────────

type Callback = (finished: boolean) => void;

type Animation =
  | {
      kind: 'timing';
      toValue: number | string;
      duration: number;
      easing: EasingFn;
      callback?: Callback;
    }
  | { kind: 'delay'; delay: number; animation: AnimationInput }
  | { kind: 'sequence'; animations: AnimationInput[] }
  | { kind: 'repeat'; animation: AnimationInput; count: number; reverse: boolean };

type AnimationInput = Animation | number | string;

const isAnimation = (value: unknown): value is Animation =>
  typeof value === 'object' && value !== null && 'kind' in value;

// Le callback est porté par le descripteur et appelé à la fin de l'animation, pas à sa
// création : plusieurs composants s'en servent pour se démonter (le Panel après sa sortie),
// et l'appeler tout de suite escamoterait l'animation.
export const withTiming = (
  toValue: number | string,
  config?: { duration?: number; easing?: EasingFn },
  callback?: Callback,
): Animation => ({
  kind: 'timing',
  toValue,
  duration: config?.duration ?? 300,
  easing: config?.easing ?? Easing.inOut(Easing.quad),
  callback,
});

// Le ressort n'est pas simulé : une temporisation douce suffit pour Storybook.
export const withSpring = (
  toValue: number | string,
  _config?: object,
  callback?: Callback,
): Animation => withTiming(toValue, { duration: 400, easing: Easing.out(Easing.cubic) }, callback);

export const withDecay = (config?: { velocity?: number }): Animation =>
  withTiming(config?.velocity ?? 0, { duration: 300 });

export const withDelay = (delay: number, animation: AnimationInput): Animation => ({
  kind: 'delay',
  delay,
  animation,
});

export const withSequence = (...animations: AnimationInput[]): Animation => ({
  kind: 'sequence',
  animations,
});

export const withRepeat = (animation: AnimationInput, count = -1, reverse = false): Animation => ({
  kind: 'repeat',
  animation,
  count,
  reverse,
});

// ─── Valeurs partagées ───────────────────────────────────────────────────────

type Frame = number;

export type SharedValue<T> = { value: T };

class SharedValueImpl<T> {
  private current: T;
  private frame: Frame | null = null;
  // Callback de l'animation en cours, à honorer avec `false` si elle est interrompue.
  private pending: Callback | null = null;

  constructor(initial: T) {
    this.current = initial;
  }

  get value(): T {
    return this.current;
  }

  set value(next: T) {
    if (isAnimation(next)) {
      this.cancel();
      this.run(next as Animation);
      return;
    }
    // Écrire la même valeur ne notifie pas : un style animé qui recopie une valeur atteinte
    // le fait à chaque rendu, et notifier relancerait un rendu à l'infini.
    if (this.current === next) return;
    this.cancel();
    this.current = next;
    notify();
  }

  cancel() {
    if (this.frame !== null) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }
    const pending = this.pending;
    this.pending = null;
    pending?.(false);
  }

  private settle(value: AnimationInput, done: () => void) {
    this.current = value as T;
    notify();
    done();
  }

  private finish(animation: Animation, done: () => void) {
    this.pending = null;
    if (animation.kind === 'timing') animation.callback?.(true);
    done();
  }

  private run(animation: Animation, done: () => void = () => {}) {
    switch (animation.kind) {
      case 'timing': {
        const from = this.current;
        const to = animation.toValue;
        this.pending = animation.callback ?? null;
        // Seuls les nombres s'interpolent ; toute autre valeur est appliquée à la fin.
        if (typeof from !== 'number' || typeof to !== 'number' || animation.duration <= 0) {
          this.settle(to, () => this.finish(animation, done));
          return;
        }
        const start = performance.now();
        const step = () => {
          const elapsed = performance.now() - start;
          const progress = Math.min(1, elapsed / animation.duration);
          this.current = (from + (to - from) * animation.easing(progress)) as T;
          notify();
          if (progress < 1) {
            this.frame = requestAnimationFrame(step);
          } else {
            this.frame = null;
            this.finish(animation, done);
          }
        };
        this.frame = requestAnimationFrame(step);
        return;
      }
      case 'delay': {
        const start = performance.now();
        const wait = () => {
          if (performance.now() - start >= animation.delay) {
            this.chain(animation.animation, done);
          } else {
            this.frame = requestAnimationFrame(wait);
          }
        };
        this.frame = requestAnimationFrame(wait);
        return;
      }
      case 'sequence': {
        const [first, ...rest] = animation.animations;
        if (first === undefined) {
          done();
          return;
        }
        this.chain(first, () =>
          rest.length ? this.run({ kind: 'sequence', animations: rest }, done) : done(),
        );
        return;
      }
      case 'repeat': {
        // Chaque passe doit repartir de la valeur de départ : sans ça la deuxième itération
        // s'anime de la cible vers la cible, donc plus rien ne bouge (spinner figé après un
        // tour, barre bloquée à droite). `reverse` fait alterner le sens au lieu de rejouer.
        const start = this.current;
        const inner = animation.animation;
        const target = isAnimation(inner) && inner.kind === 'timing' ? inner.toValue : inner;
        let remaining = animation.count;
        let forward = true;

        const loop = () => {
          if (remaining === 0) {
            done();
            return;
          }
          if (remaining > 0) remaining -= 1;

          if (!animation.reverse) {
            this.current = start;
            this.chain(inner, loop);
            return;
          }

          const toValue = forward ? target : start;
          forward = !forward;
          this.chain(
            isAnimation(inner) && inner.kind === 'timing'
              ? { ...inner, toValue: toValue as number | string, callback: undefined }
              : (toValue as AnimationInput),
            loop,
          );
        };
        loop();
      }
    }
  }

  private chain(animation: AnimationInput, done: () => void) {
    if (isAnimation(animation)) this.run(animation, done);
    else this.settle(animation, done);
  }
}

export const useSharedValue = <T>(initial: T): SharedValue<T> => {
  const ref = useRef<SharedValueImpl<T> | null>(null);
  if (ref.current === null) ref.current = new SharedValueImpl(initial);
  return ref.current as unknown as SharedValue<T>;
};

export const cancelAnimation = (sharedValue: SharedValue<unknown>) =>
  (sharedValue as unknown as SharedValueImpl<unknown>).cancel?.();

// ─── Hooks dérivés ───────────────────────────────────────────────────────────

// Toute écriture sur une valeur partagée notifie globalement : les vues animées
// se réévaluent à chaque frame d'animation en cours.
const useAnimationTick = () => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const listener = () => setTick((tick) => tick + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
};

export const useAnimatedStyle = <T extends object>(factory: () => T): T => {
  useAnimationTick();
  return factory();
};

export const useAnimatedProps = <T extends object>(factory: () => T): T => {
  useAnimationTick();
  return factory();
};

export const useDerivedValue = <T>(factory: () => T): SharedValue<T> => {
  useAnimationTick();
  return { value: factory() };
};

export const useAnimatedRef = <T>() => React.createRef<T>();

export const useAnimatedScrollHandler = (
  handler: ((event: { contentOffset: { x: number; y: number } }) => void) | Record<string, unknown>,
) => {
  const onScroll = typeof handler === 'function' ? handler : undefined;
  return (event: { nativeEvent?: { contentOffset?: { x: number; y: number } } }) => {
    const contentOffset = event?.nativeEvent?.contentOffset ?? { x: 0, y: 0 };
    onScroll?.({ contentOffset });
  };
};

export const useAnimatedGestureHandler = () => () => {};

export const runOnJS =
  <A extends unknown[]>(fn: (...args: A) => unknown) =>
  (...args: A) =>
    fn(...args);

export const runOnUI = runOnJS;

// ─── Interpolation ───────────────────────────────────────────────────────────

export const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' } as const;

export const interpolate = (
  value: number,
  input: number[],
  output: number[],
  extrapolation: string = Extrapolation.EXTEND,
): number => {
  if (input.length < 2 || output.length < 2) return value;

  if (value <= input[0]) {
    return extrapolation === Extrapolation.CLAMP
      ? output[0]
      : interpolateSegment(value, input, output, 0);
  }
  const last = input.length - 1;
  if (value >= input[last]) {
    return extrapolation === Extrapolation.CLAMP
      ? output[last]
      : interpolateSegment(value, input, output, last - 1);
  }

  const index = input.findIndex((bound, i) => i > 0 && value <= bound) - 1;
  return interpolateSegment(value, input, output, Math.max(0, index));
};

const interpolateSegment = (
  value: number,
  input: number[],
  output: number[],
  i: number,
): number => {
  const span = input[i + 1] - input[i];
  if (span === 0) return output[i];
  const ratio = (value - input[i]) / span;
  return output[i] + ratio * (output[i + 1] - output[i]);
};

const parseColor = (color: string): [number, number, number] => {
  const rgb = color.match(/rgba?\(([^)]+)\)/);
  if (rgb) {
    const [r, g, b] = rgb[1].split(',').map((part) => parseFloat(part));
    return [r, g, b];
  }
  const hex = color.replace('#', '');
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) || 0) as [number, number, number];
};

export const interpolateColor = (value: number, input: number[], output: string[]): string => {
  if (output.length < 2) return output[0] ?? 'transparent';
  const channels = output.map(parseColor);
  const [r, g, b] = [0, 1, 2].map((channel) =>
    Math.round(
      interpolate(
        value,
        input,
        channels.map((c) => c[channel]),
        Extrapolation.CLAMP,
      ),
    ),
  );
  return `rgb(${r}, ${g}, ${b})`;
};

// ─── Composants animés ───────────────────────────────────────────────────────

type AnimatedProps = {
  style?: unknown;
  animatedProps?: Record<string, unknown>;
  children?: React.ReactNode;
  [key: string]: unknown;
};

// Les vues animées sont bâties sur les mêmes primitives que les composants `@emotion/native` :
// elles traduisent le style RN, mais surtout elles honorent `onLayout`. Sans lui, les
// composants qui se dimensionnent d'après leur propre mesure restaient bloqués à zéro —
// le Panel ne s'ouvrait jamais et le header `smart` ne se masquait pas.
// Les défauts react-native-web sont indispensables : sans eux le conteneur n'est pas flex,
// et un enfant en `alignSelf: 'flex-start'` (Tag, Button…) s'étire au lieu de se
// dimensionner à son contenu.
const AnimatedView = styled(createRNPrimitive('div', 'view'))(viewDefaults);
const AnimatedText = styled(createRNPrimitive('span', 'text'))(textDefaults);
const AnimatedScrollView = styled(createRNPrimitive('div', 'view'))({
  ...viewDefaults,
  overflow: 'auto',
});
const AnimatedImage = styled(createRNPrimitive('img', 'image'))({
  boxSizing: 'border-box',
  display: 'block',
  objectFit: 'cover',
});

// `style` reste en syntaxe RN (`transform: [{ scale }]`, tableaux) : la primitive s'en charge.
const createAnimated = (Base: React.ElementType, name: string): React.FC<AnimatedProps> => {
  const Component: React.FC<AnimatedProps> = ({ animatedProps, children, ...rest }) =>
    React.createElement(
      Base as React.ComponentType<Record<string, unknown>>,
      { ...rest, ...animatedProps },
      children,
    );
  Component.displayName = `Animated.${name}`;
  return Component;
};

export const createAnimatedComponent = <P extends AnimatedProps>(
  Component: React.ComponentType<P>,
): React.FC<P> => {
  const Animated: React.FC<P> = ({ animatedProps, style, ...rest }) =>
    React.createElement(Component, {
      ...rest,
      ...animatedProps,
      style: toWebStyle(style as never),
    } as P);
  Animated.displayName = 'Animated.Component';
  return Animated;
};

const Animated = {
  View: createAnimated(AnimatedView, 'View'),
  Text: createAnimated(AnimatedText, 'Text'),
  ScrollView: createAnimated(AnimatedScrollView, 'ScrollView'),
  Image: createAnimated(AnimatedImage, 'Image'),
  createAnimatedComponent,
};

export default Animated;
