import { ReactNode } from 'react';
import { SharedValue } from 'react-native-reanimated';

export type PodiumBarProps = {
  height: number;
  delay?: number;
  scrollY: SharedValue<number>;
  shrinkEnd: number;
  children: ReactNode;
};
