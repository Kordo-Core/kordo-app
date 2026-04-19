import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';

/**
 * Notification provider that exposes the `useToast()` hook.
 *
 * ## Variants
 * - **type**: `success`, `error`, `warning`, `info`
 * - **showLoader**: shows a progress bar countdown on the toast
 * - **isClosable**: shows a close button on the toast
 */
export default {
  title: 'Layouts/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 500, transform: 'scale(1)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

type Story = StoryObj<typeof ToastProvider>;

const ToastButtons = () => {
  const { addToast } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
      <Text size="lg" bold>
        Toast Notifications
      </Text>
      <Text appearance="gray">Click the buttons below to trigger different toast types.</Text>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        <Button
          title="Success"
          appearance="primary"
          onPress={() =>
            addToast({
              message: 'Operation successful!',
              type: 'success',
              showLoader: false,
              isClosable: true,
              duration: 3000,
            })
          }
        />
        <Button
          title="Error"
          appearance="secondary"
          onPress={() =>
            addToast({
              message: 'Something went wrong.',
              type: 'error',
              showLoader: false,
              isClosable: true,
              duration: 3000,
            })
          }
        />
        <Button
          title="Warning"
          appearance="black"
          onPress={() =>
            addToast({
              message: 'Check your connection.',
              type: 'warning',
              showLoader: false,
              isClosable: true,
              duration: 3000,
              icon: { name: 'warning' },
            })
          }
        />
        <Button
          title="Info"
          appearance="primary"
          inverted
          onPress={() =>
            addToast({
              message: 'New update available.',
              type: 'info',
              showLoader: false,
              isClosable: true,
              duration: 3000,
              icon: { name: 'info' },
            })
          }
        />
      </div>

      <Text size="lg" bold>
        With Loader
      </Text>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button
          title="Success + loader"
          appearance="primary"
          onPress={() =>
            addToast({
              message: 'Saving changes...',
              type: 'success',
              showLoader: true,
              isClosable: true,
              duration: 4000,
              icon: { name: 'checkmark' },
            })
          }
        />
        <Button
          title="Error + loader"
          appearance="secondary"
          onPress={() =>
            addToast({
              message: 'Retrying request...',
              type: 'error',
              showLoader: true,
              isClosable: true,
              duration: 4000,
            })
          }
        />
        <Button
          title="Info + loader"
          appearance="primary"
          inverted
          onPress={() =>
            addToast({
              message: 'Syncing data...',
              type: 'info',
              showLoader: true,
              isClosable: true,
              duration: 5000,
              icon: { name: 'arrow-sync' },
            })
          }
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  ),
};
