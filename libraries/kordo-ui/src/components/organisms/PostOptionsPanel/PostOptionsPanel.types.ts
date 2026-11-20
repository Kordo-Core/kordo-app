import { UserPublic } from 'core';

export interface PostOptionsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  /** Auteur du post */
  author: UserPublic;
  /** Le post appartient à l'utilisateur courant : options de sa publication */
  isMine: boolean;
  /** Ligne sous le nom dans l'en-tête du panneau (« Le jaune du dévers · il y a 2 h ») */
  meta: string;
  /** Texte envoyé par « Partager » */
  shareMessage: string;
  /** Commentaires actuellement ouverts (libellé Désactiver / Réactiver) */
  commentsEnabled: boolean;
  onToggleComments?: () => void;
  onEdit?: () => void;
  /** Suppression confirmée */
  onDelete?: () => void;
  /** « Masquer cette publication » : la retirer du fil */
  onHide?: () => void;
  onUnfollow?: () => void;
  /** Blocage confirmé */
  onBlock?: () => void;
  /** Signalement envoyé (motif, précisions) */
  onReport?: (reason: string, details: string) => void;
}
