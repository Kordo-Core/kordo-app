import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Tag } from './Tag';
import { View } from 'react-native';

/**
 * Colored label for categories, statuses, or tags.
 *
 * ## Variants
 * - **appearance**: `primary`, `secondary`, `success`, `error`, `warning`, `info`
 */
export default {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Text displayed inside the tag',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color theme of the tag',
    },
  },
} satisfies Meta<typeof Tag>;

type Story = StoryObj<typeof Tag>;

export const Primary: Story = { args: { title: 'Primary', appearance: 'primary' } };
export const Secondary: Story = { args: { title: 'Secondary', appearance: 'secondary' } };
export const Success: Story = { args: { title: 'Success', appearance: 'success' } };
export const Error: Story = { args: { title: 'Error', appearance: 'error' } };
export const Warning: Story = { args: { title: 'Warning', appearance: 'warning' } };
export const Info: Story = { args: { title: 'Info', appearance: 'info' } };

/** The four heights: `xs` (counter), `sm`, `md` (default), `lg` (header label). */
export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Tag size="xs" title="3" />
      <Tag size="sm" title="Nouveau" />
      <Tag size="md" title="Arkose" />
      <Tag size="lg" title="100 blocs" appearance="secondary" />
    </View>
  ),
};

/** Soft backgrounds: trend up/down, card label, neutral label, label on a photo. */
export const SoftTones: Story = {
  render: () => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 16,
        backgroundColor: '#2F6B55',
      }}
    >
      <Tag appearance="soft" title="▲2" />
      <Tag appearance="softError" title="▼3" />
      <Tag appearance="surface" title="Surface" />
      <Tag appearance="muted" title="Réglette" />
      <Tag appearance="glass" title="★ 4,8" />
    </View>
  ),
};
