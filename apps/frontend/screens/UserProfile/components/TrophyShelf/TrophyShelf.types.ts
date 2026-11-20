export interface TrophyShelfProps {
  /** "Mes Trophées" pour son propre profil, "Collection de trophées" pour un autre utilisateur. */
  title: string;
  /** Ouvre la liste complète des trophées */
  onPressAll?: () => void;
  /** Ouvre la page d'un trophée obtenu */
  onPressTrophy?: (trophyId: string) => void;
  /** Profil d'un autre grimpeur : seulement ses trophées obtenus, sans lien vers la liste */
  earnedOnly?: boolean;
}
