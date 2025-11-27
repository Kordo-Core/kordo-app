import { ReactNode } from 'react';

export interface SliderProps {
  children: ReactNode[];
  gap?: number;
  height: number; // hauteur fixe optionnelle
}
