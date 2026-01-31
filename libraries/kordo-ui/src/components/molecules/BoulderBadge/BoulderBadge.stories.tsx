import type { Meta, StoryObj } from '@storybook/react';
import { BoulderBadge } from './BoulderBadge';

const meta: Meta<typeof BoulderBadge> = {
  title: 'Molecules/BoulderBadge',
  component: BoulderBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    grade: {
      control: { type: 'range', min: 0, max: 30, step: 1 },
      description: 'Niveau de grade (0-30)',
    },
    avatarUrl: {
      control: 'text',
      description: 'URL de l\'avatar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BoulderBadge>;

const defaultAvatar = 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

export const Yellow: Story = {
  args: {
    avatarUrl: defaultAvatar,
    grade: 3,
  },
};

export const Green: Story = {
  args: {
    avatarUrl: defaultAvatar,
    grade: 8,
  },
};

export const Blue: Story = {
  args: {
    avatarUrl: defaultAvatar,
    grade: 13,
  },
};

export const Red: Story = {
  args: {
    avatarUrl: defaultAvatar,
    grade: 18,
  },
};

export const Black: Story = {
  args: {
    avatarUrl: defaultAvatar,
    grade: 23,
  },
};

export const Purple: Story = {
  args: {
    avatarUrl: defaultAvatar,
    grade: 28,
  },
};
