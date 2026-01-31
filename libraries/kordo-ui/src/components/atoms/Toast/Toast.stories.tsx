import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Message du toast',
    },
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      description: 'Type de toast',
    },
    showLoader: {
      control: 'boolean',
      description: 'Afficher la barre de progression',
    },
    duration: {
      control: { type: 'number', min: 1000, max: 10000 },
      description: 'Durée d\'affichage en ms',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    id: '1',
    message: 'Opération réussie !',
    type: 'success',
    showLoader: true,
    isClosable: true,
    duration: 5000,
    delete: () => console.log('deleted'),
  },
};

export const Error: Story = {
  args: {
    id: '2',
    message: 'Une erreur est survenue.',
    type: 'error',
    showLoader: true,
    isClosable: true,
    duration: 5000,
    delete: () => console.log('deleted'),
  },
};

export const Warning: Story = {
  args: {
    id: '3',
    message: 'Attention, action irréversible.',
    type: 'warning',
    showLoader: false,
    isClosable: true,
    duration: 5000,
    delete: () => console.log('deleted'),
  },
};

export const Info: Story = {
  args: {
    id: '4',
    message: 'Nouvelle mise à jour disponible.',
    type: 'info',
    icon: { name: 'info' },
    showLoader: true,
    isClosable: true,
    duration: 5000,
    delete: () => console.log('deleted'),
  },
};
