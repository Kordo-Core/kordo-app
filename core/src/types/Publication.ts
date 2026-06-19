import { UserPublic } from './User';

// Vue frontend d'une publication (tables post + publication_post + publication_media réunies).
// Regroupe tout ce qui est nécessaire à l'affichage du composant Publication.
export type PublicationPublic = {
  id: string; // post.id = publication_post.id
  user: UserPublic; // post.user_id → user, imbriqué
  title: string; // publication_post.title
  description: string; // publication_post.description
  createdAt: string; // post.created_at (ISO)

  // — médias —
  photos: { id: string; url: string }[]; // publication_media (image), 1..10

  // — interactions —
  likesEnabled: boolean; // l'auteur autorise-t-il les j'aime sur ce post ?
  commentsEnabled: boolean; // l'auteur autorise-t-il les commentaires sur ce post ?
  isLiked: boolean; // l'utilisateur courant a-t-il liké ce post ?
  likes: { id: string; user: UserPublic }[]; // like(post_id)
  comments: { id: string; user: UserPublic; content: string; createdAt: string }[]; // comment(post_id)
};
