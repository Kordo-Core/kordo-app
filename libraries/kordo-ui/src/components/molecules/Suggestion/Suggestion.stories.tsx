import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Suggestion } from './Suggestion';
import { UserPublic } from 'core';

/**
 * Suggestion card for a user to follow.
 *
 * ## Variants
 * - **location**: gym or location where the user was encountered (optional)
 * - **isFollowing**: current follow state of the Follow button
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
      description: 'Indicates whether the user is already being followed',
    },
    location: {
      control: 'text',
      description: 'Location where you encountered this user (optional)',
    },
    onPressUser: { action: 'user pressed' },
    onPressLocation: { action: 'location pressed' },
    onPressFollow: { action: 'follow pressed' },
    onPressClose: { action: 'close pressed' },
  },
} satisfies Meta<typeof Suggestion>;

type Story = StoryObj<typeof Suggestion>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

const mockUser: UserPublic = { id: '1', username: 'climbing_fan', avatarUrl: avatar };
const otherUser: UserPublic = { id: '2', username: 'boulder_master', avatarUrl: avatar };

export const Default: Story = {
  args: {
    isFollowing: false,
    user: mockUser,
    location: 'Climb Up Paris',
  },
};

/** Suggestion card without a location. */
export const WithoutLocation: Story = {
  args: {
    isFollowing: false,
    user: otherUser,
  },
};
