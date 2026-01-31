import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['home', 'user', 'settings', 'search', 'heart', 'star', 'check', 'x', 'plus', 'minus', 'arrow-left', 'arrow-right', 'send', 'edit', 'trash'],
      description: 'Nom de l\'icône Feather',
    },
    size: {
      control: { type: 'number', min: 12, max: 48 },
      description: 'Taille de l\'icône en pixels',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray', 'white'],
      description: 'Couleur de l\'icône',
    },
    onPress: {
      action: 'pressed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    name: 'star',
    size: 16,
    color: 'secondary',
  },
};

export const Large: Story = {
  args: {
    name: 'heart',
    size: 40,
    color: 'primary',
  },
};

export const Clickable: Story = {
  args: {
    name: 'settings',
    size: 24,
    color: 'gray',
  },
};
