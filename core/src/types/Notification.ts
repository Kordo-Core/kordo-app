import { UserPublic } from './User';

// Type d'une notification (calqué sur la colonne `type` de la table notification).
export type NotificationKind =
  | 'follow' // a commencé à vous suivre
  | 'follow_accept' // a accepté votre demande de suivi
  | 'like_post' // a aimé votre publication
  | 'meet' // croisé en salle et présent sur Kordo
  | 'new_bloc'; // nouveau bloc ouvert dans une salle favorite

// Vue frontend d'une notification (table notification enrichie de l'acteur et du contexte).
// Tout ce qu'il faut pour afficher une Notification, sans requête côté UI.
export type NotificationPublic = {
  id: string;
  kind: NotificationKind;
  actor: UserPublic; // utilisateur qui a déclenché la notification
  createdAt: string; // ISO
  isRead: boolean;

  // — contexte selon le type —
  isFollowing?: boolean; // follow / follow_accept / meet → suit-on l'acteur en retour ?
  gym?: { id: string; name: string }; // meet / new_bloc → salle concernée
  thumbnailUrl?: string; // like_post → 1re image de la publication ; new_bloc → image du bloc
};

// Notifications regroupées par période pour l'affichage en sections.
export type NotificationSection = {
  key: string;
  title: string;
  items: NotificationPublic[];
};
