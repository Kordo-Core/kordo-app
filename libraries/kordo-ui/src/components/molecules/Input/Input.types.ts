import { IconProps } from '../../atoms/Icon/Icon.types';

export interface InputProps {
  value: string;
  onChange: (text: string) => void;
  label?: string;
  placeholder?: string;
  type?: 'email' | 'password' | 'number';
  editable?: boolean;
  maxLength?: number;
  minLength?: number;
  multiline?: boolean;
  /** `form` : libellé en capitales au-dessus, sans icône (écran Publier) */
  variant?: 'default' | 'form';
  /** Variante `form` : affiche « n / max » à droite du libellé et limite la saisie */
  counter?: number;
  /** Variante `form` : saisie en 17 px extra-grasse (titre) */
  emphasis?: boolean;
  // Icône optionnelle affichée à gauche du champ
  leftIcon?: IconProps;
  // Icône optionnelle affichée à droite du champ (peut coexister avec leftIcon)
  rightIcon?: IconProps;
  // Mot de passe : ajoute à droite un œil pour l'afficher en clair (remplace rightIcon)
  revealable?: boolean;
  required?: boolean;
  autoFocus?: boolean;
}
