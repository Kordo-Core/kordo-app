import {
  Comment,
  FavoriteGym,
  Follow,
  GymMeet,
  GymVisit,
  Like,
  Message,
  NowPost,
  Notification,
  PhotoMedia,
  PhotoPost,
  Post,
  SessionPost,
  TextPost,
} from './db.types';
import { CURRENT_USER } from './users.fake';

// --- Posts (table "post" + sous-types par type) ---
export const POSTS: Post[] = [
  { id: 'post-1', userId: 'u-adam', type: 'session', createdAt: '2025-05-22T18:30:00Z' },
  { id: 'post-2', userId: 'u-emma', type: 'photo', createdAt: '2025-05-22T12:10:00Z' },
  { id: 'post-3', userId: 'u-leo', type: 'text', createdAt: '2025-05-21T20:05:00Z' },
  { id: 'post-4', userId: 'u-janja', type: 'now', createdAt: '2025-05-22T17:45:00Z' },
  { id: 'post-5', userId: 'u-hugo', type: 'photo', createdAt: '2025-05-20T09:30:00Z' },
  { id: 'post-6', userId: 'u-chloe', type: 'text', createdAt: '2025-05-19T19:00:00Z' },
  { id: 'post-7', userId: 'u-tomoa', type: 'session', createdAt: '2025-05-18T16:20:00Z' },
];

export const SESSION_POSTS: SessionPost[] = [
  { id: 'post-1', gymId: 'arkose-nation' },
  { id: 'post-7', gymId: 'arkose-pantin' },
];

export const PHOTO_POSTS: PhotoPost[] = [
  { id: 'post-2', description: 'Premier 7a en flash 🔥 trop content !' },
  { id: 'post-5', description: 'Belle séance dévers ce matin' },
];

export const PHOTO_MEDIA: PhotoMedia[] = [
  {
    id: 'media-1',
    postId: 'post-2',
    url: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
    mediaType: 'image',
  },
  {
    id: 'media-2',
    postId: 'post-5',
    url: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80',
    mediaType: 'image',
  },
];

export const TEXT_POSTS: TextPost[] = [
  { id: 'post-3', content: 'Quelqu’un pour grimper à Pantin demain soir ?' },
  { id: 'post-6', content: 'Les nouvelles ouvertures à Nation sont incroyables 😍' },
];

export const NOW_POSTS: NowPost[] = [
  { id: 'post-4', gymId: 'arkose-nation', createdAt: '2025-05-22T17:45:00Z' },
];

// --- Likes ---
export const LIKES: Like[] = [
  { id: 'like-1', userId: 'u-leo', postId: 'post-2', createdAt: '2025-05-22T12:20:00Z' },
  { id: 'like-2', userId: 'u-emma', postId: 'post-2', createdAt: '2025-05-22T12:25:00Z' },
  { id: 'like-3', userId: 'u-hugo', postId: 'post-1', createdAt: '2025-05-22T18:40:00Z' },
  { id: 'like-4', userId: CURRENT_USER.id, postId: 'post-2', createdAt: '2025-05-22T13:00:00Z' },
  { id: 'like-5', userId: 'u-chloe', postId: 'post-7', createdAt: '2025-05-18T17:00:00Z' },
];

// --- Commentaires ---
export const COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    userId: 'u-leo',
    postId: 'post-2',
    content: 'Énorme 💪',
    createdAt: '2025-05-22T12:30:00Z',
  },
  {
    id: 'comment-2',
    userId: 'u-hugo',
    postId: 'post-2',
    content: 'Bien joué !',
    createdAt: '2025-05-22T12:35:00Z',
  },
  {
    id: 'comment-3',
    userId: 'u-emma',
    postId: 'post-3',
    content: 'Moi je suis dispo !',
    createdAt: '2025-05-21T20:30:00Z',
  },
];

// --- Follows ---
export const FOLLOWS: Follow[] = [
  { id: 'f-1', followerId: CURRENT_USER.id, followingId: 'u-adam', createdAt: '2025-01-20' },
  { id: 'f-2', followerId: CURRENT_USER.id, followingId: 'u-janja', createdAt: '2025-02-01' },
  { id: 'f-3', followerId: CURRENT_USER.id, followingId: 'u-emma', createdAt: '2025-03-10' },
  { id: 'f-4', followerId: 'u-emma', followingId: CURRENT_USER.id, createdAt: '2025-03-12' },
  { id: 'f-5', followerId: 'u-hugo', followingId: CURRENT_USER.id, createdAt: '2025-04-02' },
  { id: 'f-6', followerId: 'u-adam', followingId: 'u-janja', createdAt: '2024-12-01' },
];

// --- Messages ---
export const MESSAGES: Message[] = [
  {
    id: 'msg-1',
    senderId: 'u-emma',
    receiverId: CURRENT_USER.id,
    content: 'Salut ! On grimpe ce soir à Nation ?',
    createdAt: '2025-05-22T16:00:00Z',
    isRead: true,
  },
  {
    id: 'msg-2',
    senderId: CURRENT_USER.id,
    receiverId: 'u-emma',
    content: 'Carrément, 19h ça te va ?',
    createdAt: '2025-05-22T16:05:00Z',
    isRead: true,
  },
  {
    id: 'msg-3',
    senderId: 'u-emma',
    receiverId: CURRENT_USER.id,
    content: 'Parfait, à toute 🙌',
    createdAt: '2025-05-22T16:06:00Z',
    isRead: false,
  },
];

// --- Notifications ---
export const NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: CURRENT_USER.id,
    type: 'like',
    content: 'Emma a aimé votre photo',
    isRead: false,
    createdAt: '2025-05-22T12:25:00Z',
  },
  {
    id: 'notif-2',
    userId: CURRENT_USER.id,
    type: 'follow',
    content: 'Hugo a commencé à vous suivre',
    isRead: false,
    createdAt: '2025-05-22T10:00:00Z',
  },
  {
    id: 'notif-3',
    userId: CURRENT_USER.id,
    type: 'comment',
    content: 'Léo a commenté votre post',
    isRead: true,
    createdAt: '2025-05-21T20:35:00Z',
  },
];

// --- Rencontres en salle (table "gym_meet") ---
export const GYM_MEETS: GymMeet[] = [
  {
    id: 'meet-1',
    gymId: 'arkose-nation',
    user1Id: CURRENT_USER.id,
    user2Id: 'u-emma',
    createdAt: '2025-05-15T19:30:00Z',
  },
];

// --- Salles favorites & visites ---
export const FAVORITE_GYMS_DB: FavoriteGym[] = [
  { id: 'fav-1', userId: CURRENT_USER.id, gymId: 'arkose-nation', createdAt: '2025-02-01' },
  { id: 'fav-2', userId: CURRENT_USER.id, gymId: 'arkose-pantin', createdAt: '2025-03-15' },
  { id: 'fav-3', userId: CURRENT_USER.id, gymId: 'climbup-paris', createdAt: '2025-04-20' },
];

export const GYM_VISITS: GymVisit[] = [
  { id: 'visit-1', userId: CURRENT_USER.id, gymId: 'arkose-nation', createdAt: '2025-05-22' },
  { id: 'visit-2', userId: CURRENT_USER.id, gymId: 'arkose-pantin', createdAt: '2025-05-20' },
  { id: 'visit-3', userId: CURRENT_USER.id, gymId: 'arkose-montreuil', createdAt: '2025-05-18' },
];

// --- Helpers ---
export const getPostLikeCount = (postId: string): number =>
  LIKES.filter((l) => l.postId === postId).length;

export const getPostComments = (postId: string): Comment[] =>
  COMMENTS.filter((c) => c.postId === postId);

export const getUnreadNotificationCount = (userId: string): number =>
  NOTIFICATIONS.filter((n) => n.userId === userId && !n.isRead).length;

export const getConversationWith = (otherUserId: string): Message[] =>
  MESSAGES.filter(
    (m) =>
      (m.senderId === CURRENT_USER.id && m.receiverId === otherUserId) ||
      (m.senderId === otherUserId && m.receiverId === CURRENT_USER.id),
  ).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
