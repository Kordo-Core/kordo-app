import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Toast } from './Toast';
import { ToastProvider, useToast } from '../../layouts/ToastProvider/ToastProvider';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { phoneScreen } from '../../../../.storybook/decorators';

/**
 * Temporary notification stacked at the bottom of the screen.
 *
 * A `Toast` is never mounted by hand: it is queued through `useToast().addToast()` and
 * rendered by the `ToastProvider` that wraps the app. These stories therefore drive the
 * real provider — what you see is exactly what the app produces.
 *
 * ## Variants
 * - **type**: `success`, `error`, `warning`, `info` — drives the color and the icon
 * - **showLoader**: countdown bar mirroring the remaining duration
 * - **isClosable**: adds a close button
 */
export default {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  // Le conteneur de toasts se positionne en absolu : le cadre téléphone lui sert d'écran,
  // les toasts se posent donc en bas comme sur mobile.
  decorators: [phoneScreen],
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

type ToastType = 'success' | 'error' | 'warning' | 'info';

const TRIGGERS: { type: ToastType; label: string; message: string; icon: string }[] = [
  { type: 'success', label: 'Success', message: 'Operation successful!', icon: 'checkmark-circle' },
  { type: 'error', label: 'Error', message: 'Something went wrong.', icon: 'dismiss-circle' },
  { type: 'warning', label: 'Warning', message: 'Check your connection.', icon: 'warning' },
  { type: 'info', label: 'Info', message: 'New update available.', icon: 'info' },
];

const Triggers = ({ showLoader }: { showLoader: boolean }) => {
  const { addToast } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
      <Text size="lg" bold>
        {showLoader ? 'With countdown bar' : 'Toast notifications'}
      </Text>
      <Text appearance="gray">Each button raises the toast matching its own color.</Text>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {TRIGGERS.map(({ type, label, message, icon }) => (
          <Button
            key={type}
            title={label}
            // Le bouton porte l'apparence du toast qu'il déclenche.
            appearance={type}
            icon={{ name: icon }}
            onPress={() =>
              addToast({
                message,
                type,
                icon: { name: icon },
                showLoader,
                isClosable: true,
                duration: showLoader ? 4000 : 3000,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Triggers showLoader={false} />
    </ToastProvider>
  ),
};

/** Same four types, with the countdown bar showing the remaining time. */
export const WithLoader: Story = {
  render: () => (
    <ToastProvider>
      <Triggers showLoader />
    </ToastProvider>
  ),
};
