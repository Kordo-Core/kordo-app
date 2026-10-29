import '@emotion/react';
import { KordoTheme } from 'kordo-ui';

// Sans cette augmentation, `props.theme` dans un styled de l'app vaut l'interface vide
// d'emotion : `props.theme.spacing` ne compile pas. Le fichier équivalent de kordo-ui ne
// couvre que la librairie, une augmentation de module ne traversant pas les paquets.
declare module '@emotion/react' {
  export interface Theme extends KordoTheme {}
}
