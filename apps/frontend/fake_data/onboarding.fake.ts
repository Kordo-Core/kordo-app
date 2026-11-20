import { GYMS, Gym } from './gyms.fake';
import { CURRENT_USER, USERS, getUserById } from './users.fake';
import { User } from './db.types';

// Données fictives des écrans d'accueil après inscription (salle, niveau, grimpeurs à suivre),
// de « Modifier le profil » et de « Mot de passe oublié ».

/** Niveaux proposés (cotation bloc), du plus facile au plus dur */
export const ONBOARDING_GRADES = ['5', '6A', '6B', '6C', '7A', '7B', '7C', '8A+'] as const;
export type OnboardingGrade = (typeof ONBOARDING_GRADES)[number];

/** Phrase affichée sous le niveau choisi */
export const GRADE_HINTS: Record<OnboardingGrade, string> = {
  '5': 'Les bases, on y va pas à pas',
  '6A': 'Tu prends tes marques',
  '6B': 'Ça commence à tirer',
  '6C': 'Le cap des dévers',
  '7A': 'Solide, place aux projets',
  '7B': 'Gros niveau',
  '7C': 'Tu grimpes fort',
  '8A+': 'Respect',
};

/** Salles « près de toi » : distance fictive depuis la position de l'utilisateur */
const NEARBY: { gymId: string; distance: string }[] = [
  { gymId: 'arkose-nation', distance: '1,2 km' },
  { gymId: 'arkose-montreuil', distance: '3,4 km' },
  { gymId: 'arkose-nanterre', distance: '5,1 km' },
];

// Ville d'une salle, tirée de la fin de son adresse (« 13 rue Joffre, Paris 12e » → « Paris 12e »)
const cityOf = (gym: Gym) => gym.address.split(',').pop()?.trim() ?? '';

export interface NearbyGym {
  gym: Gym;
  /** « Paris 12e · 1,2 km » */
  subtitle: string;
}

export const getNearbyGyms = (): NearbyGym[] => {
  const listed = NEARBY.flatMap(({ gymId, distance }) => {
    const gym = GYMS.find((g) => g.id === gymId);
    return gym ? [{ gym, subtitle: `${cityOf(gym)} · ${distance}` }] : [];
  });
  // Complète avec les autres salles, plus loin
  const others = GYMS.filter((g) => !NEARBY.some((n) => n.gymId === g.id))
    .slice(0, 5 - listed.length)
    .map((gym, i) => ({
      gym,
      subtitle: `${cityOf(gym)} · ${(6.8 + i * 2.3).toFixed(1).replace('.', ',')} km`,
    }));
  return [...listed, ...others];
};

/** Recherche d'une salle par nom ou ville (insensible aux accents et à la casse) */
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const searchGyms = (query: string): NearbyGym[] => {
  const q = fold(query.trim());
  if (!q) return getNearbyGyms();
  return GYMS.filter((g) => fold(`${g.name} ${g.address}`).includes(q)).map((gym) => ({
    gym,
    subtitle: cityOf(gym),
  }));
};

/** Grimpeurs proposés à la 3e étape : même salle ou même niveau, amis en commun */
const SUGGESTED: { userId: string; reason: (gymName: string) => string }[] = [
  { userId: 'u-emma', reason: (g) => `${g} · 6C` },
  { userId: 'u-hugo', reason: (g) => `${g} · 7A` },
  { userId: 'u-chloe', reason: () => '3 amis en commun' },
  { userId: 'u-adam', reason: (g) => `${g} · 8A+` },
  { userId: 'u-janja', reason: () => 'Arkose Nanterre · 7B' },
];

export const getSuggestedClimbers = (gymName: string): { user: User; subtitle: string }[] =>
  SUGGESTED.flatMap(({ userId, reason }) => {
    const user = getUserById(userId);
    return user ? [{ user, subtitle: reason(gymName) }] : [];
  });

/** Profil de l'utilisateur connecté, complété des champs que « Modifier le profil » édite */
export const CURRENT_PROFILE = {
  mainGymId: 'arkose-nation',
  maxGrade: '6C' as OnboardingGrade,
  // Même couverture que l'écran de profil
  coverUri:
    'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg',
};

/** Longueur maximale de la bio */
export const BIO_MAX = 150;

/** Applique les changements de « Modifier le profil » aux données fictives (le temps de la session) */
export const updateCurrentProfile = (changes: {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  mainGymId: string;
  maxGrade: OnboardingGrade;
}) => {
  CURRENT_USER.firstName = changes.firstName;
  CURRENT_USER.lastName = changes.lastName;
  CURRENT_USER.username = changes.username;
  CURRENT_USER.bio = changes.bio;
  CURRENT_PROFILE.mainGymId = changes.mainGymId;
  CURRENT_PROFILE.maxGrade = changes.maxGrade;
};

/** Noms d'utilisateur déjà pris (contrôle de disponibilité de « Modifier le profil ») */
export const isUsernameTaken = (username: string) =>
  USERS.some(
    (u) => u.id !== CURRENT_USER.id && u.username.toLowerCase() === username.trim().toLowerCase(),
  );
