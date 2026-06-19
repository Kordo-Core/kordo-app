import { UserPublic } from 'core';

export interface CommentItem {
  id: string;
  user: UserPublic;
  content: string;
  createdAt: string;
}

export interface CommentsPanelProps {
  /** Ouvre / ferme le panneau */
  isOpen: boolean;
  onClose: () => void;
  /** Liste des commentaires à afficher */
  comments: CommentItem[];
  /** Utilisateur courant : affiche la zone de saisie en bas si fourni */
  currentUser?: UserPublic;
  /** Appelé quand l'utilisateur envoie un nouveau commentaire */
  onAddComment?: (content: string) => void;
  /** Clic sur l'auteur d'un commentaire */
  onPressUser?: (user: UserPublic) => void;
}
