import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

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
