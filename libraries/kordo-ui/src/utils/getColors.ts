import { KordoTheme } from '../theme';
import { AppearanceType, NeutralType, StatusType } from '../types/theme.types';

export type ColorToken = AppearanceType | NeutralType | StatusType;

// Convertit un jeton sémantique d'apparence en sa couleur du thème.
// Le thème est passé en paramètre, jamais importé : c'est ce qui fait que la résolution suit
// le `ThemeProvider`. Dans un styled il vient de `props.theme`, dans un composant de `useTheme()`.
// Retourne la couleur primaire par défaut si le jeton n'est pas reconnu.
export const getColor = (theme: KordoTheme, appearance: ColorToken): string => {
  switch (appearance) {
    case 'primary':
      return theme.colors.primary.base;
    case 'secondary':
      return theme.colors.secondary.base;
    case 'black':
      // « black » désigne le texte principal : foncé en thème clair, clair en thème sombre.
      return theme.colors.text;
    case 'white':
      return theme.colors.neutral.white;
    case 'gray':
      return theme.colors.textMuted;
    case 'success':
      return theme.colors.success.base;
    case 'error':
      return theme.colors.error.base;
    case 'warning':
      return theme.colors.warning.base;
    case 'info':
      return theme.colors.info.base;
    default:
      return theme.colors.primary.base;
  }
};

const APPEARANCE_TOKENS = [
  'primary',
  'secondary',
  'black',
  'white',
  'gray',
  'success',
  'error',
  'warning',
  'info',
] as const;

const isColorToken = (value: string): value is ColorToken =>
  (APPEARANCE_TOKENS as readonly string[]).includes(value);

// Accepte indifféremment un jeton sémantique ("primary", "gray"…) ou une couleur brute
// ("#1B4332", "rgba(…)"). Les deux formes coexistent dans le code : les composants passent
// souvent `theme.colors.x.base`, les stories passent des jetons.
export const resolveColor = (
  theme: KordoTheme,
  color: string | undefined,
  fallback: string,
): string => {
  if (!color) return fallback;
  return isColorToken(color) ? getColor(theme, color) : color;
};

// Couleur du texte et des icônes posés sur un fond de l'apparence donnée. L'orange (primary,
// warning) est trop clair pour du blanc : on y pose l'encre foncée, comme sur la maquette.
export const getOnColor = (theme: KordoTheme, appearance: ColorToken): string => {
  switch (appearance) {
    case 'primary':
    case 'warning':
      return '#13201B';
    case 'white':
      return '#13201B';
    case 'black':
      return theme.colors.background;
    default:
      return theme.colors.neutral.white;
  }
};
