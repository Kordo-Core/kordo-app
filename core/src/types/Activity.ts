import { UserPublic } from './User';
import { BoulderPublic } from './Boulder';

// Vue frontend complète d'une séance de grimpe (tables post + session_post, enrichies).
// Tout ce qu'il faut pour afficher une activité, sans requête ni calcul côté UI.
export type ActivityPublic = {
  id: string; // post.id = session_post.id
  user: UserPublic; // post.user_id
  gym: { id: string; name: string }; // session_post.gym_id → gym
  title: string; // session_post.title
  description: string; // session_post.description
  createdAt: string; // post.created_at (ISO)

  // — calculés automatiquement à la construction —
  blocks: BoulderPublic[]; // tops(session_post_id) → bloc
  maxGrade: { grade: number; count: number }; // grade max atteint + nb de blocs à ce grade
  meets: UserPublic[]; // users croisés entre la visite choisie et la suivante
  videos: { id: string; blocId: string; url: string }[]; // bloc_media de l'user sur les blocs validés

  // — interactions —
  likes: { id: string; user: UserPublic }[]; // like(post_id)
  comments: { id: string; user: UserPublic; content: string; createdAt: string }[]; // comment(post_id)
};
