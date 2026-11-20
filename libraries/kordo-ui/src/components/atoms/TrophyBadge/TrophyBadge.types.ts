import { StyleProp, ViewStyle } from 'react-native';

export interface TrophyBadgeProps {
  /** Tracé SVG de l'icône du trophée (viewBox 24×24, dessiné au trait) */
  icon: string;
  /** Trophée obtenu : fond orangé et icône foncée ; sinon fond gris et icône atténuée */
  earned: boolean;
  /** `md` (52 px) dans les listes, `lg` (58 px) sur l'étagère du profil */
  size?: 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}
