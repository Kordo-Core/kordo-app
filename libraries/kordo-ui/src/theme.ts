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

/** Nom du thème actif : clair par défaut, sombre en option. */
export type ThemeMode = 'light' | 'dark';

export type KordoTheme = {
  /** Mode du thème, pour les rares choix qui ne passent pas par un jeton (barre d'état…) */
  mode: ThemeMode;
  colors: {
    /** Orange Kordo : accent, points, niveaux, bouton « + ». Le texte posé dessus est foncé. */
    primary: ColorScale;
    /** Vert forêt : couleur d'action (boutons principaux, onglet actif, validation). */
    secondary: ColorScale;
    neutral: {
      /** Blanc absolu : texte et icônes posés sur une couleur ou une photo. */
      white: string;
      /** Noir absolu : voiles et ombres. Pour le texte, utiliser `colors.text`. */
      black: string;
      gray: GrayScale;
    };
    /** Fond des écrans */
    background: string;
    /** Fond des cartes, listes, barres d'en-tête */
    surface: string;
    /** Fond secondaire posé sur une surface : champs, segments, puces inactives */
    surfaceAlt: string;
    /** Séparateurs et contours */
    border: string;
    /** Texte principal */
    text: string;
    /** Texte secondaire */
    textMuted: string;
    /** Orange lisible en texte (liens, montants) — l'orange pur manque de contraste sur clair */
    accentText: string;
    /** Fond doux vert et son texte : encarts d'information, puces sélectionnées, tags */
    soft: string;
    softText: string;
    /** Barre de navigation flottante */
    navBar: string;
    navBarIcon: string;
    /** Dégradé des cartes « héro » (résumé de la semaine, classement…) */
    hero: [string, string];
    /** Piste des interrupteurs éteints */
    track: string;
    success: StatusColor;
    error: StatusColor;
    warning: StatusColor;
    info: StatusColor;
    boulderGrade: Record<BoulderGradeColor, string>;
    /** Échelle de niveaux (4 → 7A), de l'orange clair à l'orange brûlé */
    levels: string[];
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
  /** Tailles des titres « display » (Bricolage Grotesque, majuscules) */
  displaySizes: Record<ExtendedSizeType, number>;
  iconSizes: Record<SizeType, number>;
  avatarSizes: Record<SizeType, number>;
  /** Élévations, de la plus discrète (bandes de contenu) à la plus marquée (cartes flottantes) */
  shadows: Record<SizeType, string> & {
    /** Projetée vers le haut : barres ancrées en bas d'écran */
    up: string;
  };
  borderRadius: {
    /** Tags, puces */
    sm: number;
    /** Boutons, champs, avatars (squircle) */
    square: number;
    /** Cartes, listes */
    card: number;
    /** Cartes héro, médias */
    lg: number;
    /** Pilules et cercles */
    rounded: number;
  };
  fonts: {
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
    extraBold: string;
    /** Police des titres display (toujours en majuscules) */
    display: string;
  };
};

const LEVELS = ['#FCE8C8', '#F7CB85', '#F3B24E', '#E09A30', '#C27B1B', '#9A5F0E'];

const BOULDER_GRADES: Record<BoulderGradeColor, string> = {
  yellow: '#F2C94C',
  green: '#27AE60',
  blue: '#2F80ED',
  red: '#EB4D5F',
  black: '#1C1A18',
  purple: '#9B51E0',
};

const PRIMARY: ColorScale = {
  lightest: '#FEF6EA',
  lighter: '#FCE8C8',
  light: '#F7CB85',
  base: '#F3B24E',
  dark: '#E09A30',
  darker: '#94580A',
  darkest: '#471F06',
};

const SECONDARY: ColorScale = {
  lightest: '#EEF5F1',
  lighter: '#DDEDE5',
  light: '#8FC4AA',
  base: '#2F6B55',
  dark: '#245744',
  darker: '#173B2E',
  darkest: '#0B2018',
};

const SHARED = {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 32 },
  fontSizes: { xs: 12, sm: 13, md: 15, lg: 17, xl: 22, xxl: 30 },
  displaySizes: { xs: 20, sm: 24, md: 30, lg: 40, xl: 56, xxl: 72 },
  iconSizes: { sm: 20, md: 22, lg: 30 },
  avatarSizes: { sm: 40, md: 46, lg: 96 },
  borderRadius: { sm: 10, square: 14, card: 22, lg: 28, rounded: 999 },
  fonts: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semiBold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
    extraBold: 'PlusJakartaSans_800ExtraBold',
    display: 'BricolageGrotesque_800ExtraBold',
  },
} satisfies Partial<KordoTheme>;

/** Thème clair : le thème par défaut de l'application. */
export const lightTheme: KordoTheme = {
  mode: 'light',
  colors: {
    primary: PRIMARY,
    secondary: SECONDARY,
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray: { lightest: '#EDF2EF', light: '#E3EAE6', base: '#5B6B64' },
    },
    background: '#F4F7F5',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF2EF',
    border: '#E3EAE6',
    text: '#13201B',
    textMuted: '#5B6B64',
    accentText: '#94580A',
    soft: '#DDEDE5',
    softText: '#2F6B55',
    navBar: '#13201B',
    navBarIcon: '#8FA39A',
    hero: ['#2F6B55', '#1E4A3A'],
    track: '#D5DFDA',
    success: { base: '#2F6B55', lighter: '#DDEDE5' },
    error: { base: '#C2413A', lighter: '#FDECEC' },
    warning: { base: '#E09A30', lighter: '#FEF6EA' },
    info: { base: '#2F62C8', lighter: '#E3ECFB' },
    boulderGrade: BOULDER_GRADES,
    levels: LEVELS,
    overlay: { dark: 'rgba(19, 32, 27, 0.5)', light: 'rgba(255, 255, 255, 0.5)' },
  },
  shadows: {
    sm: '0px 1px 2px rgba(19, 32, 27, 0.05)',
    md: '0px 4px 14px rgba(19, 32, 27, 0.06)',
    lg: '0px 14px 30px rgba(19, 32, 27, 0.18)',
    up: '0px -6px 24px rgba(19, 32, 27, 0.08)',
  },
  ...SHARED,
};

/** Thème sombre : mêmes jetons, valeurs adaptées. */
export const darkTheme: KordoTheme = {
  mode: 'dark',
  colors: {
    primary: { ...PRIMARY, lightest: '#2A2215', lighter: '#3A2C17', darker: '#FFB547' },
    secondary: {
      ...SECONDARY,
      lightest: '#122019',
      lighter: '#1F3A2E',
      light: '#6FD3A0',
      base: '#2E7D5B',
    },
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray: { lightest: '#232220', light: '#2F2E2B', base: '#A8A49C' },
    },
    background: '#0E0E0D',
    surface: '#191917',
    surfaceAlt: '#232220',
    border: '#2F2E2B',
    text: '#F5F3EE',
    textMuted: '#A8A49C',
    accentText: '#FFB547',
    soft: 'rgba(111, 211, 160, 0.14)',
    softText: '#6FD3A0',
    navBar: '#232220',
    navBarIcon: '#A8A49C',
    hero: ['#2E7D5B', '#173B2E'],
    track: '#3A3936',
    success: { base: '#6FD3A0', lighter: 'rgba(111, 211, 160, 0.14)' },
    error: { base: '#FF6B5E', lighter: 'rgba(255, 107, 94, 0.14)' },
    warning: { base: '#FFB547', lighter: 'rgba(255, 181, 71, 0.14)' },
    info: { base: '#8DB0FF', lighter: 'rgba(107, 155, 255, 0.14)' },
    boulderGrade: { ...BOULDER_GRADES, black: '#F5F3EE' },
    levels: LEVELS,
    overlay: { dark: 'rgba(0, 0, 0, 0.6)', light: 'rgba(255, 255, 255, 0.4)' },
  },
  shadows: {
    sm: '0px 0px 0px rgba(0, 0, 0, 0)',
    md: '0px 0px 0px rgba(0, 0, 0, 0)',
    lg: '0px 14px 30px rgba(0, 0, 0, 0.4)',
    up: '0px -6px 24px rgba(0, 0, 0, 0.3)',
  },
  ...SHARED,
};

/** Thème par défaut, conservé sous ce nom pour les imports existants. */
export const theme: KordoTheme = lightTheme;

export const themes: Record<ThemeMode, KordoTheme> = { light: lightTheme, dark: darkTheme };
