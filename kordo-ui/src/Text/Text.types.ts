import { KordoTheme } from 'theme';

export interface TextProps {
  children: React.ReactNode;
  appearance?: 'primary' | 'secondary' | 'black' | 'grey' | 'white';
  size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  bold?: boolean;
}
