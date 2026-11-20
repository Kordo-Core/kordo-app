import { StyleProp, ViewStyle } from 'react-native';
import { NotificationPublic, UserPublic } from 'core';

export interface NotificationProps {
  /** Notification à afficher (acteur + contexte déjà joints) */
  notification: NotificationPublic;
  /** Clic sur l'utilisateur (avatar / nom) → ouvrir son profil */
  onPressUser?: (user: UserPublic) => void;
  /** Clic sur le bouton Follow / Following (types follow, follow_accept, meet) */
  onPressFollow?: (notification: NotificationPublic) => void;
  /** Clic sur le nom de la salle (type meet) */
  onPressGym?: (gymId: string) => void;
  /** État lu piloté par l'écran (par défaut : `notification.isRead`) */
  isRead?: boolean;
  /** Appui sur la carte : la marquer comme lue */
  onRead?: (notification: NotificationPublic) => void;
  style?: StyleProp<ViewStyle>;
}
