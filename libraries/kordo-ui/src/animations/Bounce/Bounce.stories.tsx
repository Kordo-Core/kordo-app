import type { Meta, StoryObj } from '@storybook/react';
import { Bounce } from './Bounce';
import { Button } from '../../components/atoms/Button/Button';

/**
 * Scale-down bounce animation on press, used internally by `Button` and `Card`.
 *
 * ## Variants
 * - **scaleTo**: bounce intensity (`0.95` subtle, `0.8` strong)
 * - **duration**: animation duration in ms
 * - **disabled**: disables interaction and animation
 */
export default {
  title: 'Animations/Bounce',
  component: Bounce,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    scaleTo: {
      control: { type: 'range', min: 0.8, max: 1, step: 0.01 },
      description: 'Target scale on press (0.8 = strong, 1 = no effect)',
    },
    duration: {
      control: { type: 'number', min: 50, max: 500 },
      description: 'Animation duration in ms',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the animation and the onPress callback',
    },
    onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof Bounce>;

type Story = StoryObj<typeof Bounce>;

export const Default: Story = {
  args: {
    scaleTo: 0.95,
    duration: 200,
    children: <Button title="Click me" appearance="primary" onPress={() => {}} />,
  },
};
