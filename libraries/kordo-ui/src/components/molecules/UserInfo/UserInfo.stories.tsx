import type { Meta, StoryObj } from '@storybook/react';
import { UserInfo } from './UserInfo';
import { UserPublic } from 'core';
import { Text } from '../../atoms/Text/Text';

/**
 * Displays user information with their avatar.
 *
 * ## Variants
 * - **layout**: `row` (side by side) or `column` (stacked)
 * - **highlightedAvatar**: colored border around the avatar
 * - **secondaryText** / **tertiaryText**: content below the username
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
      description: 'Layout direction for the avatar and text',
    },
    highlightedAvatar: {
      control: 'boolean',
      description: 'Adds a colored border around the avatar',
    },
    onPressUser: { action: 'user pressed' },
  },
} satisfies Meta<typeof UserInfo>;

type Story = StoryObj<typeof UserInfo>;

const mockUser: UserPublic = {
  id: '1',
  username: 'climbing_fan',
  avatarUrl:
    'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
};

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

/** Avatar with a colored border to indicate an active or online status. */
export const HighlightedAvatar: Story = {
  args: {
    user: mockUser,
    layout: 'row',
    highlightedAvatar: true,
    secondaryText: <Text appearance="gray">Online</Text>,
  },
};

/** With tertiary text (e.g. follower count). */
export const WithTertiaryText: Story = {
  args: {
    user: mockUser,
    layout: 'row',
    secondaryText: <Text appearance="gray">Boulder enthusiast</Text>,
    tertiaryText: (
      <Text appearance="primary" size="sm">
        42 followers
      </Text>
    ),
  },
};
