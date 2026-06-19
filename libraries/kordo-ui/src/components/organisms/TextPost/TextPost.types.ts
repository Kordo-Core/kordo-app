import { TextPostPublic, UserPublic } from 'core';

export interface TextPostProps {
  /** Post texte complet à afficher (tout est déjà joint) */
  textPost: TextPostPublic;
  /** Utilisateur courant : affiche la zone de saisie d'un commentaire dans le panneau */
  currentUser?: UserPublic;
  /** Clic sur l'utilisateur (header) → ouvrir son profil */
  onPressUser?: (user: UserPublic) => void;
  style?: any;
}
