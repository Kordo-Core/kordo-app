import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LiveBadge } from './LiveBadge';

/**
 * "Live" pill: a pulsing green dot and its label.
 */
export default {
  title: 'Molecules/LiveBadge',
  component: LiveBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LiveBadge>;

type Story = StoryObj<typeof LiveBadge>;

export const Default: Story = {
  args: {
    label: '47 en séance',
  },
};
