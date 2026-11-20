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
    /** Composantes RVB des voiles et ombres : `rgba(${scrim}, a)` (vert-noir en clair, noir en sombre) */
    scrim: string;
    /** Barre de navigation ancrée en bas d'écran */
    navBar: string;
    navBarIcon: string;
    /** Liseré haut de la barre (visible en sombre uniquement) */
    navBarBorder: string;
    /** Carré de l'onglet actif et son trait néon du bas */
    navBarActive: string;
    navBarActiveLine: string;
    /** Icône posée sur le bouton orange « + » */
    navBarAccentIcon: string;
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
  /** Tailles des titres « display » (Barlow Condensed italique, majuscules) */
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
    /** Police des titres display (toujours en majuscules, en italique) */
    display: string;
  };
};

const LEVELS = ['#FFE6D3', '#FFB27A', '#FF9A4D', '#FF7A1A', '#D9600F', '#B24A00'];

const BOULDER_GRADES: Record<BoulderGradeColor, string> = {
  yellow: '#F2C94C',
  green: '#27AE60',
  blue: '#2F80ED',
  red: '#EB4D5F',
  black: '#1C1A18',
  purple: '#9B51E0',
};

const PRIMARY: ColorScale = {
  lightest: '#FFF7F2',
  lighter: '#FFE6D3',
  light: '#FFB27A',
  base: '#FF7A1A',
  dark: '#E5650C',
  darker: '#B24A00',
  darkest: '#4A1D00',
};

const SECONDARY: ColorScale = {
  lightest: '#D9F7E9',
  lighter: '#D9F7E9',
  light: '#BFF5DB',
  base: '#00845A',
  dark: '#0B3D2C',
  darker: '#06261B',
  darkest: '#03170F',
};

const SHARED = {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 32 },
  fontSizes: { xs: 12, sm: 13, md: 15, lg: 17, xl: 22, xxl: 30 },
  // Barlow Condensed est plus étroite que l'ancienne police display : la maquette « sport »
  // agrandit chaque titre de 18 % (40 → 47, 24 → 28…), voir DISPLAY_SCALE.
  displaySizes: { xs: 24, sm: 28, md: 35, lg: 47, xl: 66, xxl: 85 },
  iconSizes: { sm: 20, md: 22, lg: 30 },
  avatarSizes: { sm: 40, md: 46, lg: 96 },
  borderRadius: { sm: 4, square: 6, card: 9, lg: 12, rounded: 999 },
  fonts: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semiBold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
    extraBold: 'PlusJakartaSans_800ExtraBold',
    display: 'BarlowCondensed_800ExtraBold_Italic',
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
      gray: { lightest: '#E7EBE9', light: '#DCE2DF', base: '#55625C' },
    },
    background: '#F1F3F2',
    surface: '#FFFFFF',
    surfaceAlt: '#E7EBE9',
    border: '#DCE2DF',
    text: '#0B1410',
    textMuted: '#55625C',
    accentText: '#B24A00',
    soft: '#D9F7E9',
    softText: '#00845A',
    scrim: '11, 20, 16',
    navBar: '#0B1410',
    navBarIcon: '#7F8C86',
    navBarBorder: 'transparent',
    navBarActive: '#00845A',
    navBarActiveLine: '#3DFFA8',
    navBarAccentIcon: '#0B1410',
    hero: ['#00845A', '#0B3D2C'],
    track: '#CDD5D1',
    success: { base: '#00845A', lighter: '#D9F7E9' },
    error: { base: '#D7263D', lighter: '#FDE7EA' },
    warning: { base: '#FF7A1A', lighter: '#FFF7F2' },
    info: { base: '#1F5BFF', lighter: '#E3EBFF' },
    boulderGrade: BOULDER_GRADES,
    levels: LEVELS,
    overlay: { dark: 'rgba(11, 20, 16, 0.5)', light: 'rgba(255, 255, 255, 0.5)' },
  },
  // Maquette « sport » : cartes et champs ne flottent plus, ils sont cernés d'un filet de 1 px.
  // Ombre intérieure plutôt que bordure : le filet ne décale pas le contenu.
  shadows: {
    sm: 'inset 0px 0px 0px 1px #DCE2DF',
    md: 'inset 0px 0px 0px 1px #DCE2DF',
    lg: '0px 14px 30px rgba(11, 20, 16, 0.18)',
    up: '0px -6px 24px rgba(11, 20, 16, 0.08)',
  },
  ...SHARED,
};

/** Thème sombre : mêmes jetons, valeurs adaptées. */
export const darkTheme: KordoTheme = {
  mode: 'dark',
  colors: {
    primary: { ...PRIMARY, lightest: '#2A160A', lighter: '#3A1E0C', darker: '#FF9A4D' },
    secondary: {
      ...SECONDARY,
      lightest: '#0F2A1F',
      lighter: '#0F2A1F',
      light: '#3DFFA8',
      base: '#00A36F',
    },
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray: { lightest: '#1A2420', light: '#24302B', base: '#8E9B95' },
    },
    background: '#070B09',
    surface: '#111815',
    surfaceAlt: '#1A2420',
    border: '#24302B',
    text: '#EEF3F0',
    textMuted: '#8E9B95',
    accentText: '#FF9A4D',
    soft: '#0F2A1F',
    softText: '#3DFFA8',
    scrim: '0, 0, 0',
    navBar: '#111815',
    navBarIcon: '#7F8C86',
    navBarBorder: '#24302B',
    navBarActive: '#00845A',
    navBarActiveLine: '#3DFFA8',
    navBarAccentIcon: '#070B09',
    hero: ['#00A36F', '#0B3D2C'],
    track: '#2A3530',
    success: { base: '#00A36F', lighter: '#0F2A1F' },
    error: { base: '#FF4D63', lighter: '#3A121A' },
    warning: { base: '#FF9A4D', lighter: '#3A1E0C' },
    info: { base: '#5C8CFF', lighter: '#122045' },
    boulderGrade: BOULDER_GRADES,
    levels: LEVELS,
    overlay: { dark: 'rgba(0, 0, 0, 0.6)', light: 'rgba(255, 255, 255, 0.4)' },
  },
  shadows: {
    sm: 'inset 0px 0px 0px 1px #24302B',
    md: 'inset 0px 0px 0px 1px #24302B',
    lg: '0px 14px 30px rgba(0, 0, 0, 0.4)',
    up: '0px -6px 24px rgba(0, 0, 0, 0.3)',
  },
  ...SHARED,
};

/**
 * Agrandissement des titres display de la maquette « sport » par rapport à l'ancienne
 * maquette : Barlow Condensed, plus étroite, est composée 18 % plus grand.
 */
export const DISPLAY_SCALE = 1.18;

/** Thème par défaut, conservé sous ce nom pour les imports existants. */
export const theme: KordoTheme = lightTheme;

export const themes: Record<ThemeMode, KordoTheme> = { light: lightTheme, dark: darkTheme };
