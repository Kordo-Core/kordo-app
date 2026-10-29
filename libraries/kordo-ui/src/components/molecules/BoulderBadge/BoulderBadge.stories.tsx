import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoulderBadge } from './BoulderBadge';

/**
 * Avatar badge colored according to the user's boulder grade.
 *
 * ## Variants
 * - **grade**: `0–5` yellow, `6–10` green, `11–15` blue, `16–20` red, `21–25` black, `26+` purple
 * - **avatarUrl**: URL of the avatar image
 */
export default {
  title: 'Molecules/BoulderBadge',
  component: BoulderBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    grade: {
      control: { type: 'range', min: 0, max: 30, step: 1 },
      description: 'Boulder grade (0–30) — determines the badge color',
    },
    avatarUrl: {
      control: 'text',
      description: 'URL of the avatar image',
    },
  },
} satisfies Meta<typeof BoulderBadge>;

type Story = StoryObj<typeof BoulderBadge>;

const defaultAvatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

export const Yellow: Story = { args: { avatarUrl: defaultAvatar, grade: 3 } };
export const Green: Story = { args: { avatarUrl: defaultAvatar, grade: 8 } };
export const Blue: Story = { args: { avatarUrl: defaultAvatar, grade: 13 } };
export const Red: Story = { args: { avatarUrl: defaultAvatar, grade: 18 } };
export const Black: Story = { args: { avatarUrl: defaultAvatar, grade: 23 } };
export const Purple: Story = { args: { avatarUrl: defaultAvatar, grade: 28 } };
