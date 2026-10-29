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

export interface RecentVisit {
  gym: Gym;
  lastVisitLabel: string;
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
    imageUri: 'https://images.unsplash.com/photo-1624410722888-eeb4f0c99905?w=800&q=80',
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

export const RECENTLY_VISITED: RecentVisit[] = [
  { gym: GYMS[0], lastVisitLabel: '3j' },
  { gym: GYMS[1], lastVisitLabel: '1sem' },
  { gym: GYMS[2], lastVisitLabel: '2j' },
];

export const FAVORITE_GYMS: Gym[] = [GYMS[0], GYMS[1], GYMS[2], GYMS[3]];

export const POPULAR_GYMS: Gym[] = GYMS;
