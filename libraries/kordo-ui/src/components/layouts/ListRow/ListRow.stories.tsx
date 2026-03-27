import type { Meta, StoryObj } from '@storybook/react';
import { ListRow } from './ListRow';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';

/**
 * Flexible list row with left, center, and right slots.
 *
 * ## Slots
 * - **left**: element on the left (icon, avatar…)
 * - **primaryText** / **secondaryText**: central content
 * - **right**: element on the right (icon, button…)
 */
export default {
  title: 'Layouts/ListRow',
  component: ListRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ListRow>;

type Story = StoryObj<typeof ListRow>;

export const Default: Story = {
  args: {
    primaryText: <Text size="lg">Primary title</Text>,
    secondaryText: <Text appearance="gray">Secondary text</Text>,
  },
};

/** Row with icons on both left and right. */
export const WithIcons: Story = {
  args: {
    left: <Icon name="user" size={24} color="primary" />,
    primaryText: <Text size="lg">My profile</Text>,
    secondaryText: <Text appearance="gray">View and edit</Text>,
    right: <Icon name="chevron-right" size={20} color="gray" />,
  },
};

/** Row with an action button on the right. */
export const WithButton: Story = {
  args: {
    left: <Icon name="bell" size={24} color="secondary" />,
    primaryText: <Text size="lg">Notifications</Text>,
    secondaryText: <Text appearance="gray">3 new</Text>,
    right: <Button title="View" appearance="primary" size="md" />,
  },
};

/** Settings-style row with a chevron indicator. */
export const SettingsItem: Story = {
  args: {
    left: <Icon name="settings" size={24} color="gray" />,
    primaryText: <Text size="lg">Settings</Text>,
    right: <Icon name="chevron-right" size={20} color="gray" />,
  },
};
