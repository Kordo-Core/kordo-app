import { StyleProp, ViewStyle } from 'react-native';
import { AppearanceType, NeutralType, StatusType } from '../../../types/theme.types';
import { IconProps } from '../Icon/Icon.types';
import { SurfaceTone } from '../../../utils/surfaceTones';

export interface TagProps {
  title: string;
  /** Couleur pleine du thème, ou fond doux (`soft`, `softError`, `surface`, `muted`, `glass`) */
  appearance?: AppearanceType | StatusType | NeutralType | SurfaceTone;
  /**
   * Hauteur : `xs` 16 px (compteur), `sm` 22 px, `md` 26 px (défaut), `lg` 32 px (étiquette
   * d'en-tête)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: Pick<IconProps, 'name' | 'size'>;
  style?: StyleProp<ViewStyle>;
}
