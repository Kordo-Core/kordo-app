export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  // `core.autocrlf` est actif : la copie de travail est en CRLF sous Windows, le dépôt stocke
  // du LF. Sans `auto`, prettier signalerait un `␍` à supprimer sur chaque ligne du monorepo.
  endOfLine: 'auto',
};
