import {
  Bloc,
  BlocMedia,
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
  Top,
  TextPost,
  User,
} from './db.types';
import { ActivityPublic, BoulderPublic, NowPublic, UserPublic } from 'core';
import { CURRENT_USER, USERS } from './users.fake';
import { GYMS } from './gyms.fake';
import { BLOCS, BLOC_MEDIA, TOPS } from './climbing.fake';

// --- Posts (table "post" + sous-types par type) ---
export const POSTS: Post[] = [
  { id: 'post-1', userId: 'u-adam', type: 'session', createdAt: '2025-05-22T18:30:00Z' },
  { id: 'post-2', userId: 'u-emma', type: 'photo', createdAt: '2025-05-22T12:10:00Z' },
  { id: 'post-3', userId: 'u-leo', type: 'text', createdAt: '2025-05-21T20:05:00Z' },
  { id: 'post-4', userId: 'u-janja', type: 'now', createdAt: '2025-05-22T17:45:00Z' },
  { id: 'post-5', userId: 'u-hugo', type: 'photo', createdAt: '2025-05-20T09:30:00Z' },
  { id: 'post-6', userId: 'u-chloe', type: 'text', createdAt: '2025-05-19T19:00:00Z' },
  { id: 'post-7', userId: 'u-tomoa', type: 'session', createdAt: '2025-05-18T16:20:00Z' },
  { id: 'post-8', userId: 'u-emma', type: 'now', createdAt: '2025-05-22T18:10:00Z' },
  { id: 'post-9', userId: 'u-hugo', type: 'now', createdAt: '2025-05-22T16:55:00Z' },
  { id: 'post-10', userId: 'u-adam', type: 'now', createdAt: '2025-05-22T15:30:00Z' },
];

export const SESSION_POSTS: SessionPost[] = [
  {
    id: 'post-1',
    gymId: 'arkose-nation',
    title: 'Séance force avant la compétition de samedi',
    description:
      "Super séance avec l'eki team, découverte de Arkose Nation, super salle ! J'espère y retourner rapidement pour réussir les derniers blocs.",
  },
  {
    id: 'post-7',
    gymId: 'arkose-pantin',
    title: 'Petite session récup à Pantin',
    description: 'Séance tranquille pour récupérer, focus sur la technique et les pieds.',
  },
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
  { id: 'post-8', gymId: 'arkose-pantin', createdAt: '2025-05-22T18:10:00Z' },
  { id: 'post-9', gymId: 'climbup-paris', createdAt: '2025-05-22T16:55:00Z' },
  { id: 'post-10', gymId: 'blockout-paris', createdAt: '2025-05-22T15:30:00Z' },
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

// L'utilisateur courant suit-il `userId` ?
const isFollowedByCurrentUser = (userId: string): boolean =>
  FOLLOWS.some((f) => f.followerId === CURRENT_USER.id && f.followingId === userId);

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
  // Rencontres d'Adam pendant sa séance à Arkose Nation (alimente le bandeau "meets")
  { id: 'meet-adam-1', gymId: 'arkose-nation', user1Id: 'u-adam', user2Id: 'u-emma', createdAt: '2025-05-22T18:05:00Z' },
  { id: 'meet-adam-2', gymId: 'arkose-nation', user1Id: 'u-adam', user2Id: 'u-leo', createdAt: '2025-05-22T18:20:00Z' },
  { id: 'meet-adam-3', gymId: 'arkose-nation', user1Id: 'u-hugo', user2Id: 'u-adam', createdAt: '2025-05-22T18:40:00Z' },
  { id: 'meet-adam-4', gymId: 'arkose-nation', user1Id: 'u-adam', user2Id: 'u-chloe', createdAt: '2025-05-22T19:00:00Z' },
  { id: 'meet-adam-5', gymId: 'arkose-nation', user1Id: 'u-janja', user2Id: 'u-adam', createdAt: '2025-05-22T19:10:00Z' },
  { id: 'meet-adam-6', gymId: 'arkose-nation', user1Id: 'u-adam', user2Id: 'u-tomoa', createdAt: '2025-05-22T19:20:00Z' },
  { id: 'meet-adam-7', gymId: 'arkose-nation', user1Id: 'u-adam', user2Id: 'u-shauna', createdAt: '2025-05-22T19:30:00Z' },
  { id: 'meet-adam-8', gymId: 'arkose-nation', user1Id: 'u-nina', user2Id: 'u-adam', createdAt: '2025-05-22T19:40:00Z' },
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
  // Visites d'Adam : définissent la fenêtre de sa séance à Arkose Nation
  { id: 'visit-adam-1', userId: 'u-adam', gymId: 'arkose-nation', createdAt: '2025-05-22T16:00:00Z' },
  { id: 'visit-adam-2', userId: 'u-adam', gymId: 'arkose-nation', createdAt: '2025-05-26T10:00:00Z' },
];

// --- Helpers ---
export const getPostLikeCount = (postId: string): number =>
  LIKES.filter((l) => l.postId === postId).length;

export const getPostComments = (postId: string): Comment[] =>
  COMMENTS.filter((c) => c.postId === postId);

export const getUnreadNotificationCount = (userId: string): number =>
  NOTIFICATIONS.filter((n) => n.userId === userId && !n.isRead).length;

/** Feed des publications "Now" (post + now_post), enrichies de l'utilisateur et de la salle. */
export function getNowFeed(): NowPublic[] {
  return POSTS.filter((p) => p.type === 'now')
    .map((post): NowPublic | null => {
      const now = NOW_POSTS.find((n) => n.id === post.id);
      const user = USERS.find((u) => u.id === post.userId);
      const gym = GYMS.find((g) => g.id === now?.gymId);
      if (!now || !user || !gym) return null;
      return {
        id: post.id,
        user,
        gym: { id: gym.id, name: gym.name },
        createdAt: post.createdAt,
      };
    })
    .filter((n): n is NowPublic => n !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// --- Construction des activités (séances) ---

// L'utilisateur courant a-t-il validé ce bloc (top) ? Indépendant de l'auteur du post.
const isValidatedByCurrentUser = (blocId: string): boolean =>
  TOPS.some((t) => t.userId === CURRENT_USER.id && t.blocId === blocId);

const toBoulderPublic = (bloc: Bloc): BoulderPublic => ({
  id: bloc.id,
  setter: USERS.find((u) => u.id === bloc.setterId),
  name: bloc.name,
  grade: bloc.grade,
  points: bloc.points,
  blocUrl: bloc.blocUrl,
  createdAt: bloc.createdAt,
  isValidated: isValidatedByCurrentUser(bloc.id),
});

// Tops rattachés à un session_post = blocs validés pendant la séance
const buildSessionTops = (sessionPostId: string, userId: string, gymId: string, n: number): Top[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${sessionPostId}-top-${i + 1}`,
    userId,
    blocId: `${gymId}-bloc-${i + 1}`,
    sessionPostId,
    isFlash: i % 4 === 0,
    createdAt: '2025-05-22T18:30:00Z',
  }));

export const SESSION_TOPS: Top[] = [
  ...buildSessionTops('post-1', 'u-adam', 'arkose-nation', 24),
  ...buildSessionTops('post-7', 'u-tomoa', 'arkose-pantin', 12),
];

// Quelques vidéos garanties pour la démo (bloc_media de l'ouvreur de la séance)
const ACTIVITY_VIDEO_URLS = [
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  'https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4',
  'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
];
const EXTRA_BLOC_MEDIA: BlocMedia[] = Array.from({ length: 5 }, (_, i) => ({
  id: `am-${i + 1}`,
  blocId: `arkose-nation-bloc-${i + 1}`,
  userId: 'u-adam',
  url: ACTIVITY_VIDEO_URLS[i % ACTIVITY_VIDEO_URLS.length],
  createdAt: '2025-05-22T18:30:00Z',
}));

/** Feed des activités (post de type "session"), entièrement assemblé pour l'UI. */
export function getActivityFeed(): ActivityPublic[] {
  const allMedia = [...BLOC_MEDIA, ...EXTRA_BLOC_MEDIA];

  return POSTS.filter((p) => p.type === 'session')
    .map((post): ActivityPublic | null => {
      const session = SESSION_POSTS.find((s) => s.id === post.id);
      const user = USERS.find((u) => u.id === post.userId);
      const gym = session ? GYMS.find((g) => g.id === session.gymId) : undefined;
      if (!session || !user || !gym) return null;

      // Blocs validés pendant la séance (tops liés au session_post)
      const blocks: BoulderPublic[] = SESSION_TOPS.filter((t) => t.sessionPostId === post.id)
        .map((t) => BLOCS.find((b) => b.id === t.blocId))
        .filter((b): b is Bloc => !!b)
        .map(toBoulderPublic);

      // Grade max atteint + nombre de blocs à ce grade
      const grades = blocks.map((b) => b.grade);
      const grade = grades.length ? Math.max(...grades) : 0;
      const maxGrade = { grade, count: grades.filter((g) => g === grade).length };

      // Users croisés entre la visite choisie et la suivante
      const userVisits = GYM_VISITS.filter((v) => v.userId === user.id).sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt),
      );
      const visitIdx = userVisits.findIndex((v) => v.gymId === gym.id);
      const start = userVisits[visitIdx]?.createdAt ?? post.createdAt;
      const end = userVisits[visitIdx + 1]?.createdAt ?? '9999';
      const meets: UserPublic[] = GYM_MEETS.filter(
        (m) =>
          (m.user1Id === user.id || m.user2Id === user.id) &&
          m.createdAt >= start &&
          m.createdAt < end,
      )
        .map((m) => USERS.find((u) => u.id === (m.user1Id === user.id ? m.user2Id : m.user1Id)))
        .filter((u): u is User => !!u)
        // isFollowing : l'utilisateur courant suit-il ce grimpeur croisé ?
        .map((u) => ({ ...u, isFollowing: isFollowedByCurrentUser(u.id) }));

      // Vidéos publiées par l'user sur les blocs de la séance
      const blockIds = new Set(blocks.map((b) => b.id));
      const videos = allMedia
        .filter((m) => m.userId === user.id && blockIds.has(m.blocId))
        .map((m) => ({ id: m.id, blocId: m.blocId, url: m.url }));

      const likes = LIKES.filter((l) => l.postId === post.id)
        .map((l) => ({ id: l.id, user: USERS.find((u) => u.id === l.userId) }))
        .filter((x): x is { id: string; user: User } => !!x.user);

      const comments = COMMENTS.filter((c) => c.postId === post.id)
        .map((c) => ({
          id: c.id,
          user: USERS.find((u) => u.id === c.userId),
          content: c.content,
          createdAt: c.createdAt,
        }))
        .filter(
          (x): x is { id: string; user: User; content: string; createdAt: string } => !!x.user,
        );

      return {
        id: post.id,
        user,
        gym: { id: gym.id, name: gym.name },
        title: session.title,
        description: session.description,
        createdAt: post.createdAt,
        blocks,
        maxGrade,
        meets,
        videos,
        likes,
        comments,
      };
    })
    .filter((a): a is ActivityPublic => a !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const getConversationWith = (otherUserId: string): Message[] =>
  MESSAGES.filter(
    (m) =>
      (m.senderId === CURRENT_USER.id && m.receiverId === otherUserId) ||
      (m.senderId === otherUserId && m.receiverId === CURRENT_USER.id),
  ).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
