import '@emotion/react';
import { KordoTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends KordoTheme {}
}
