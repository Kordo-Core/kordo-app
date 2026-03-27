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
