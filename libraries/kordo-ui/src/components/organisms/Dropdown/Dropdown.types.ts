import React from 'react';
import { IconProps } from '../../atoms/Icon/Icon.types';

export interface DropdownItem {
  // Identifiant unique de l'item
  key: string;
  // Étiquette affichée dans le trigger une fois l'item sélectionné
  text: string;
  // Contenu rendu à gauche dans la ligne
  left: React.ReactNode;
  // Contenu optionnel rendu à droite dans la ligne
  right?: React.ReactNode;
}

interface BaseDropdownProps {
  // Liste des options proposées à l'ouverture
  items: DropdownItem[];
  // Texte affiché quand rien n'est sélectionné
  placeholder?: string;
  // Icône optionnelle affichée à gauche du trigger
  icon?: IconProps;
  // Hauteur max de la liste ouverte avant de scroller (défaut 240)
  maxHeight?: number;
  disabled?: boolean;
}

export interface SingleDropdownProps extends BaseDropdownProps {
  // Sélection unique : la valeur choisie remplace le placeholder et ferme la liste
  mode?: 'single';
  value: string | null;
  onChange: (value: string | null) => void;
}

export interface MultiDropdownProps extends BaseDropdownProps {
  // Sélection multiple : la liste reste ouverte, le trigger résume les choix
  mode: 'multi';
  value: string[];
  onChange: (value: string[]) => void;
}

// Union discriminée sur `mode` : le type de value/onChange s'adapte au mode choisi
export type DropdownProps = SingleDropdownProps | MultiDropdownProps;
