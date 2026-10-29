export interface TrophyShelfProps {
  /** "Mes Trophées" pour son propre profil, "Collection de trophées" pour un autre utilisateur. */
  title: string;
  /** Ouvre la liste complète des trophées */
  onPressAll?: () => void;
}
