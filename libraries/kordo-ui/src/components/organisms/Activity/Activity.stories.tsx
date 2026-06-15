import type { Meta, StoryObj } from '@storybook/react';
import { Activity } from './Activity';
import { ActivityPublic } from 'core';

/**
 * Carte d'une séance de grimpe (Activity), rendue uniquement à partir d'un `ActivityPublic`.
 *
 * v1 : header (user/date/salle), titre/description, grille vidéos et compteurs likes/commentaires.
 */
export default {
  title: 'Organisms/Activity',
  component: Activity,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Activity>;

type Story = StoryObj<typeof Activity>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

const BLOC_NAMES = ['Crimpy', 'Dyno', 'Slab attack', 'Overhang', 'Pince party', 'Compression'];
const blocks = Array.from({ length: 24 }, (_, i) => ({
  id: `b-${i + 1}`,
  name: BLOC_NAMES[i % BLOC_NAMES.length],
  grade: i < 8 ? 21 : 10 + (i % 9),
  points: 1050,
  blocUrl: `https://picsum.photos/seed/b-${i + 1}/200/200`,
  setter: { id: 'u-nina', username: 'nina_setter', firstName: 'Nina', avatarUrl: avatar },
  isValidated: i % 3 !== 0,
  createdAt: '2025-03-24',
}));

const mockActivity: ActivityPublic = {
  id: 'a-1',
  user: { id: 'u-lea', username: 'lea', firstName: 'Léa', lastName: 'Bozec', avatarUrl: avatar },
  gym: { id: 'arkose-nation', name: 'Arkose Nation' },
  title: 'Séance force avant la compétition de samedi',
  description:
    "Super séance avec l'eki team, découverte de Arkose Nation, super salle ! J'espère y retourner rapidement pour réussir les derniers blocs.",
  createdAt: '2025-03-24T20:23:00Z',
  blocks,
  maxGrade: { grade: 21, count: 8 },
  meets: [
    { id: 'm-1', username: 'tomoa', firstName: 'Tomoa', lastName: 'Narasaki', avatarUrl: avatar, isFollowing: true },
    { id: 'm-2', username: 'emma_b', firstName: 'Emma', lastName: 'Bernard', avatarUrl: avatar, isFollowing: false },
    { id: 'm-3', username: 'hugo_p', firstName: 'Hugo', lastName: 'Petit', avatarUrl: avatar, isFollowing: false },
    { id: 'm-4', username: 'sarah_k', firstName: 'Sarah', lastName: 'Khan', avatarUrl: avatar, isFollowing: true },
  ],
  videos: Array.from({ length: 12 }, (_, i) => ({
    id: `v-${i + 1}`,
    blocId: `b-${i + 1}`,
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  })),
  likes: Array.from({ length: 123 }, (_, i) => ({
    id: `l-${i}`,
    user: { id: `u-${i}`, username: `user${i}` },
  })),
  comments: Array.from({ length: 24 }, (_, i) => ({
    id: `c-${i}`,
    user: { id: `u-${i}`, username: `user${i}` },
    content: 'Bravo !',
    createdAt: '2025-03-24',
  })),
};

export const Default: Story = {
  args: {
    activity: mockActivity,
  },
};
