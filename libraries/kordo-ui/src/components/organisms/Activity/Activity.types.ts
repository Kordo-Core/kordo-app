import { ActivityPublic, BoulderPublic, UserPublic } from 'core';

export interface ActivityProps {
  /** Séance complète à afficher (tout est déjà calculé/joint) */
  activity: ActivityPublic;
  /** Utilisateur courant : affiche la zone de saisie d'un commentaire dans le panneau */
  currentUser?: UserPublic;
  /** Clic sur un bloc d'un panneau → ouvrir la salle (onglet blocs) sur ce bloc */
  onPressBloc?: (bloc: BoulderPublic) => void;
  /** Clic sur l'utilisateur (header / auteur d'un commentaire) */
  onPressUser?: (user: UserPublic) => void;
  style?: any;
}
