import { ComponentType } from 'react';

/** Icône d'un onglet : soit un nom d'icône fluent, soit un composant SVG (size + color). */
export type NavTabIcon = string | ComponentType<{ size?: number; color?: string }>;

export type NavTab = {
  key: string;
  icon: NavTabIcon;
  isAction?: boolean;
};

export interface BottomNavBarProps {
  tabs: NavTab[];
  style?: any;
  onTabPress?: (index: number, key: string) => void;
}
