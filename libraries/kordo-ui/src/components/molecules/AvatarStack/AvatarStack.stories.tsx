import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { AvatarStack } from './AvatarStack';

/**
 * Overlapping rounded-square avatars.
 */
export default {
  title: 'Molecules/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AvatarStack>;

type Story = StoryObj<typeof AvatarStack>;

export const Default: Story = {
  args: {
    uris: [
      'https://i.pravatar.cc/300?img=47',
      'https://i.pravatar.cc/300?img=12',
      'https://i.pravatar.cc/300?img=32',
    ],
  },
};
