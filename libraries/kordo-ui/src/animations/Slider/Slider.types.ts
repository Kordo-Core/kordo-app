import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface SliderProps {
  children: ReactNode[];
  /** Espacement entre les items (px). Utilisé en carrousel libre et en mode sélection */
  gap?: number;
  /** Hauteur fixe du conteneur du slider (px) */
  height: number;
  /**
   * Active le mode sélecteur : défilement aimanté qui centre chaque item avec une résistance.
   * L'item centré est mis en avant (plein, grand), ses voisins sont réduits et estompés.
   */
  selectMode?: boolean;
  /**
   * Mode pages : chaque item occupe toute la largeur et le défilement s'arrête page par page
   * (carrousel de photos). `onChange` donne la page affichée, `selectedIndex` la fait changer.
   */
  paging?: boolean;
  /** (selectMode, paging) Index de l'item centré/sélectionné */
  selectedIndex?: number;
  /** (selectMode, paging) Appelé quand un nouvel item s'aimante au centre / une nouvelle page s'affiche */
  onChange?: (index: number) => void;
  /** (selectMode) Largeur fixe optionnelle des slots ; par défaut chaque item prend sa largeur naturelle */
  itemWidth?: number;
  style?: StyleProp<ViewStyle>;
}
