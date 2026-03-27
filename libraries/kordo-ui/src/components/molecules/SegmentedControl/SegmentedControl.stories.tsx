import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';
import { useState } from 'react';

/**
 * Segmented selector, an alternative to tabs or radio buttons.
 *
 * ## Variants
 * - **size**: `md`, `lg`
 * - **borderRadius**: `rounded`, `square`
 * - **segments**: array of `{ text, color? }`
 */
export default {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'Size of the control',
    },
    borderRadius: {
      control: 'radio',
      options: ['rounded', 'square'],
      description: 'Corner shape',
    },
  },
} satisfies Meta<typeof SegmentedControl>;

type Story = StoryObj<typeof SegmentedControl>;

const SegmentedControlWithState = (args: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return <SegmentedControl {...args} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />;
};

export const Default: Story = {
  render: (args) => <SegmentedControlWithState {...args} />,
  args: {
    segments: [{ text: 'Day' }, { text: 'Week' }, { text: 'Month' }],
    size: 'lg',
    borderRadius: 'rounded',
  },
};

/** Each segment with its own indicator color. */
export const WithColors: Story = {
  render: (args) => <SegmentedControlWithState {...args} />,
  args: {
    segments: [
      { text: 'Easy', color: '#22c55e' },
      { text: 'Medium', color: '#f59e0b' },
      { text: 'Hard', color: '#ef4444' },
    ],
    size: 'lg',
    borderRadius: 'rounded',
  },
};

export const Square: Story = {
  render: (args) => <SegmentedControlWithState {...args} />,
  args: {
    segments: [{ text: 'On' }, { text: 'Off' }],
    size: 'md',
    borderRadius: 'square',
  },
};
