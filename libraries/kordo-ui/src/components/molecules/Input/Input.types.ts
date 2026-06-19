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
  // Icône optionnelle affichée à gauche du champ
  leftIcon?: IconProps;
  // Icône optionnelle affichée à droite du champ (peut coexister avec leftIcon)
  rightIcon?: IconProps;
  required?: boolean;
  autoFocus?: boolean;
}
