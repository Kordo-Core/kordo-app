import { KordoTheme } from 'theme';

export interface TextProps {
  children: React.ReactNode;
  appearance?: 'primary' | 'secondary' | 'black' | 'grey' | 'white' | 'error';
  size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  bold?: boolean;
  style?: any;
}
