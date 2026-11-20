import { USERS } from './users.fake';

export type GymCategory = 'bloc' | 'lead' | 'both';

export interface Gym {
  id: string;
  name: string;
  shortName: string;
  address: string;
  description: string;
  imageUri: string;
  category: GymCategory;
  rating: number;
}

export const GYMS: Gym[] = [
  {
    id: 'arkose-nation',
    name: 'Arkose Nation',
    shortName: 'Arkose',
    address: '13 rue Joffre, Paris 12e',
    description: 'Magnifique salle de bloc sur Paris près de Nation',
    imageUri: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80',
    category: 'both',
    rating: 4.8,
  },
  {
    id: 'arkose-nanterre',
    name: 'Arkose Nanterre',
    shortName: 'Arkose',
    address: '25 rue de la Garenne, Nanterre',
    description: 'Grande salle moderne avec parcours variés sur deux niveaux',
    imageUri: 'https://images.unsplash.com/photo-1501450626433-39bbf117090e?w=800&q=80',
    category: 'bloc',
    rating: 4.6,
  },
  {
    id: 'arkose-montreuil',
    name: 'Arkose Montreuil',
    shortName: 'Arkose',
    address: "3 rue de l'Industrie, Montreuil",
    description: 'Salle spacieuse avec ouvertures régulières et ambiance chaleureuse',
    imageUri: 'https://images.unsplash.com/photo-1571649123442-dc0e1965e037?w=800&q=80',
    category: 'bloc',
    rating: 4.7,
  },
  {
    id: 'arkose-pantin',
    name: 'Arkose Pantin',
    shortName: 'Arkose',
    address: '47 avenue du Général Leclerc, Pantin',
    description: "La plus grande salle de bloc d'Île-de-France",
    imageUri: 'https://images.unsplash.com/photo-1543398971-17eea343659e?w=800&q=80',
    category: 'bloc',
    rating: 4.9,
  },
  {
    id: 'climbup-paris',
    name: 'Climb Up Paris',
    shortName: 'Climb Up',
    address: "43 rue de l'Amiral Mouchez, Paris 13e",
    description: 'Salle mixte bloc et voie au cœur de Paris',
    imageUri: 'https://images.unsplash.com/photo-1529861820-012514cbd6d5?w=800&q=80',
    category: 'both',
    rating: 4.5,
  },
  {
    id: 'blockout-paris',
    name: "Block'Out Paris",
    shortName: "Block'Out",
    address: '102 rue de la Folie Méricourt, Paris 11e',
    description: 'Atmosphère urbaine et ouvertures créatives chaque semaine',
    imageUri: 'https://images.unsplash.com/photo-1696105538782-7815474f28e0?w=800&q=80',
    category: 'bloc',
    rating: 4.4,
  },
  {
    id: 'murmur-paris',
    name: 'Murmur',
    shortName: 'Murmur',
    address: '55 rue des Haies, Paris 20e',
    description: 'Salle intime avec une communauté passionnée et bienveillante',
    imageUri: 'https://images.unsplash.com/photo-1696105539018-a73a53770934?w=800&q=80',
    category: 'both',
    rating: 4.6,
  },
  {
    id: 'petites-pierres',
    name: 'Les Petites Pierres',
    shortName: 'Petites Pierres',
    address: '14 passage de la Bonne Graine, Paris 11e',
    description: 'Salle conviviale idéale pour débuter en escalade',
    imageUri: 'https://images.unsplash.com/photo-1775655111243-9382dc0cc089?w=800&q=80',
    category: 'bloc',
    rating: 4.3,
  },
  {
    id: 'blockout-bordeaux',
    name: "Block'Out Bordeaux",
    shortName: "Block'Out",
    address: '4 rue Gustave Eiffel, Bordeaux',
    description: "La référence bordelaise de l'escalade de bloc",
    imageUri: 'https://images.unsplash.com/photo-1659666287295-7da26c3f80d4?w=800&q=80',
    category: 'bloc',
    rating: 4.5,
  },
  {
    id: 'arkose-bordeaux',
    name: 'Arkose Bordeaux',
    shortName: 'Arkose',
    address: '7 allée de Boutaut, Bordeaux',
    description: 'Grand complexe escalade en bord de Garonne',
    imageUri: 'https://images.unsplash.com/photo-1689775884478-9ed19b79d659?w=800&q=80',
    category: 'both',
    rating: 4.7,
  },
];

const gym = (id: string) => GYMS.find((g) => g.id === id)!;

export interface RecentGymVisit {
  gym: Gym;
  /** Jour et mois de la visite, pour le cachet */
  day: string;
  month: string;
  when: string;
  blocs: number;
  points: number;
}

/** Dernières salles visitées, la plus récente d'abord. */
export const VISIT_LOG: RecentGymVisit[] = [
  { gym: gym('arkose-nation'), day: '1', month: 'NOV', when: 'Il y a 2 j', blocs: 18, points: 920 },
  {
    gym: gym('climbup-paris'),
    day: '29',
    month: 'OCT',
    when: 'Il y a 5 j',
    blocs: 12,
    points: 640,
  },
  { gym: gym('murmur-paris'), day: '25', month: 'OCT', when: 'Il y a 9 j', blocs: 8, points: 410 },
  {
    gym: gym('arkose-nanterre'),
    day: '13',
    month: 'OCT',
    when: 'Il y a 3 sem.',
    blocs: 15,
    points: 780,
  },
];

/** Nombre de salles partenaires, objectif du passeport. */
export const VISIT_CALENDAR = Array.from({ length: 21 }, (_, i) =>
  i < 20 ? { day: String(12 + i), month: 'OCT' } : { day: '1', month: 'NOV' },
);

export const PASSPORT_TOTAL = 50;

export const FAVORITE_GYMS: Gym[] = [
  gym('arkose-nation'),
  gym('murmur-paris'),
  gym('climbup-paris'),
  gym('arkose-pantin'),
];

export const POPULAR_GYMS: Gym[] = [
  gym('arkose-pantin'),
  gym('arkose-nation'),
  gym('arkose-montreuil'),
  gym('climbup-paris'),
  gym('murmur-paris'),
];

/** Grimpeurs en séance par salle, en attendant l'API. */
export const GYM_LIVE_COUNTS: Record<string, number> = {
  'arkose-nation': 47,
  'arkose-nanterre': 22,
  'arkose-montreuil': 31,
  'arkose-pantin': 63,
  'climbup-paris': 18,
  'blockout-paris': 26,
  'murmur-paris': 12,
  'petites-pierres': 9,
  'blockout-bordeaux': 15,
  'arkose-bordeaux': 28,
};

/** Affluence de 10 h à 23 h, en pourcentage du pic, et heure en cours. */
export const CROWD_BY_HOUR = [10, 14, 18, 24, 32, 28, 22, 30, 52, 74, 90, 100, 78, 44];
export const CROWD_NOW_INDEX = 8;

/** Amis présents dans la dernière salle visitée. */
export const FRIENDS_ON_SITE = ['u-emma', 'u-hugo', 'u-chloe'].map(
  (id) => USERS.find((u) => u.id === id)!,
);

export const GYM_CATEGORIES = [
  { label: 'Ranked', icon: 'TrophyRegular' },
  { label: 'New', icon: 'StarRegular' },
  { label: 'Bloc', icon: 'terrain' },
  { label: 'Lead', icon: 'carabiner' },
] as const;

const NEW_GYM_IDS = ['arkose-pantin', 'murmur-paris', 'blockout-bordeaux'];

/** Salles d'une catégorie. */
export function getGymsByCategory(label: string): Gym[] {
  switch (label) {
    case 'Ranked':
      return GYMS.filter((g) => g.rating >= 4.6);
    case 'New':
      return GYMS.filter((g) => NEW_GYM_IDS.includes(g.id));
    case 'Bloc':
      return GYMS.filter((g) => g.category !== 'lead');
    case 'Lead':
      return GYMS.filter((g) => g.category === 'both');
    default:
      return GYMS;
  }
}
