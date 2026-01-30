import type { Meta, StoryObj } from '@storybook/react';
import { Suggestion } from './Suggestion';

/**
 * Le composant **Suggestion** affiche une carte de suggestion d'utilisateur à suivre.
 * Utilisé dans le feed pour recommander des profils.
 *
 * ## Utilisation
 * ```tsx
 * <Suggestion
 *   user={{ id: '1', username: 'john_doe' }}
 *   location="Climb Up Paris"
 *   onPressUser={(user) => navigate(`/profile/${user.id}`)}
 *   onPressLocation={(loc) => navigate(`/gym/${loc}`)}
 *   onPressFollow={() => followUser()}
 *   onPressClose={() => dismissSuggestion()}
 * />
 * ```
 */
const meta: Meta<typeof Suggestion> = {
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
      description: 'Lieu où vous avez croisé cet utilisateur',
    },
    onPressUser: { action: 'user pressed' },
    onPressLocation: { action: 'location pressed' },
    onPressFollow: { action: 'follow pressed' },
    onPressClose: { action: 'close pressed' },
  },
};

export default meta;
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
