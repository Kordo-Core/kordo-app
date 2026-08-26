// Comparaison insensible à la casse et aux accents : "janja" doit trouver "Janja Garnbret",
// et "prea" trouver "Salle Préa".
const normalize = (value: string): string =>
  value
    .toLowerCase()
    // NFD sépare la lettre de son accent, la plage \u0300-\u036f couvre les accents ainsi isolés.
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/** La recherche est-elle vide, ou l'un des champs donnés la contient-il ? */
export const matchesQuery = (query: string, ...fields: (string | undefined)[]): boolean => {
  const needle = normalize(query.trim());
  if (!needle) return true;

  return fields.some((field) => !!field && normalize(field).includes(needle));
};
