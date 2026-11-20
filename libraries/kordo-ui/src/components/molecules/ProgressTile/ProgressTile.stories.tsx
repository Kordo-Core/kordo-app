import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProgressTile } from './ProgressTile';

/**
 * Selectable progress tile, meant to sit on a green hero card:
 * color dot, counter and progress bar.
 */
export default {
  title: 'Molecules/ProgressTile',
  component: ProgressTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 120, padding: 12, backgroundColor: '#2F6B55' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProgressTile>;

type Story = StoryObj<typeof ProgressTile>;

export const Default: Story = {
  args: {
    label: '3 / 24',
    color: '#F2C94C',
    value: 0.125,
    accessibilityLabel: 'Couleur jaune, 3 validés sur 24',
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};
