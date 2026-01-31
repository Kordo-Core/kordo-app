import { AppearanceType, NeutralType, SizeType } from '../../../types/theme.types';
import { IconProps } from '../Icon/Icon.types';

export interface ButtonProps {
  /** Texte affiché dans le bouton */
  title?: string;
  /** Couleur du bouton */
  appearance?: AppearanceType | Exclude<NeutralType, 'white'>;
  /** Icône à afficher */
  icon?: IconProps;
  /** Forme des coins */
  borderRadius?: 'rounded' | 'square';
  /** Inverse les couleurs (fond blanc, texte/bordure colorés) */
  inverted?: boolean;
  /** Taille du bouton */
  size?: Exclude<SizeType, 'sm'>;
  /** Styles personnalisés */
  style?: any;
  /** Callback au clic */
  onPress?: () => void;
  /** Supprime la bordure */
  borderless?: boolean;
  /** Désactive le bouton */
  disabled?: boolean;
}
