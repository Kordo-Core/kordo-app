import { UserPublic } from './User';

// Vue frontend d'un post texte (tables post + text_post réunies).
// Regroupe tout ce qui est nécessaire à l'affichage du composant TextPost.
export type TextPostPublic = {
  id: string; // post.id = text_post.id
  user: UserPublic; // post.user_id → user, imbriqué
  content: string; // text_post.content
  createdAt: string; // post.created_at (ISO)

  // — interactions —
  likesEnabled: boolean; // l'auteur autorise-t-il les j'aime sur ce post ?
  commentsEnabled: boolean; // l'auteur autorise-t-il les commentaires sur ce post ?
  isLiked: boolean; // l'utilisateur courant a-t-il liké ce post ?
  likes: { id: string; user: UserPublic }[]; // like(post_id)
  comments: { id: string; user: UserPublic; content: string; createdAt: string }[]; // comment(post_id)
};
