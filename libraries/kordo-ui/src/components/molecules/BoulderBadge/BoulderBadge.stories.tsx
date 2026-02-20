import type { Meta, StoryObj } from '@storybook/react';
import { BoulderBadge } from './BoulderBadge';

/**
 * Badge d'avatar coloré selon le grade de bloc de l'utilisateur.
 * La couleur du contour change automatiquement en fonction de la plage de `grade`.
 *
 * ## Couleurs par grade
 * - **0–5** : Jaune
 * - **6–10** : Vert
 * - **11–15** : Bleu
 * - **16–20** : Rouge
 * - **21–25** : Noir
 * - **26+** : Violet
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
      description: 'Grade de bloc (0–30) — détermine la couleur du badge',
    },
    avatarUrl: {
      control: 'text',
      description: "URL de l'image d'avatar",
    },
  },
} satisfies Meta<typeof BoulderBadge>;

type Story = StoryObj<typeof BoulderBadge>;

const defaultAvatar = 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

export const Yellow: Story = { args: { avatarUrl: defaultAvatar, grade: 3 } };
export const Green: Story = { args: { avatarUrl: defaultAvatar, grade: 8 } };
export const Blue: Story = { args: { avatarUrl: defaultAvatar, grade: 13 } };
export const Red: Story = { args: { avatarUrl: defaultAvatar, grade: 18 } };
export const Black: Story = { args: { avatarUrl: defaultAvatar, grade: 23 } };
export const Purple: Story = { args: { avatarUrl: defaultAvatar, grade: 28 } };
