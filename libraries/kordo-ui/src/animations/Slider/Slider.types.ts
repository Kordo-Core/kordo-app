import { ReactNode } from 'react';

export interface SliderProps {
  children: ReactNode[];
  gap?: number;
  height: number; // fixed height of the slider container in pixels
}
