import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text } from './Text';

/**
 * Base typography component, cross-platform.
 *
 * ## Variants
 * - **size**: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
 * - **appearance**: `primary`, `secondary`, `black`, `gray`, `white`
 * - **bold**: renders text in bold weight
 */
export default {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Font size',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray', 'white'],
      description: 'Text color',
    },
    bold: {
      control: 'boolean',
      description: 'Renders text in bold weight',
    },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: 'Hello World', size: 'md', appearance: 'black' },
};

/** All available sizes. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md)</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
      <Text size="xxl">XXL (xxl)</Text>
    </div>
  ),
};

/** All available colors. */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text appearance="primary">Primary</Text>
      <Text appearance="secondary">Secondary</Text>
      <Text appearance="black">Black</Text>
      <Text appearance="gray">Gray</Text>
    </div>
  ),
};

export const Bold: Story = {
  args: { children: 'Bold Text', size: 'lg', bold: true },
};
