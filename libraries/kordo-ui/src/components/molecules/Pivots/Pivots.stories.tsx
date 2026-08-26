import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Pivots } from './Pivots';
import { phoneFrame } from '../../../../.storybook/decorators';

/**
 * Row of pivots with a sliding underline marking the selected one.
 */
export default {
  title: 'Molecules/Pivots',
  component: Pivots,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneFrame],
  argTypes: {
    pivots: {
      control: 'object',
      description: 'Labels of the pivots to display',
    },
    selectedPivot: {
      control: 'text',
      description: 'Label of the pivot selected on mount',
    },
    onPivotChange: { action: 'pivot changed' },
  },
} satisfies Meta<typeof Pivots>;

type Story = StoryObj<typeof Pivots>;

export const Default: Story = {
  args: { pivots: ['Feed', 'Sessions', 'Profile', 'Settings'], selectedPivot: 'Sessions' },
};
