import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Card } from './Card';
import { Text } from '../../atoms/Text/Text';

/**
 * Container with rounded corners and a drop shadow.
 *
 * ## Variants
 * - **isPressable**: enables bounce animation on press
 */
export default {
  title: 'Layouts/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isPressable: {
      control: 'boolean',
      description: 'Makes the card pressable with a bounce animation',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback fired on press (requires `isPressable`)',
    },
  },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
        <Text size="lg" bold>
          Card title
        </Text>
        <Text size="md" appearance="gray">
          Card description with some content.
        </Text>
      </div>
    ),
  },
};

/** Pressable card with a bounce animation on click. */
export const Pressable: Story = {
  args: {
    isPressable: true,
    children: (
      <div style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
        <Text size="lg" bold>
          Pressable card
        </Text>
        <Text size="md" appearance="gray">
          Click me to see the bounce animation.
        </Text>
      </div>
    ),
  },
};
