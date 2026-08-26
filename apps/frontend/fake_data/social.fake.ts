import {
  ActivityPost,
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
  Post,
  PublicationMedia,
  PublicationPost,
  Top,
  TextPost,
  User,
} from './db.types';
import {
  ActivityPublic,
  BoulderPublic,
  NotificationKind,
  NotificationPublic,
  NotificationSection,
  NowPublic,
  PublicationPublic,
  TextPostPublic,
  UserPublic,
} from 'core';
import { CURRENT_USER, USERS } from './users.fake';
import { GYMS, Gym } from './gyms.fake';
import { BLOCS, BLOC_MEDIA, TOPS } from './climbing.fake';

// --- Posts (table "post" + sous-types par type) ---
export const POSTS: Post[] = [
  { id: 'post-1', userId: 'u-adam', type: 'activity', createdAt: '2025-05-22T18:30:00Z' },
  { id: 'post-2', userId: 'u-emma', type: 'publication', createdAt: '2025-05-22T12:10:00Z' },
  { id: 'post-3', userId: 'u-leo', type: 'text', createdAt: '2025-05-21T20:05:00Z' },
  { id: 'post-4', userId: 'u-janja', type: 'now', createdAt: '2025-05-22T17:45:00Z' },
  { id: 'post-5', userId: 'u-hugo', type: 'publication', createdAt: '2025-05-20T09:30:00Z' },
  { id: 'post-6', userId: 'u-chloe', type: 'text', createdAt: '2025-05-19T19:00:00Z' },
  { id: 'post-7', userId: 'u-tomoa', type: 'activity', createdAt: '2025-05-18T16:20:00Z' },
  { id: 'post-8', userId: 'u-emma', type: 'now', createdAt: '2025-05-22T18:10:00Z' },
  { id: 'post-9', userId: 'u-hugo', type: 'now', createdAt: '2025-05-22T16:55:00Z' },
  { id: 'post-10', userId: 'u-adam', type: 'now', createdAt: '2025-05-22T15:30:00Z' },
];

export const ACTIVITY_POSTS: ActivityPost[] = [
  {
    id: 'post-1',
    gymId: 'arkose-nation',
    title: 'Séance force avant la compétition de samedi',
    description:
      "Super séance avec l'eki team, découverte de Arkose Nation, super salle ! J'espère y retourner rapidement pour réussir les derniers blocs.",
    likesEnabled: true,
    commentsEnabled: true,
  },
  {
    id: 'post-7',
    gymId: 'arkose-pantin',
    title: 'Petite session récup à Pantin',
    description: 'Séance tranquille pour récupérer, focus sur la technique et les pieds.',
    likesEnabled: true,
    commentsEnabled: true,
  },
];

export const PUBLICATION_POSTS: PublicationPost[] = [
  {
    id: 'post-2',
    title: 'Premier 7a en flash',
    description: 'Premier 7a en flash 🔥 trop content !',
    likesEnabled: true,
    commentsEnabled: true,
  },
  {
    id: 'post-5',
    title: 'Séance dévers matinale',
    description: 'Belle séance dévers ce matin',
    likesEnabled: true,
    commentsEnabled: true,
  },
];

// URLs Unsplash (escalade / bloc) pour démontrer le carrousel de photos
const PUBLICATION_PHOTO_URLS = [
  'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
  'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80',
  'https://images.unsplash.com/photo-1516592673884-4a382d1124c2?w=800&q=80',
  'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80',
];

export const PUBLICATION_MEDIA: PublicationMedia[] = [
  // post-2 : 5 photos
  ...PUBLICATION_PHOTO_URLS.slice(0, 5).map(
    (url, i): PublicationMedia => ({
      id: `media-2-${i + 1}`,
      postId: 'post-2',
      url,
      mediaType: 'image',
    }),
  ),
  // post-5 : 4 photos
  ...PUBLICATION_PHOTO_URLS.slice(1, 5).map(
    (url, i): PublicationMedia => ({
      id: `media-5-${i + 1}`,
      postId: 'post-5',
      url,
      mediaType: 'image',
    }),
  ),
];

export const TEXT_POSTS: TextPost[] = [
  {
    id: 'post-3',
    content: 'Quelqu’un pour grimper à Pantin demain soir ?',
    likesEnabled: true,
    commentsEnabled: true,
  },
  {
    id: 'post-6',
    content: 'Les nouvelles ouvertures à Nation sont incroyables 😍',
    likesEnabled: true,
    commentsEnabled: true,
  },
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
    content:
      "Énorme ce flash 💪 j'étais sur le même bloc la semaine dernière et je galère encore sur le mouvement de fin, tu peux m'expliquer comment tu as géré la sortie ?",
    createdAt: '2025-05-22T12:30:00Z',
  },
  {
    id: 'comment-2',
    userId: 'u-hugo',
    postId: 'post-2',
    content:
      'Bien joué ! La progression depuis le mois dernier est impressionnante, ça paye de venir aussi régulièrement. On se fait une session ensemble bientôt à Nation ?',
    createdAt: '2025-05-22T12:35:00Z',
  },
  {
    id: 'comment-4',
    userId: 'u-chloe',
    postId: 'post-2',
    content:
      "Trop fort, ce dévers est vraiment retors avec les petites pinces. Bravo, tu mérites largement ce premier 7a, surtout en flash c'est une grosse perf !",
    createdAt: '2025-05-22T13:05:00Z',
  },
  {
    id: 'comment-5',
    userId: 'u-tomoa',
    postId: 'post-5',
    content:
      'Belle séance ! Les nouveaux blocs en dévers de ce secteur sont vraiment exigeants pour les avant-bras, faut bien penser à relâcher entre chaque prise sinon on explose à mi-parcours.',
    createdAt: '2025-05-20T10:15:00Z',
  },
  {
    id: 'comment-6',
    userId: 'u-sarah',
    postId: 'post-5',
    content:
      "J'adore l'ambiance de cette salle le matin, beaucoup moins de monde et on peut vraiment travailler les projets tranquillement. Tu y vas souvent en semaine ?",
    createdAt: '2025-05-20T11:00:00Z',
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
export const isFollowedByCurrentUser = (userId: string): boolean =>
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
// Dates relatives à "maintenant" pour alimenter les sections par période (démo).
const hoursAgo = (h: number): string => new Date(Date.now() - h * 3600_000).toISOString();
const daysAgo = (d: number): string => hoursAgo(d * 24);

export const NOTIFICATIONS: Notification[] = [
  // — Aujourd'hui (non lues) —
  {
    id: 'notif-0',
    userId: CURRENT_USER.id,
    type: 'new_bloc',
    gymId: 'arkose-nation', // salle en favoris (cf. FAVORITE_GYMS_DB)
    blocId: 'arkose-nation-bloc-3',
    isRead: false,
    createdAt: hoursAgo(1),
  },
  {
    id: 'notif-1',
    userId: CURRENT_USER.id,
    actorId: 'u-emma',
    type: 'follow',
    isRead: false,
    createdAt: hoursAgo(2),
  },
  {
    id: 'notif-2',
    userId: CURRENT_USER.id,
    actorId: 'u-hugo',
    type: 'follow_accept',
    isRead: false,
    createdAt: hoursAgo(5),
  },
  {
    id: 'notif-3',
    userId: CURRENT_USER.id,
    actorId: 'u-tomoa',
    type: 'meet',
    gymId: 'arkose-nation',
    isRead: false,
    createdAt: hoursAgo(9),
  },
  // — Hier (non lues) —
  {
    id: 'notif-5',
    userId: CURRENT_USER.id,
    actorId: 'u-janja',
    type: 'like_post',
    postId: 'post-2',
    isRead: false,
    createdAt: hoursAgo(32),
  },
  // — 7 derniers jours (lues : sous le bandeau "à jour") —
  {
    id: 'notif-6',
    userId: CURRENT_USER.id,
    actorId: 'u-sarah',
    type: 'follow',
    isRead: true,
    createdAt: daysAgo(3),
  },
  {
    id: 'notif-7',
    userId: CURRENT_USER.id,
    actorId: 'u-adam',
    type: 'like_post',
    postId: 'post-5',
    isRead: true,
    createdAt: daysAgo(5),
  },
  // — Ce mois-ci (lues) —
  {
    id: 'notif-8',
    userId: CURRENT_USER.id,
    actorId: 'u-tom',
    type: 'follow_accept',
    isRead: true,
    createdAt: daysAgo(12),
  },
  {
    id: 'notif-9',
    userId: CURRENT_USER.id,
    actorId: 'u-shauna',
    type: 'meet',
    gymId: 'arkose-pantin',
    isRead: true,
    createdAt: daysAgo(20),
  },
  // — Plus ancien (lues) —
  {
    id: 'notif-10',
    userId: CURRENT_USER.id,
    actorId: 'u-nina',
    type: 'follow',
    isRead: true,
    createdAt: daysAgo(48),
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
  {
    id: 'meet-adam-1',
    gymId: 'arkose-nation',
    user1Id: 'u-adam',
    user2Id: 'u-emma',
    createdAt: '2025-05-22T18:05:00Z',
  },
  {
    id: 'meet-adam-2',
    gymId: 'arkose-nation',
    user1Id: 'u-adam',
    user2Id: 'u-leo',
    createdAt: '2025-05-22T18:20:00Z',
  },
  {
    id: 'meet-adam-3',
    gymId: 'arkose-nation',
    user1Id: 'u-hugo',
    user2Id: 'u-adam',
    createdAt: '2025-05-22T18:40:00Z',
  },
  {
    id: 'meet-adam-4',
    gymId: 'arkose-nation',
    user1Id: 'u-adam',
    user2Id: 'u-chloe',
    createdAt: '2025-05-22T19:00:00Z',
  },
  {
    id: 'meet-adam-5',
    gymId: 'arkose-nation',
    user1Id: 'u-janja',
    user2Id: 'u-adam',
    createdAt: '2025-05-22T19:10:00Z',
  },
  {
    id: 'meet-adam-6',
    gymId: 'arkose-nation',
    user1Id: 'u-adam',
    user2Id: 'u-tomoa',
    createdAt: '2025-05-22T19:20:00Z',
  },
  {
    id: 'meet-adam-7',
    gymId: 'arkose-nation',
    user1Id: 'u-adam',
    user2Id: 'u-shauna',
    createdAt: '2025-05-22T19:30:00Z',
  },
  {
    id: 'meet-adam-8',
    gymId: 'arkose-nation',
    user1Id: 'u-nina',
    user2Id: 'u-adam',
    createdAt: '2025-05-22T19:40:00Z',
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
  // Visites d'Adam : définissent la fenêtre de sa séance à Arkose Nation
  {
    id: 'visit-adam-1',
    userId: 'u-adam',
    gymId: 'arkose-nation',
    createdAt: '2025-05-22T16:00:00Z',
  },
  {
    id: 'visit-adam-2',
    userId: 'u-adam',
    gymId: 'arkose-nation',
    createdAt: '2025-05-26T10:00:00Z',
  },
];

// --- Helpers ---
/** Sessions (visites) de l'utilisateur courant dans une salle, plus récentes d'abord. */
export const getUserSessions = (gymId: string): { id: string; createdAt: string }[] =>
  GYM_VISITS.filter((v) => v.userId === CURRENT_USER.id && v.gymId === gymId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((v) => ({ id: v.id, createdAt: v.createdAt }));

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

// Tops rattachés à un activity_post = blocs validés pendant la séance
const buildActivityTops = (
  activityPostId: string,
  userId: string,
  gymId: string,
  n: number,
): Top[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${activityPostId}-top-${i + 1}`,
    userId,
    blocId: `${gymId}-bloc-${i + 1}`,
    activityPostId,
    isFlash: i % 4 === 0,
    createdAt: '2025-05-22T18:30:00Z',
  }));

export const ACTIVITY_TOPS: Top[] = [
  ...buildActivityTops('post-1', 'u-adam', 'arkose-nation', 24),
  ...buildActivityTops('post-7', 'u-tomoa', 'arkose-pantin', 12),
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

  return POSTS.filter((p) => p.type === 'activity')
    .map((post): ActivityPublic | null => {
      const session = ACTIVITY_POSTS.find((s) => s.id === post.id);
      const user = USERS.find((u) => u.id === post.userId);
      const gym = session ? GYMS.find((g) => g.id === session.gymId) : undefined;
      if (!session || !user || !gym) return null;

      // Blocs validés pendant la séance (tops liés à l'activity_post)
      const blocks: BoulderPublic[] = ACTIVITY_TOPS.filter((t) => t.activityPostId === post.id)
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
        likesEnabled: session.likesEnabled,
        commentsEnabled: session.commentsEnabled,
        isLiked: likes.some((l) => l.user.id === CURRENT_USER.id),
        likes,
        comments,
      };
    })
    .filter((a): a is ActivityPublic => a !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Feed des publications (post de type "publication"), entièrement assemblé pour l'UI. */
export function getPublicationFeed(): PublicationPublic[] {
  return POSTS.filter((p) => p.type === 'publication')
    .map((post): PublicationPublic | null => {
      const publication = PUBLICATION_POSTS.find((p) => p.id === post.id);
      const user = USERS.find((u) => u.id === post.userId);
      if (!publication || !user) return null;

      // Photos du post (publication_media), images uniquement, 10 max
      const photos = PUBLICATION_MEDIA.filter(
        (m) => m.postId === post.id && m.mediaType === 'image',
      )
        .slice(0, 10)
        .map((m) => ({ id: m.id, url: m.url }));

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
        title: publication.title,
        description: publication.description,
        createdAt: post.createdAt,
        photos,
        likesEnabled: publication.likesEnabled,
        commentsEnabled: publication.commentsEnabled,
        isLiked: likes.some((l) => l.user.id === CURRENT_USER.id),
        likes,
        comments,
      };
    })
    .filter((p): p is PublicationPublic => p !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Feed des posts texte (post de type "text"), entièrement assemblé pour l'UI. */
export function getTextFeed(): TextPostPublic[] {
  return POSTS.filter((p) => p.type === 'text')
    .map((post): TextPostPublic | null => {
      const text = TEXT_POSTS.find((t) => t.id === post.id);
      const user = USERS.find((u) => u.id === post.userId);
      if (!text || !user) return null;

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
        content: text.content,
        createdAt: post.createdAt,
        likesEnabled: text.likesEnabled,
        commentsEnabled: text.commentsEnabled,
        isLiked: likes.some((l) => l.user.id === CURRENT_USER.id),
        likes,
        comments,
      };
    })
    .filter((t): t is TextPostPublic => t !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Feed des notifications de l'utilisateur courant, regroupées par période (récent → ancien). */
export function getNotificationFeed(): NotificationSection[] {
  const now = new Date();
  const startOfDay = (ms: number) => {
    const d = new Date(ms);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };
  const startOfToday = startOfDay(now.getTime());
  const DAY = 86_400_000;

  const buckets: Record<string, NotificationPublic[]> = {
    today: [],
    yesterday: [],
    week: [],
    month: [],
    older: [],
  };

  NOTIFICATIONS.filter((n) => n.userId === CURRENT_USER.id)
    .map((n): NotificationPublic | null => {
      const gym = n.gymId ? GYMS.find((g) => g.id === n.gymId) : undefined;

      // new_bloc : pas d'acteur utilisateur → la salle tient lieu d'« acteur » (image à gauche),
      // miniature = image du bloc ouvert. Reçu uniquement pour les salles en favoris (cf. données).
      if (n.type === 'new_bloc') {
        if (!gym) return null;
        const bloc = n.blocId ? BLOCS.find((b) => b.id === n.blocId) : undefined;
        return {
          id: n.id,
          kind: 'new_bloc',
          actor: { id: gym.id, username: gym.name, avatarUrl: gym.imageUri },
          createdAt: n.createdAt,
          isRead: n.isRead,
          gym: { id: gym.id, name: gym.name },
          thumbnailUrl: bloc?.blocUrl,
        };
      }

      const actor = USERS.find((u) => u.id === n.actorId);
      if (!actor) return null;
      // Miniature = 1re image de la publication concernée (like sur la publi)
      const thumbnailUrl =
        n.type === 'like_post' && n.postId
          ? PUBLICATION_MEDIA.find((m) => m.postId === n.postId && m.mediaType === 'image')?.url
          : undefined;

      return {
        id: n.id,
        kind: n.type as NotificationKind,
        actor,
        createdAt: n.createdAt,
        isRead: n.isRead,
        isFollowing: isFollowedByCurrentUser(actor.id),
        gym: gym ? { id: gym.id, name: gym.name } : undefined,
        thumbnailUrl,
      };
    })
    .filter((n): n is NotificationPublic => n !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .forEach((n) => {
      const daysDiff = Math.round(
        (startOfToday - startOfDay(new Date(n.createdAt).getTime())) / DAY,
      );
      if (daysDiff <= 0) buckets.today.push(n);
      else if (daysDiff === 1) buckets.yesterday.push(n);
      else if (daysDiff < 7) buckets.week.push(n);
      else if (daysDiff < 30) buckets.month.push(n);
      else buckets.older.push(n);
    });

  return [
    { key: 'today', title: "Aujourd'hui", items: buckets.today },
    { key: 'yesterday', title: 'Hier', items: buckets.yesterday },
    { key: 'week', title: '7 derniers jours', items: buckets.week },
    { key: 'month', title: 'Ce mois-ci', items: buckets.month },
    { key: 'older', title: 'Plus ancien', items: buckets.older },
  ].filter((s) => s.items.length > 0);
}

export type HomeFeedItem =
  | { kind: 'now'; data: NowPublic }
  | { kind: 'activity'; data: ActivityPublic }
  | { kind: 'publication'; data: PublicationPublic }
  | { kind: 'text'; data: TextPostPublic };

/** Feed unifié de la home : posts des utilisateurs suivis par l'utilisateur courant, plus récents d'abord. */
export function getHomeFeed(): HomeFeedItem[] {
  const items: HomeFeedItem[] = [
    ...getNowFeed()
      .filter((n) => isFollowedByCurrentUser(n.user.id))
      .map((data): HomeFeedItem => ({ kind: 'now', data })),
    ...getActivityFeed()
      .filter((a) => isFollowedByCurrentUser(a.user.id))
      .map((data): HomeFeedItem => ({ kind: 'activity', data })),
    ...getPublicationFeed()
      .filter((p) => isFollowedByCurrentUser(p.user.id))
      .map((data): HomeFeedItem => ({ kind: 'publication', data })),
    ...getTextFeed()
      .filter((t) => isFollowedByCurrentUser(t.user.id))
      .map((data): HomeFeedItem => ({ kind: 'text', data })),
  ];

  return items.sort((a, b) => b.data.createdAt.localeCompare(a.data.createdAt));
}

export const getConversationWith = (otherUserId: string): Message[] =>
  MESSAGES.filter(
    (m) =>
      (m.senderId === CURRENT_USER.id && m.receiverId === otherUserId) ||
      (m.senderId === otherUserId && m.receiverId === CURRENT_USER.id),
  ).sort((a, b) => a.createdAt.localeCompare(b.createdAt));

// --- Profil utilisateur (page UserProfile) ---

/** Compteurs affichés en tête du profil utilisateur. */
export function getUserProfileStats(userId: string): {
  followingCount: number;
  followersCount: number;
  activitiesCount: number;
  gymsVisitedCount: number;
} {
  const followingCount = FOLLOWS.filter((f) => f.followerId === userId).length;
  const followersCount = FOLLOWS.filter((f) => f.followingId === userId).length;
  const activitiesCount = POSTS.filter((p) => p.userId === userId && p.type === 'activity').length;
  const gymsVisitedCount = new Set(
    GYM_VISITS.filter((v) => v.userId === userId).map((v) => v.gymId),
  ).size;

  return { followingCount, followersCount, activitiesCount, gymsVisitedCount };
}

// Demandes de suivi envoyées par l'utilisateur courant, en attente d'acceptation (mock).
export const PENDING_FOLLOW_REQUESTS: string[] = ['u-sarah'];

/** Statut de suivi de l'utilisateur courant vis-à-vis de `userId`, pour le bouton Follow du profil. */
export function getFollowStatus(userId: string): 'following' | 'pending' | 'none' {
  if (isFollowedByCurrentUser(userId)) return 'following';
  if (PENDING_FOLLOW_REQUESTS.includes(userId)) return 'pending';
  return 'none';
}

// --- Listes du profil (page UserRelations) ---

// Un `User` de la base fake vu comme `UserPublic`, avec le statut de suivi de l'utilisateur
// courant : c'est lui qui pilote l'état initial du bouton Follow des listes.
const toUserPublic = (user: User): UserPublic => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  bio: user.bio,
  isSetter: user.isSetter,
  avatarUrl: user.avatarUrl,
  isFollowing: isFollowedByCurrentUser(user.id),
});

const usersFromFollows = (follows: Follow[], pick: (follow: Follow) => string): UserPublic[] =>
  follows
    .map((f) => USERS.find((u) => u.id === pick(f)))
    .filter((u): u is User => !!u)
    .map(toUserPublic);

/** Abonnés de `userId` (ceux qui le suivent), plus récents d'abord. */
export const getFollowers = (userId: string): UserPublic[] =>
  usersFromFollows(
    FOLLOWS.filter((f) => f.followingId === userId).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    ),
    (f) => f.followerId,
  );

/** Abonnements de `userId` (ceux qu'il suit), plus récents d'abord. */
export const getFollowing = (userId: string): UserPublic[] =>
  usersFromFollows(
    FOLLOWS.filter((f) => f.followerId === userId).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    ),
    (f) => f.followingId,
  );

/** Activités publiées par `userId`, plus récentes d'abord. */
export const getUserActivities = (userId: string): ActivityPublic[] =>
  getActivityFeed()
    .filter((a) => a.user.id === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export interface VisitedGym {
  gym: Gym;
  /** Date ISO de la visite la plus récente */
  lastVisitAt: string;
  /** Nombre total de visites de l'utilisateur dans cette salle */
  visitCount: number;
}

/** Salles visitées par `userId`, dédoublonnées, visite la plus récente en premier. */
export function getVisitedGyms(userId: string): VisitedGym[] {
  const visits = GYM_VISITS.filter((v) => v.userId === userId);

  return GYMS.map((gym): VisitedGym | null => {
    const gymVisits = visits.filter((v) => v.gymId === gym.id);
    if (!gymVisits.length) return null;

    const lastVisitAt = gymVisits
      .map((v) => v.createdAt)
      .sort((a, b) => b.localeCompare(a))[0] as string;

    return { gym, lastVisitAt, visitCount: gymVisits.length };
  })
    .filter((v): v is VisitedGym => !!v)
    .sort((a, b) => b.lastVisitAt.localeCompare(a.lastVisitAt));
}
