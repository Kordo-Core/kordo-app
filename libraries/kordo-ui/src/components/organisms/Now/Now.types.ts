import { NowPublic, UserPublic } from 'core';

export interface NowProps {
  /** Publication "Now" à afficher (post + now_post) */
  now: NowPublic;
  /** Callback déclenché au tap sur l'avatar ou le nom de l'utilisateur */
  onPressUser?: (user: UserPublic) => void;
  /** Callback déclenché au tap sur le nom de la salle */
  onPressGym?: (gym: NowPublic['gym']) => void;
}
