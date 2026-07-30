import type { Meta, StoryObj } from '@storybook/react';
import { Publication } from './Publication';
import { PublicationPublic } from 'core';
import { phoneFrame } from '../../../__stories__/decorators';

/**
 * Photo post card (Instagram-like), rendered from a `PublicationPublic`.
 *
 * Header (user/date), paginated photo carousel (1..10) with dots, like/comment counters
 * and description.
 */
export default {
  title: 'Organisms/Publication',
  component: Publication,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneFrame],
} satisfies Meta<typeof Publication>;

type Story = StoryObj<typeof Publication>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

const PHOTO_URLS = [
  'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
  'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80',
  'https://images.unsplash.com/photo-1516592673884-4a382d1124c2?w=800&q=80',
  'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
];

const mockPublication: PublicationPublic = {
  id: 'p-1',
  user: {
    id: 'u-emma',
    username: 'emma_b',
    firstName: 'Emma',
    lastName: 'Bernard',
    avatarUrl: avatar,
  },
  title: 'Premier 7a en flash',
  description: 'Premier 7a en flash 🔥 trop content ! Merci à la team pour les encouragements 💪',
  createdAt: '2025-03-24T20:23:00Z',
  photos: PHOTO_URLS.map((url, i) => ({ id: `ph-${i + 1}`, url })),
  likesEnabled: true,
  commentsEnabled: true,
  isLiked: false,
  likes: Array.from({ length: 123 }, (_, i) => ({
    id: `l-${i}`,
    user: { id: `u-${i}`, username: `user${i}` },
  })),
  comments: Array.from({ length: 24 }, (_, i) => ({
    id: `c-${i}`,
    user: {
      id: `u-${i}`,
      username: `user${i}`,
      firstName: ['Léo', 'Hugo', 'Sarah', 'Tom'][i % 4],
      lastName: 'Martin',
      avatarUrl: avatar,
    },
    content: ['Énorme 💪', 'Bien joué !', 'Trop fort.', 'GG 🔥'][i % 4],
    createdAt: new Date(Date.now() - (i + 1) * 3 * 3600_000).toISOString(),
  })),
};

export const Default: Story = {
  args: {
    publication: mockPublication,
    currentUser: {
      id: 'u-me',
      username: 'me',
      firstName: 'Léo',
      lastName: 'Martin',
      avatarUrl: avatar,
    },
  },
};

export const SinglePhoto: Story = {
  args: {
    publication: { ...mockPublication, photos: [mockPublication.photos[0]] },
  },
};
