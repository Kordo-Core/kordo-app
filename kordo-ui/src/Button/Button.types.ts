import { JSX } from 'react';

export type ButtonColor = 'primary' | 'secondary' | 'black';

export type ButtonBorder = 'rounded' | 'square';

export type ButtonSize = 'normal' | 'large';

export type ButtonWidth = 'min' | 'medium' | 'full';

export interface ButtonProps {
  title?: string; //TODO
  color: ButtonColor; //TODO
  icon?: React.ReactNode; //TODO
  border?: ButtonBorder; //TODO
  inverted?: boolean; //TODO
  size?: ButtonSize; //TODO
  width?: ButtonWidth; //TODO
  onClick?: () => void; //TODO
  disabled?: boolean; //TODO
  className?: string; //TODO
}
