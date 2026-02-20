import type { Meta, StoryObj } from '@storybook/react';
import { Suggestion } from './Suggestion';

/**
 * Carte de suggestion d'utilisateur à suivre, affichée dans le feed.
 * Affiche l'avatar, le pseudo, le lieu de rencontre optionnel et un bouton de suivi.
 *
 * ## Variantes
 * - **location**: si fourni, affiche le lieu où l'utilisateur a été croisé
 * - **isFollowing**: change l'état du bouton Follow
 */
export default {
  title: 'Molecules/Suggestion',
  component: Suggestion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isFollowing: {
      control: 'boolean',
      description: "Indique si l'utilisateur est déjà suivi",
    },
    location: {
      control: 'text',
      description: 'Lieu où vous avez croisé cet utilisateur (optionnel)',
    },
    onPressUser: { action: 'user pressed' },
    onPressLocation: { action: 'location pressed' },
    onPressFollow: { action: 'follow pressed' },
    onPressClose: { action: 'close pressed' },
  },
} satisfies Meta<typeof Suggestion>;

type Story = StoryObj<typeof Suggestion>;

export const Default: Story = {
  args: {
    isFollowing: false,
    user: {
      id: '1',
      username: 'climbing_fan',
      avatarUrl: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
    } as any,
    location: 'Climb Up Paris',
  },
};

/** Suggestion sans localisation. */
export const WithoutLocation: Story = {
  args: {
    isFollowing: false,
    user: {
      id: '2',
      username: 'boulder_master',
      avatarUrl: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
    } as any,
  },
};
