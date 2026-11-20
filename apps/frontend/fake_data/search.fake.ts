import { GYMS, GYM_LIVE_COUNTS, Gym } from './gyms.fake';
import { CURRENT_USER, USERS, getUserById } from './users.fake';
import { BLOCS, SECTORS, getSectorsByGym } from './climbing.fake';
import { Bloc, User } from './db.types';
import { isFollowedByCurrentUser } from './social.fake';

// Données fictives de l'onglet Recherche : recherches récentes, suggestions, résultats.

export const RECENT_SEARCHES = ['Arkose Nation', 'Adam Ondra', 'dévers', 'Murmur'];

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const cityOf = (gym: Gym) => gym.address.split(',').pop()?.trim() ?? '';

export interface ClimberHit {
  user: User;
  subtitle: string;
}
export interface GymHit {
  gym: Gym;
  subtitle: string;
}
export interface BlocHit {
  bloc: Bloc;
  gym: Gym;
  subtitle: string;
}

/** Grimpeurs à découvrir : ceux que l'utilisateur ne suit pas encore */
const DISCOVER: { userId: string; subtitle: string }[] = [
  { userId: 'u-emma', subtitle: 'Arkose Nation · 6C' },
  { userId: 'u-hugo', subtitle: '2 amis en commun' },
  { userId: 'u-janja', subtitle: 'Arkose Nanterre · 7B' },
  { userId: 'u-chloe', subtitle: 'Arkose Montreuil · 6B' },
  { userId: 'u-tomoa', subtitle: 'Climb Up Paris · 8A' },
  { userId: 'u-shauna', subtitle: '4 amis en commun' },
];
export const getClimbersToDiscover = (): ClimberHit[] =>
  DISCOVER.flatMap(({ userId, subtitle }) => {
    const user = getUserById(userId);
    return user && !isFollowedByCurrentUser(user.id) ? [{ user, subtitle }] : [];
  }).slice(0, 3);

/** Salles près de toi, avec le nombre de grimpeurs en séance */
const NEAR: { gymId: string; distance: string }[] = [
  { gymId: 'arkose-nation', distance: '1,2 km' },
  { gymId: 'arkose-montreuil', distance: '3,4 km' },
];
export const getGymsNearby = (): GymHit[] =>
  NEAR.flatMap(({ gymId, distance }) => {
    const gym = GYMS.find((g) => g.id === gymId);
    if (!gym) return [];
    const live = GYM_LIVE_COUNTS[gym.id];
    return [
      {
        gym,
        subtitle: [cityOf(gym), distance, live ? `${live} en séance` : '']
          .filter(Boolean)
          .join(' · '),
      },
    ];
  });

/** Recherche dans les grimpeurs, les salles et les blocs (insensible aux accents) */
export const searchAll = (query: string) => {
  const q = fold(query.trim());
  if (!q) return { climbers: [] as ClimberHit[], gyms: [] as GymHit[], blocs: [] as BlocHit[] };

  const climbers = USERS.filter(
    (u) =>
      u.id !== CURRENT_USER.id && fold(`${u.firstName} ${u.lastName} ${u.username}`).includes(q),
  ).map((user) => ({ user, subtitle: `@${user.username}` }));

  const gyms = GYMS.filter((g) => fold(`${g.name} ${g.address}`).includes(q)).map((gym) => ({
    gym,
    subtitle: cityOf(gym),
  }));

  const blocs = BLOCS.filter((b) => b.name && fold(b.name).includes(q))
    .slice(0, 8)
    .flatMap((bloc) => {
      const gym = GYMS.find((g) => g.id === bloc.gymId);
      if (!gym) return [];
      const sector = SECTORS.find((s) => s.id === bloc.sectorId);
      const n = sector ? getSectorsByGym(gym.id).findIndex((s) => s.id === sector.id) + 1 : 0;
      return [{ bloc, gym, subtitle: `${gym.name}${n ? ` · secteur ${n}` : ''}` }];
    });

  return { climbers, gyms, blocs };
};
