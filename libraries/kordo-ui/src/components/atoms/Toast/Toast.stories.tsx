import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

/**
 * Notification temporaire affichée en overlay, avec 4 types de statut.
 * Généralement utilisé via `useToast()` depuis `ToastProvider`.
 *
 * ## Variantes
 * - **type**: `success`, `error`, `warning`, `info`
 * - **showLoader**: affiche une barre de progression qui se vide sur `duration` ms
 * - **isClosable**: affiche un bouton de fermeture
 */
export default {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Message affiché dans le toast',
    },
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      description: 'Détermine la couleur et l\'icône du toast',
    },
    showLoader: {
      control: 'boolean',
      description: 'Affiche une barre de progression',
    },
    duration: {
      control: { type: 'number', min: 1000, max: 10000 },
      description: "Durée d'affichage en ms",
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    id: '1',
    message: 'Opération réussie !',
    type: 'success',
    showLoader: true,
    isClosable: true,
    duration: 5000,
    delete: () => {},
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
    delete: () => {},
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
    delete: () => {},
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
    delete: () => {},
  },
};
