import { ExtendedSizeType, SizeType } from './types/theme.types';

/**
 * Nuancier d'une couleur de marque, du plus clair au plus foncé. Les clés sont fermées :
 * `colors.primary.medium` ne compile pas, et l'éditeur propose les sept nuances.
 */
export type ColorScale = {
  lightest: string;
  lighter: string;
  light: string;
  base: string;
  dark: string;
  darker: string;
  darkest: string;
};

/** Couleur d'état : une teinte pleine, et son fond clair pour les bandeaux. */
export type StatusColor = {
  base: string;
  lighter: string;
};

/** Gris de l'interface : fonds, bordures, textes secondaires. */
export type GrayScale = {
  lightest: string;
  light: string;
  base: string;
};

/** Couleur de cotation d'un bloc, telle qu'affichée en salle. */
export type BoulderGradeColor = 'yellow' | 'green' | 'blue' | 'red' | 'black' | 'purple';

export type KordoTheme = {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    neutral: {
      white: string;
      black: string;
      gray: GrayScale;
    };
    success: StatusColor;
    error: StatusColor;
    warning: StatusColor;
    info: StatusColor;
    boulderGrade: Record<BoulderGradeColor, string>;
    /** Voiles posés sur une image ou derrière une modale */
    overlay: {
      /** Voile sombre : fond d'une modale, voile sur une photo ou une vidéo */
      dark: string;
      /** Élément clair posé sur un média : puce active, piste de progression */
      light: string;
    };
  };
  // Les échelles reprennent le vocabulaire de taille des composants : `Text size="lg"` lit
  // `fontSizes.lg`, `Icon size="md"` lit `iconSizes.md`. Une clé hors échelle ne compile pas.
  spacing: Record<ExtendedSizeType, number>;
  fontSizes: Record<ExtendedSizeType, number>;
  iconSizes: Record<SizeType, number>;
  avatarSizes: Record<SizeType, number>;
  /** Élévations, de la plus discrète (bandes de contenu) à la plus marquée (cartes flottantes) */
  shadows: Record<SizeType, string> & {
    /** Projetée vers le haut : barres ancrées en bas d'écran */
    up: string;
  };
  borderRadius: {
    square: number;
    rounded: number;
  };
  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
};

export const theme: KordoTheme = {
  colors: {
    primary: {
      lightest: '#fffef5',
      lighter: 'rgb(247, 219, 180)',
      light: '#F7D081',
      base: '#F3B24E',
      dark: '#DB9840',
      darker: '#91551C',
      darkest: '#471F06',
    },
    secondary: {
      lightest: '#f2fcfa',
      lighter: '#bce3d9',
      light: '#81B8A4',
      base: '#57987D',
      dark: '#468A6B',
      darker: '#1F5C3B',
      darkest: '#072B1F',
    },
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        lightest: '#F2F2F7',
        light: '#dadadaff',
        base: '#888888',
      },
    },
    success: {
      base: '#57987D',
      lighter: '#E6F4EA',
    },
    error: {
      base: '#FF0000',
      lighter: '#FDECEA',
    },
    warning: {
      base: '#F3B24E',
      lighter: '#FFF4E5',
    },
    info: {
      base: '#2196F3',
      lighter: '#E8F3FD',
    },
    boulderGrade: {
      yellow: '#f3e34eff',
      green: '#27AE60',
      blue: '#2F80ED',
      red: '#EC3463',
      black: '#000000',
      purple: '#9B51E0',
    },
    overlay: {
      dark: 'rgba(0, 0, 0, 0.5)',
      light: 'rgba(255, 255, 255, 0.5)',
    },
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 32 },
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24, xxl: 32 },
  iconSizes: { sm: 20, md: 24, lg: 32 },
  avatarSizes: { sm: 38, md: 50, lg: 72 },
  shadows: {
    sm: '0px 2px 2px rgba(0, 0, 0, 0.05)',
    md: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    lg: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    up: '0px -2px 6px rgba(0, 0, 0, 0.05)',
  },
  borderRadius: { square: 8, rounded: 100 },
  fonts: {
    regular: 'Outfit_400Regular',
    medium: 'Outfit_500Medium',
    bold: 'Outfit_700Bold',
  },
};
