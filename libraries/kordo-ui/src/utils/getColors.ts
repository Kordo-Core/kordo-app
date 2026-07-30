import { theme } from '../theme';
import { AppearanceType, NeutralType, StatusType } from 'types/theme.types';

// Convertit un jeton sémantique d'apparence en sa couleur hexadécimale correspondante depuis le thème.
// Utilisé par les composants pour résoudre des noms logiques (ex: "primary", "error") en vraies valeurs CSS,
// ce qui centralise la correspondance et facilite les changements de thème.
// Retourne la couleur primaire par défaut si le jeton n'est pas reconnu.
export const getColor = (appearance: AppearanceType | NeutralType | StatusType): string => {
  switch (appearance) {
    case 'primary':
      return theme.colors.primary.base;
    case 'secondary':
      return theme.colors.secondary.base;
    case 'black':
      return theme.colors.neutral.black;
    case 'white':
      return theme.colors.neutral.white;
    case 'gray':
      return theme.colors.neutral.gray.base;
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

type ColorToken = (typeof APPEARANCE_TOKENS)[number];

const isColorToken = (value: string): value is ColorToken =>
  (APPEARANCE_TOKENS as readonly string[]).includes(value);

// Accepte indifféremment un jeton sémantique ("primary", "gray"…) ou une couleur brute
// ("#1B4332", "rgba(…)"). Les deux formes coexistent dans le code : les composants passent
// souvent `theme.colors.x.base`, les stories passent des jetons.
export const resolveColor = (color: string | undefined, fallback: string): string => {
  if (!color) return fallback;
  return isColorToken(color) ? getColor(color) : color;
};
