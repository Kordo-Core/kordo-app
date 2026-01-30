import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

/**
 * Le composant **Tag** affiche un label coloré, utile pour les catégories, statuts, etc.
 *
 * ## Utilisation
 * ```tsx
 * <Tag title="Nouveau" appearance="primary" />
 * ```
 */
const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Texte affiché dans le tag',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Couleur du tag',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    title: 'Primary',
    appearance: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary',
    appearance: 'secondary',
  },
};

export const Success: Story = {
  args: {
    title: 'Success',
    appearance: 'success',
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    appearance: 'error',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    appearance: 'warning',
  },
};

export const Info: Story = {
  args: {
    title: 'Info',
    appearance: 'info',
  },
};
