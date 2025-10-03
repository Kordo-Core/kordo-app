import { Theme } from '@emotion/react';

export const keyboardTypeMap = {
  email: 'email-address',
  number: 'numeric',
  password: 'default',
  default: 'default',
} as const;

export const textContentTypeMap = {
  email: 'emailAddress',
  password: 'password',
  number: undefined,
  default: undefined,
} as const;

//TODO pas utilisé pour l'instant
export const iconColorMap = (theme: Theme) => ({
  default: theme.colors.neutral.grey,
  error: theme.colors.error,
  success: theme.colors.secondary.color500,
  focused: theme.colors.primary.color500,
});
