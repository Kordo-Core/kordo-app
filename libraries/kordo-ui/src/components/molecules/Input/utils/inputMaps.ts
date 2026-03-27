// Correspondance entre le type logique de l'input et le keyboardType React Native pour afficher le bon clavier
export const keyboardTypeMap = {
  email: 'email-address',
  number: 'numeric',
  password: 'default',
  default: 'default',
} as const;

// Correspondance entre le type logique de l'input et le textContentType React Native pour activer l'autocomplétion système
export const textContentTypeMap = {
  email: 'emailAddress',
  password: 'password',
  number: undefined,
  default: undefined,
} as const;
