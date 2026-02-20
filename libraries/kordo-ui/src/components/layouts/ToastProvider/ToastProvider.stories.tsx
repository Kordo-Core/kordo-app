import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './ToastProvider';

/**
 * Provider de notifications à envelopper autour de l'application.
 * Expose le hook `useToast()` pour déclencher des toasts depuis n'importe quel composant enfant.
 *
 * ## Utilisation
 * ```tsx
 * // Racine de l'app
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Dans un composant enfant
 * const { addToast } = useToast();
 * addToast({ message: 'Succès !', type: 'success', duration: 3000 });
 * ```
 */
export default {
  title: 'Layouts/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ToastProvider>;

type Story = StoryObj<typeof ToastProvider>;

const ToastButtons = () => {
  const { addToast } = useToast();

  return (
    <div style={{ display: 'flex', gap: 10, padding: 20 }}>
      <button
        onClick={() => addToast({ message: 'Opération réussie !', type: 'success', showLoader: true, isClosable: true, duration: 3000 })}
        style={{ padding: '8px 16px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: 4 }}
      >
        Success
      </button>
      <button
        onClick={() => addToast({ message: 'Une erreur est survenue.', type: 'error', showLoader: true, isClosable: true, duration: 3000 })}
        style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 4 }}
      >
        Error
      </button>
      <button
        onClick={() => addToast({ message: 'Attention !', type: 'warning', showLoader: false, isClosable: true, duration: 3000 })}
        style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: 4 }}
      >
        Warning
      </button>
      <button
        onClick={() => addToast({ message: 'Information importante.', type: 'info', showLoader: true, isClosable: true, duration: 3000 })}
        style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: 4 }}
      >
        Info
      </button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <div style={{ minHeight: 400, backgroundColor: '#f5f5f5' }}>
        <ToastButtons />
        <p style={{ padding: 20 }}>Cliquez sur les boutons pour afficher des toasts.</p>
      </div>
    </ToastProvider>
  ),
};
