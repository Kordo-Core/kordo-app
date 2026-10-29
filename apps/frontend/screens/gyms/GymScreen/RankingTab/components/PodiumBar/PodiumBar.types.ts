import { ReactNode } from 'react';
import { SharedValue } from 'react-native-reanimated';

export type PodiumBarProps = {
  height: number;
  delay?: number;
  scrollY: SharedValue<number>;
  shrinkEnd: number;
  /** Première place : marche orange */
  first?: boolean;
  children: ReactNode;
};
