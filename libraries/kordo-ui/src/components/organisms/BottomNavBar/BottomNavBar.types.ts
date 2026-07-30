import { ComponentType } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/** Icône d'un onglet : soit un nom d'icône fluent, soit un composant SVG (size + color). */
export type NavTabIcon = string | ComponentType<{ size?: number; color?: string }>;

export type NavTab = {
  key: string;
  icon: NavTabIcon;
  isAction?: boolean;
};

export interface BottomNavBarProps {
  tabs: NavTab[];
  activeIndex?: number;
  style?: StyleProp<ViewStyle>;
  onTabPress?: (index: number, key: string) => void;
}
