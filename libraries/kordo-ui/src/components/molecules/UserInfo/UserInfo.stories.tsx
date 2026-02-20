import type { Meta, StoryObj } from '@storybook/react';
import { UserInfo } from './UserInfo';
import { Text } from '../../atoms/Text/Text';

/**
 * Affiche les informations d'un utilisateur avec son avatar.
 * Supporte deux dispositions et un texte secondaire/tertiaire.
 *
 * ## Variantes
 * - **layout**: `row` (avatar + texte côte à côte) ou `column` (empilé)
 * - **highlightedAvatar**: ajoute une bordure colorée autour de l'avatar
 * - **secondaryText** / **tertiaryText**: slots de contenu sous le nom
 */
export default {
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
} satisfies Meta<typeof UserInfo>;

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

/** Avatar avec bordure colorée pour indiquer un statut actif. */
export const HighlightedAvatar: Story = {
  args: {
    user: mockUser,
    layout: 'row',
    highlightedAvatar: true,
    secondaryText: <Text appearance="gray">En ligne</Text>,
  },
};

/** Avec texte tertiaire (ex: nombre de followers). */
export const WithTertiaryText: Story = {
  args: {
    user: mockUser,
    layout: 'row',
    secondaryText: <Text appearance="gray">Boulder enthusiast</Text>,
    tertiaryText: <Text appearance="primary" size="sm">42 followers</Text>,
  },
};
