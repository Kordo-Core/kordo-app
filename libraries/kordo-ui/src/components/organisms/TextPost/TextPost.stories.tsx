import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { TextPost } from './TextPost';
import { TextPostPublic } from 'core';
import { phoneFrame } from '../../../../.storybook/decorators';

/**
 * Text post card, rendered from a `TextPostPublic`.
 *
 * Header (user/date), text content, like/comment counters — like every other post.
 */
export default {
  title: 'Organisms/TextPost',
  component: TextPost,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneFrame],
} satisfies Meta<typeof TextPost>;

type Story = StoryObj<typeof TextPost>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

const mockTextPost: TextPostPublic = {
  id: 't-1',
  user: {
    id: 'u-thomas',
    username: 'thomas_c',
    firstName: 'Thomas',
    lastName: 'Contini',
    avatarUrl: avatar,
  },
  content:
    "Première séance aujourd'hui à Arkose Massy, très bonne séance mais malheureusement l'état général des locaux est à déplorer, toilettes défectueuses, casier des vestiaires cassé et sauna qui ne marche pas, très dommage",
  createdAt: '2025-03-24T20:23:00Z',
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
      firstName: 'Léo',
      lastName: 'Martin',
      avatarUrl: avatar,
    },
    content: 'Dommage pour les vestiaires, sinon la salle est top.',
    createdAt: new Date(Date.now() - (i + 1) * 3 * 3600_000).toISOString(),
  })),
};

export const Default: Story = {
  args: {
    textPost: mockTextPost,
    currentUser: {
      id: 'u-me',
      username: 'me',
      firstName: 'Léo',
      lastName: 'Martin',
      avatarUrl: avatar,
    },
  },
};
