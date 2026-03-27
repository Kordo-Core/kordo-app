import { IconPosition, IconProps } from '../../atoms/Icon/Icon.types';

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  type?: 'email' | 'password' | 'number';
  editable?: boolean;
  maxLength?: number;
  minLength?: number;
  multiline?: boolean;
  icon?: IconProps;
  iconPosition?: IconPosition;
  required?: boolean;
}
