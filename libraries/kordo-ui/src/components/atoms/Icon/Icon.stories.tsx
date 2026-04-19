import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'home', 'search', 'heart', 'star', 'checkmark', 'dismiss', 'add', 'subtract',
        'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'send', 'edit', 'delete',
        'eye', 'eye-off', 'lock-closed', 'lock-open', 'alert', 'location', 'calendar',
        'clock', 'camera', 'image', 'checkmark-circle', 'dismiss-circle', 'warning', 'info',
        'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'sign-out',
        'navigation', 'more-horizontal', 'more-vertical', 'person', 'settings',
        'filter', 'share', 'copy', 'mail', 'chat', 'phone', 'link', 'document', 'folder',
      ],
      description: 'Fluent UI icon name',
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      table: { defaultValue: { summary: '24' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray', 'white', 'success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: 'home', size: 24, color: 'primary' },
};

export const Small: Story = {
  args: { name: 'star', size: 16, color: 'secondary' },
};

export const Large: Story = {
  args: { name: 'heart', size: 40, color: 'primary' },
};

export const StatusColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="checkmark-circle" size={24} color="success" />
      <Icon name="dismiss-circle" size={24} color="error" />
      <Icon name="warning" size={24} color="warning" />
      <Icon name="info" size={24} color="info" />
    </div>
  ),
};
