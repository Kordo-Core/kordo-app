import { UserPublic } from 'core';

export interface UserListProps {
  users: UserPublic[];
  /** Recherche en cours, saisie dans la barre de l'écran */
  query: string;
  /** Intitulé au-dessus de la liste, sans le compteur : "Tous les abonnements" */
  caption: string;
  /** Message affiché quand la liste est vide */
  emptyLabel: string;
}
