import { ActivityPublic, BoulderPublic } from 'core';

export interface ActivityProps {
  /** Séance complète à afficher (tout est déjà calculé/joint) */
  activity: ActivityPublic;
  /** Clic sur un bloc d'un panneau → ouvrir la salle (onglet blocs) sur ce bloc */
  onPressBloc?: (bloc: BoulderPublic) => void;
  style?: any;
}
