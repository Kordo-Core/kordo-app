import type { Meta, StoryObj } from '@storybook/react';
import { Now } from './Now';
import { NowPublic } from 'core';

/**
 * Carte d'une publication "Now" : un utilisateur actuellement en séance dans une salle.
 *
 * Réutilise `Card`, `UserInfo` (mode `highlightedAvatar` → badge Now) et `Text`.
 */
export default {
  title: 'Organisms/Now',
  component: Now,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onPressUser: { action: 'user pressed' },
  },
} satisfies Meta<typeof Now>;

type Story = StoryObj<typeof Now>;

const mockNow: NowPublic = {
  id: '1',
  user: {
    id: 'u1',
    username: 'antoine',
    firstName: 'Antoine',
    lastName: 'Rios Campo',
    avatarUrl:
      'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
  },
  gym: { id: 'g1', name: 'Arkose Nation' },
  createdAt: '2026-06-15T10:00:00Z',
};

export const Default: Story = {
  args: {
    now: mockNow,
  },
};
