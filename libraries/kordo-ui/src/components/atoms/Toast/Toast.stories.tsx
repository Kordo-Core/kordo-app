import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

/**
 * Temporary overlay notification, used via `useToast()`.
 *
 * ## Variants
 * - **type**: `success`, `error`, `warning`, `info`
 * - **showLoader**: shows a progress bar countdown
 * - **isClosable**: shows a close button
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
      description: 'Message displayed inside the toast',
    },
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      description: 'Determines the color and icon of the toast',
    },
    showLoader: {
      control: 'boolean',
      description: 'Shows a progress bar countdown',
    },
    duration: {
      control: { type: 'number', min: 1000, max: 10000 },
      description: 'Display duration in ms',
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
    message: 'Operation successful!',
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
    message: 'An error occurred.',
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
    message: 'Warning: this action cannot be undone.',
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
    message: 'New update available.',
    type: 'info',
    icon: { name: 'info' },
    showLoader: true,
    isClosable: true,
    duration: 5000,
    delete: () => {},
  },
};
