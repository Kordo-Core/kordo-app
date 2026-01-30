import type { Meta, StoryObj } from '@storybook/react';
import { UserInfo } from './UserInfo';
import { Text } from '../../atoms/Text/Text';

/**
 * Le composant **UserInfo** affiche les informations d'un utilisateur avec son avatar.
 * Peut être affiché en ligne (row) ou en colonne.
 *
 * ## Utilisation
 * ```tsx
 * <UserInfo
 *   user={{ id: '1', username: 'john', avatarUrl: '...' }}
 *   layout="row"
 *   onPressUser={(user) => navigate(`/profile/${user.id}`)}
 * />
 * ```
 */
const meta: Meta<typeof UserInfo> = {
  title: 'Molecules/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['row', 'column'],
      description: "Disposition de l'avatar et du texte",
    },
    highlightedAvatar: {
      control: 'boolean',
      description: "Ajoute une bordure colorée autour de l'avatar",
    },
    onPressUser: { action: 'user pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof UserInfo>;

const mockUser = {
  id: '1',
  username: 'climbing_fan',
  avatarUrl: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
} as any;

export const Row: Story = {
  args: {
    user: mockUser,
    layout: 'row',
    secondaryText: <Text appearance="gray">Paris, France</Text>,
  },
};

export const Column: Story = {
  args: {
    user: mockUser,
    layout: 'column',
    secondaryText: <Text appearance="gray">@climbing_fan</Text>,
  },
};

export const HighlightedAvatar: Story = {
  args: {
    user: mockUser,
    layout: 'row',
    highlightedAvatar: true,
    secondaryText: <Text appearance="gray">En ligne</Text>,
  },
};

export const WithTertiaryText: Story = {
  args: {
    user: mockUser,
    layout: 'row',
    secondaryText: <Text appearance="gray">Boulder enthusiast</Text>,
    tertiaryText: <Text appearance="primary" size="sm">42 followers</Text>,
  },
};
