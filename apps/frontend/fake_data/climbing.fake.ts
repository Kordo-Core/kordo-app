import {
  Bloc,
  BlocDetail,
  BlocMedia,
  BlocMediaWithAuthor,
  BlocTag,
  Brand,
  GymRanking,
  GymRecord,
  RankingEntry,
  RankingTrend,
  Sector,
  SettingSession,
  Tag,
  Top,
} from './db.types';
import { GYMS } from './gyms.fake';
import { CURRENT_USER, USERS } from './users.fake';

// --- RNG déterministe (mêmes données fictives à chaque exécution) ---
function seed(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
const pick = <T>(rng: () => number, arr: T[]): T => arr[Math.floor(rng() * arr.length)];
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// --- Marques ---
export const BRANDS: Brand[] = [
  { id: 'b-arkose', name: 'Arkose', createdAt: '2018-01-01' },
  { id: 'b-climbup', name: 'Climb Up', createdAt: '2017-06-01' },
  { id: 'b-blockout', name: "Block'Out", createdAt: '2016-03-01' },
  { id: 'b-murmur', name: 'Murmur', createdAt: '2019-09-01' },
  { id: 'b-petites', name: 'Les Petites Pierres', createdAt: '2020-02-01' },
];

const brandIdByShortName: Record<string, string> = {
  Arkose: 'b-arkose',
  'Climb Up': 'b-climbup',
  "Block'Out": 'b-blockout',
  Murmur: 'b-murmur',
  'Petites Pierres': 'b-petites',
};

// Coordonnées approximatives (centrées sur Paris / Bordeaux)
const BASE_COORDS: Record<string, { lat: number; lng: number }> = {
  default: { lat: 48.8566, lng: 2.3522 },
  bordeaux: { lat: 44.8378, lng: -0.5792 },
};

// --- Salles (table "gym") dérivées des salles affichées ---
export const GYMS_DB: GymRecord[] = GYMS.map((g, i) => {
  const base = g.id.includes('bordeaux') ? BASE_COORDS.bordeaux : BASE_COORDS.default;
  return {
    id: g.id,
    brandId: brandIdByShortName[g.shortName] ?? 'b-arkose',
    name: g.name,
    location: { lat: base.lat + i * 0.012, lng: base.lng + i * 0.009 },
    createdAt: '2021-04-15',
  };
});

// --- Tags ---
export const TAGS: Tag[] = [
  { id: 't-overhang', name: 'Dévers' },
  { id: 't-slab', name: 'Dalle' },
  { id: 't-dyno', name: 'Jeté' },
  { id: 't-crimp', name: 'Réglettes' },
  { id: 't-volume', name: 'Volumes' },
  { id: 't-pinch', name: 'Pinces' },
  { id: 't-techy', name: 'Technique' },
  { id: 't-power', name: 'Puissant' },
];

// --- Plan de salle : 15 secteurs (tracés SVG, viewBox 0 0 280 251) ---
// Anneau de murs (10) + îlot central (2) + zone basse (3). Géométrie commune à toutes les salles.
export const SECTOR_PATHS: string[] = [
  // Anneau extérieur, dans le sens horaire depuis le haut-gauche
  'M16,40 L95,14 L96,38 L40,58 Z',
  'M95,14 L175,16 L174,40 L96,38 Z',
  'M175,16 L250,34 L236,54 L174,40 Z',
  'M250,34 L273,96 L250,98 L236,54 Z',
  'M273,96 L262,152 L242,150 L250,98 Z',
  'M262,152 L245,196 L228,174 L242,150 Z',
  'M245,196 L150,196 L150,174 L228,174 Z',
  'M150,196 L60,188 L72,168 L150,174 Z',
  'M60,188 L10,96 L34,98 L72,168 Z',
  'M10,96 L16,40 L40,58 L34,98 Z',
  // Îlot central (gauche / droite)
  'M120,96 L150,94 L150,132 L120,133 L100,114 Z',
  'M150,94 L182,93 L206,114 L182,131 L150,132 Z',
  // Zone basse (3 pans)
  'M30,214 L104,212 L104,246 L30,246 Z',
  'M104,212 L178,212 L178,246 L104,246 Z',
  'M178,212 L250,214 L250,246 L178,246 Z',
];
export const SECTOR_MAP_VIEWBOX = '0 0 280 251';

const SETTERS = USERS.filter((u) => u.isSetter);
const CLIMBERS = USERS.filter((u) => !u.isSetter);
const BLOC_ADJ = ['Bleu', 'Rouge', 'Vert', 'Jaune', 'Noir', 'Violet', 'Rose', 'Orange'];
const BLOC_NOUN = ['Traversée', 'Réta', 'Dülfer', 'Arête', 'Toit', 'Pince', 'Dalle', 'Mur'];

// Briques de description (intro / mouvement clé / conseil) combinées pour un texte varié.
const DESC_INTRO = [
  'Un bloc engagé qui démarre fort dès les premières prises.',
  'Une ligne fluide pensée pour enchaîner sans temps mort.',
  'Un problème technique où la lecture compte autant que la force.',
  'Un bloc physique qui ne pardonne pas le manque de gainage.',
  'Une ouverture ludique accessible mais piégeuse sur la fin.',
];
const DESC_MOVE = [
  'Le crux se joue sur un mouvement de force vers une réglette fuyante.',
  'Un grand jeté vient récompenser un bon placement de bassin.',
  'Une section en dévers demande de garder les pieds hauts.',
  'Un passage en adhérence sur la dalle teste la confiance dans les pieds.',
  'Une pince ingrate oblige à compresser entre deux volumes.',
];
const DESC_TIP = [
  "Conseil de l'ouvreur : reste patient et respire avant le crux.",
  'Pense à bien repérer le talon avant de te lancer.',
  'La clé est dans le rythme, ne casse pas le flow.',
  'Économise tes avant-bras, les prises arrivent vite.',
  'Vise la propreté plutôt que la vitesse pour le flash.',
];
// Points proportionnels au grade (grades de 1 à 30)
const gradePoints = (grade: number): number => grade * 50;

// URLs de vidéos de méthode (échantillons mp4 publics) postées par les utilisateurs sur les blocs
const METHOD_VIDEOS = [
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  'https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4',
  'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
  'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
];

// --- Génération secteurs / sessions / blocs / tags / tops / médias par salle ---
export const SECTORS: Sector[] = [];
export const SETTING_SESSIONS: SettingSession[] = [];
export const BLOCS: Bloc[] = [];
export const BLOC_TAGS: BlocTag[] = [];
export const TOPS: Top[] = [];
export const BLOC_MEDIA: BlocMedia[] = [];

GYMS_DB.forEach((gym) => {
  const rng = seed(gym.id);

  // 15 secteurs (un par pan de mur du plan)
  const sectors = SECTOR_PATHS.map((path, s) => {
    const sector: Sector = {
      id: `${gym.id}-sector-${s + 1}`,
      gymId: gym.id,
      path,
      createdAt: '2025-01-10',
    };
    SECTORS.push(sector);
    return sector;
  });

  // 2 sessions d'ouverture
  const sessions = range(2).map((s) => {
    const session: SettingSession = {
      id: `${gym.id}-session-${s + 1}`,
      setterId: SETTERS[s % SETTERS.length].id,
      gymId: gym.id,
      createdAt: s === 0 ? '2025-04-02' : '2025-05-14',
    };
    SETTING_SESSIONS.push(session);
    return session;
  });

  // 10 blocs
  range(100).forEach((b) => {
    const grade = 1 + Math.floor(rng() * 30); // 1..30
    const sector = pick(rng, sectors);
    const session = pick(rng, sessions);
    const blocId = `${gym.id}-bloc-${b + 1}`;
    const bloc: Bloc = {
      id: blocId,
      setterId: session.setterId,
      gymId: gym.id,
      settingSessionId: session.id,
      name: `${pick(rng, BLOC_NOUN)} ${pick(rng, BLOC_ADJ)}`,
      grade,
      points: gradePoints(grade),
      sectorId: sector.id,
      blocUrl: `https://picsum.photos/seed/${blocId}/96/96`,
      description: `${pick(rng, DESC_INTRO)} ${pick(rng, DESC_MOVE)} ${pick(rng, DESC_TIP)}`,
      createdAt: session.createdAt,
    };
    BLOCS.push(bloc);

    // 1 à 2 tags
    const tagCount = 1 + Math.floor(rng() * 2);
    const used = new Set<string>();
    range(tagCount).forEach(() => {
      const tag = pick(rng, TAGS);
      if (used.has(tag.id)) return;
      used.add(tag.id);
      BLOC_TAGS.push({ id: `${bloc.id}-${tag.id}`, blocId: bloc.id, tagId: tag.id });
    });

    // quelques tops par bloc
    const topCount = Math.floor(rng() * 4);
    range(topCount).forEach((t) => {
      const climber = pick(rng, CLIMBERS);
      const top: Top = {
        id: `${bloc.id}-top-${t + 1}`,
        userId: climber.id,
        blocId: bloc.id,
        isFlash: rng() > 0.7,
        createdAt: '2025-05-18',
      };
      TOPS.push(top);
    });

    // Vidéos de méthode : n'importe quel utilisateur peut en poster sur le bloc,
    // indépendamment d'un top (pas besoin d'avoir validé). Un user = une vidéo par bloc.
    const videoCount = 1 + Math.floor(rng() * 4); // 1..4 vidéos par bloc
    const videoAuthors = new Set<string>();
    range(videoCount).forEach((v) => {
      const author = pick(rng, USERS);
      if (videoAuthors.has(author.id)) return;
      videoAuthors.add(author.id);
      BLOC_MEDIA.push({
        id: `${bloc.id}-video-${v + 1}`,
        blocId: bloc.id,
        userId: author.id,
        url: pick(rng, METHOD_VIDEOS),
        createdAt: '2025-05-18',
      });
    });
  });
});

// --- Classements par salle (table "gym_ranking") ---
export const GYM_RANKINGS: GymRanking[] = [];
GYMS_DB.forEach((gym) => {
  const rng = seed(`${gym.id}-ranking`);
  CLIMBERS.forEach((user) => {
    GYM_RANKINGS.push({
      id: `${gym.id}-rank-${user.id}`,
      gymId: gym.id,
      userId: user.id,
      totalPoints: 800 + Math.floor(rng() * 2600),
      updatedAt: '2025-05-22',
    });
  });
});

// --- Helpers prêts pour l'UI ---
const trendFromPoints = (points: number): RankingTrend => {
  const m = points % 3;
  return m === 0 ? 'same' : m === 1 ? 'up' : 'down';
};

/** Classement d'une salle, trié par points décroissants, avec rang et tendance. */
export function getGymRanking(gymId: string): RankingEntry[] {
  return GYM_RANKINGS.filter((r) => r.gymId === gymId)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((r, i) => {
      const user = USERS.find((u) => u.id === r.userId)!;
      return {
        rank: i + 1,
        user,
        totalPoints: r.totalPoints,
        trend: trendFromPoints(r.totalPoints),
      };
    });
}

/** Rang de l'utilisateur courant dans une salle (ou undefined s'il n'est pas classé). */
export function getCurrentUserRank(gymId: string): RankingEntry | undefined {
  return getGymRanking(gymId).find((e) => e.user.id === CURRENT_USER.id);
}

/** Blocs d'une salle, enrichis du secteur, de l'ouvreur et des tags. */
export function getBlocsByGym(gymId: string): BlocDetail[] {
  return BLOCS.filter((b) => b.gymId === gymId).map((bloc) => ({
    bloc,
    setter: USERS.find((u) => u.id === bloc.setterId),
    sector: SECTORS.find((s) => s.id === bloc.sectorId)!,
    tags: BLOC_TAGS.filter((bt) => bt.blocId === bloc.id)
      .map((bt) => TAGS.find((t) => t.id === bt.tagId)!)
      .filter(Boolean),
  }));
}

/** Détail complet d'un bloc par son id (pour ouvrir directement son panneau). */
export function getBlocDetailById(blocId: string): BlocDetail | undefined {
  const bloc = BLOCS.find((b) => b.id === blocId);
  if (!bloc) return undefined;
  return {
    bloc,
    setter: USERS.find((u) => u.id === bloc.setterId),
    sector: SECTORS.find((s) => s.id === bloc.sectorId)!,
    tags: BLOC_TAGS.filter((bt) => bt.blocId === bloc.id)
      .map((bt) => TAGS.find((t) => t.id === bt.tagId)!)
      .filter(Boolean),
  };
}

export const getSectorsByGym = (gymId: string): Sector[] =>
  SECTORS.filter((s) => s.gymId === gymId);

/** Vidéos de méthode d'un bloc, avec leur auteur (n'importe quel utilisateur). */
export function getMediaByBloc(blocId: string): BlocMediaWithAuthor[] {
  return BLOC_MEDIA.filter((m) => m.blocId === blocId).map((media) => ({
    media,
    author: USERS.find((u) => u.id === media.userId),
  }));
}

/** Vidéo de méthode postée par l'utilisateur courant sur un bloc, si elle existe. */
export function getCurrentUserBlocMethod(blocId: string): BlocMedia | undefined {
  return BLOC_MEDIA.find((m) => m.blocId === blocId && m.userId === CURRENT_USER.id);
}
