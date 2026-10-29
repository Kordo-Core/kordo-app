/** Onglet affiché par l'écran des listes du profil. Sert aussi de paramètre de route. */
export type RelationPivot = 'followers' | 'following' | 'activities' | 'gyms';

// Ordre d'affichage des pivots, libellé associé et placeholder de la barre de recherche.
// `Pivots` travaille sur des libellés, la route sur des clés : cette table fait la
// correspondance dans les deux sens.
export const RELATION_PIVOTS: {
  key: RelationPivot;
  label: string;
  searchPlaceholder: string;
}[] = [
  { key: 'followers', label: 'Followers', searchPlaceholder: 'Rechercher un abonné...' },
  { key: 'following', label: 'Suivi(e)s', searchPlaceholder: 'Rechercher un abonnement...' },
  { key: 'activities', label: 'Activités', searchPlaceholder: 'Rechercher une séance...' },
  { key: 'gyms', label: 'Salles visitées', searchPlaceholder: 'Rechercher une salle...' },
];

const getPivot = (key: RelationPivot) =>
  RELATION_PIVOTS.find((p) => p.key === key) ?? RELATION_PIVOTS[0];

export const getPivotLabel = (key: RelationPivot): string => getPivot(key).label;

export const getPivotPlaceholder = (key: RelationPivot): string => getPivot(key).searchPlaceholder;

export const getPivotKey = (label: string): RelationPivot =>
  RELATION_PIVOTS.find((p) => p.label === label)?.key ?? RELATION_PIVOTS[0].key;

/** Props communes aux quatre onglets : chacun charge ses données et filtre sur la recherche. */
export interface RelationTabProps {
  userId: string;
  /** Saisie de la barre de recherche, tenue par l'écran et partagée par les quatre onglets */
  query: string;
}
