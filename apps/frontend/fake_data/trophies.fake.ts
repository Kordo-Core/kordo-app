// Trophées de l'utilisateur courant (données fictives tant que l'API des trophées n'existe pas).
// `progress` va de 0 (verrouillé) à 100 (obtenu) ; `icon` est un tracé SVG 24×24 du design D.

export interface Trophy {
  id: string;
  name: string;
  description: string;
  progress: number;
  icon: string;
  /** Texte de la page « Badge débloqué » (trophées obtenus) */
  story?: string;
  /** Pastilles de détail sous le texte de la page « Badge débloqué » */
  chips?: string[];
}

const ICONS = {
  globe: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20',
  award: 'M12 2a7 7 0 100 14 7 7 0 000-14zM8.2 13.9L7 23l5-3 5 3-1.2-9.1',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9z',
  crown: 'M2 18h20M3 7l4 4 5-7 5 7 4-4-2 11H5z',
  flame: 'M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-4 5-4 8-1-1-2-2-2-4-2 2-3 5-3 8 0 4 3 7 7 7z',
  target:
    'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6a6 6 0 100 12 6 6 0 000-12zM12 10a2 2 0 100 4 2 2 0 000-4',
  hex: 'M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z',
  pin: 'M12 22s-8-6-8-12a8 8 0 0116 0c0 6-8 12-8 12zM12 7a3 3 0 100 6 3 3 0 000-6',
};

/** Nombre total de trophées du jeu (seuls les plus proches sont listés) */
export const TROPHY_TOTAL = 12;

export const TROPHIES: Trophy[] = [
  {
    id: 'globetrotter',
    name: 'Globetrotter',
    description: 'Plus de 20 salles différentes',
    progress: 100,
    icon: ICONS.globe,
    story:
      'tu as visité plus de 20 salles différentes. Tu fais partie des 4 % des grimpeurs Kordo.',
    chips: ['20 salles', '3 villes', '+500 pts'],
  },
  {
    id: 'tarzan',
    name: 'Tarzan Climber',
    description: '30 défis réalisés',
    progress: 100,
    icon: ICONS.award,
    story: 'tu as réalisé 30 défis. Prochaine étape : King Climber.',
    chips: ['30 défis', '+300 pts'],
  },
  {
    id: 'king',
    name: 'King Climber',
    description: '100 défis réalisés',
    progress: 64,
    icon: ICONS.crown,
  },
  {
    id: 'arkose-fan',
    name: 'Arkose Fan',
    description: '50 séances dans le réseau Arkose',
    progress: 82,
    icon: ICONS.hex,
  },
  {
    id: 'traveler',
    name: 'Traveler',
    description: 'Grimper dans 3 pays',
    progress: 33,
    icon: ICONS.pin,
  },
  {
    id: 'strong',
    name: 'Strong Climber',
    description: '10 blocs de niveau 7',
    progress: 40,
    icon: ICONS.zap,
  },
  {
    id: 'regular',
    name: 'Régulier',
    description: '8 semaines d’affilée',
    progress: 100,
    icon: ICONS.flame,
    story: 'tu as grimpé 8 semaines d’affilée sans en rater une.',
    chips: ['8 semaines', '+200 pts'],
  },
  {
    id: 'spider',
    name: 'Spider Climber',
    description: '250 défis à réaliser',
    progress: 0,
    icon: ICONS.target,
  },
];

export const getTrophy = (id: string) => TROPHIES.find((t) => t.id === id);
