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
