import { UserPublic } from './User';

// Vue frontend d'une publication "Now" (tables post + now_post réunies).
// Regroupe tout ce qui est nécessaire à l'affichage du composant Now.
export type NowPublic = {
  id: string; // post.id = now_post.id
  user: UserPublic; // post.user_id → user, imbriqué
  gym: { id: string; name: string }; // now_post.gym_id → gym (id + nom)
  createdAt: string; // post.created_at (ISO)
};
