import type { Meta, StoryObj } from '@storybook/react';
import { Suggestion } from './Suggestion';

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

/** Suggestion card without a location. */
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
