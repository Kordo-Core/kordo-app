import { NotificationPublic, UserPublic } from 'core';

export interface NotificationItemProps {
  /** Notification à afficher (acteur + contexte déjà joints) */
  notification: NotificationPublic;
  /** Clic sur l'utilisateur (avatar / nom) → ouvrir son profil */
  onPressUser?: (user: UserPublic) => void;
  /** Clic sur le bouton Follow / Following (types follow, follow_accept, meet) */
  onPressFollow?: (notification: NotificationPublic) => void;
  /** Clic sur le nom de la salle (type meet) */
  onPressGym?: (gymId: string) => void;
  style?: any;
}
