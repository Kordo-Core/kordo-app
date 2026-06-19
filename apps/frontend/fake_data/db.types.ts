// Types calqués sur le schéma SQL (snake_case -> camelCase, DATE/TIMESTAMP -> string ISO).
// Données fictives uniquement, destinées à alimenter les interfaces de l'app.

export type PostType = 'activity' | 'publication' | 'text' | 'now';
export type MediaType = 'image' | 'video';
export type NotificationType =
  | 'follow' // a commencé à vous suivre
  | 'follow_accept' // a accepté votre demande de suivi
  | 'like_post' // a aimé votre publication
  | 'meet' // croisé en salle et présent sur Kordo
  | 'new_bloc'; // nouveau bloc ouvert dans une salle favorite

// Coordonnées (équivalent GEOGRAPHY(POINT,4326))
export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isSetter: boolean;
  avatarUrl: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  createdAt: string;
}

export interface GymRecord {
  id: string;
  brandId: string;
  name: string;
  location: GeoPoint;
  createdAt: string;
}

export interface Sector {
  id: string;
  gymId: string;
  /** Tracé SVG (attribut `d`) du polygone du secteur sur le plan de la salle. */
  path: string;
  createdAt: string;
}

export interface SettingSession {
  id: string;
  setterId: string;
  gymId: string;
  createdAt: string;
}

export interface Bloc {
  id: string;
  setterId?: string;
  gymId: string;
  settingSessionId: string;
  name?: string;
  grade: number;
  points: number;
  sectorId: string;
  /** Image de couverture du bloc. */
  blocUrl?: string;
  /** Description du bloc (style, mouvements clés, conseils de l'ouvreur). */
  description: string;
  createdAt: string;
}

export interface Top {
  id: string;
  userId: string;
  blocId: string;
  activityPostId?: string;
  isFlash: boolean;
  createdAt: string;
}

export interface BlocMedia {
  id: string;
  blocId: string;
  userId: string;
  /** URL de la vidéo de méthode. `bloc_media` ne contient que des vidéos de méthode. */
  url: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface BlocTag {
  id: string;
  blocId: string;
  tagId: string;
}

export interface GymRanking {
  id: string;
  gymId: string;
  userId: string;
  totalPoints: number;
  updatedAt: string;
}

export interface FavoriteGym {
  id: string;
  gymId: string;
  userId: string;
  createdAt: string;
}

export interface GymVisit {
  id: string;
  userId: string;
  gymId: string;
  createdAt: string;
}

export interface GymMeet {
  id: string;
  gymId: string;
  user1Id: string;
  user2Id: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  type: PostType;
  createdAt: string;
}

export interface ActivityPost {
  id: string; // = post.id
  gymId: string;
  title: string;
  description: string;
  likesEnabled: boolean;
  commentsEnabled: boolean;
}

export interface PublicationPost {
  id: string; // = post.id
  title: string;
  description: string;
  likesEnabled: boolean;
  commentsEnabled: boolean;
}

export interface PublicationMedia {
  id: string;
  postId: string;
  url: string;
  mediaType: MediaType;
}

export interface TextPost {
  id: string; // = post.id
  content: string;
  likesEnabled: boolean;
  commentsEnabled: boolean;
}

export interface NowPost {
  id: string; // = post.id
  gymId: string;
  createdAt: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  userId: string; // destinataire (utilisateur courant)
  actorId?: string; // auteur de l'action (absent pour new_bloc, qui concerne une salle)
  type: NotificationType;
  postId?: string; // like_post → publication concernée (pour la miniature)
  gymId?: string; // meet / new_bloc → salle concernée
  blocId?: string; // new_bloc → bloc ouvert (pour la miniature)
  isRead: boolean;
  createdAt: string;
}

// --- Vues dérivées prêtes pour l'UI ---

export type RankingTrend = 'up' | 'down' | 'same';

export interface RankingEntry {
  rank: number;
  user: User;
  totalPoints: number;
  trend: RankingTrend;
}

export interface BlocDetail {
  bloc: Bloc;
  setter?: User;
  sector: Sector;
  tags: Tag[];
}

export interface BlocMediaWithAuthor {
  media: BlocMedia;
  author?: User;
}
