import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface CollapsibleCardProps {
  /** Titre affiché sur la ligne qui ouvre et ferme la carte */
  title: string;
  /** Élément posé à droite du titre, avant le chevron */
  right?: ReactNode;
  /** Ouverte au premier affichage (défaut : oui) */
  defaultOpen?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
