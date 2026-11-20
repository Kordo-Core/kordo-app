import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProgressBar } from './ProgressBar';

/**
 * Barre de progression qui se remplit à l'apparition (trophées, part de flash, pyramide…).
 */
export default {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    height: { control: { type: 'number' } },
    color: { control: 'color' },
  },
  args: { value: 0.33 },
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const Thick: Story = { args: { value: 0.6, height: 10, color: '#2F6B55' } };

export const Staggered: Story = {
  render: () => (
    <View style={{ gap: 10 }}>
      {[1, 0.7, 0.4, 0.15].map((v, i) => (
        <ProgressBar key={v} value={v} height={10} delay={i * 80} />
      ))}
    </View>
  ),
};
