// Types calqués sur le schéma SQL (snake_case -> camelCase, DATE/TIMESTAMP -> string ISO).
// Données fictives uniquement, destinées à alimenter les interfaces de l'app.

export type PostType = 'session' | 'photo' | 'text' | 'now';
export type MediaType = 'image' | 'video';
export type NotificationType = 'like' | 'comment' | 'follow' | 'gym_meet' | 'message';

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
  createdAt: string;
}

export interface Top {
  id: string;
  userId: string;
  blocId: string;
  sessionPostId?: string;
  isFlash: boolean;
  createdAt: string;
}

export interface BlocMedia {
  id: string;
  topId: string;
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

export interface SessionPost {
  id: string; // = post.id
  gymId: string;
}

export interface PhotoPost {
  id: string; // = post.id
  description: string;
}

export interface PhotoMedia {
  id: string;
  postId: string;
  url: string;
  mediaType: MediaType;
}

export interface TextPost {
  id: string; // = post.id
  content: string;
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
  userId: string;
  type: NotificationType;
  content?: string;
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
