import { UserPublic } from 'core';

export interface UserRowProps {
  user: UserPublic;
  /** Ouvre le profil de l'utilisateur de la ligne */
  onPressUser: (user: UserPublic) => void;
}
