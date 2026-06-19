import { PublicationPublic, UserPublic } from 'core';

export interface PublicationProps {
  /** Publication complète à afficher (tout est déjà joint/calculé) */
  publication: PublicationPublic;
  /** Utilisateur courant : affiche la zone de saisie d'un commentaire en bas du panneau */
  currentUser?: UserPublic;
  /** Clic sur l'utilisateur (header) → ouvrir son profil */
  onPressUser?: (user: UserPublic) => void;
  style?: any;
}
