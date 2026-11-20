import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DateSeal } from './DateSeal';

/**
 * Round double-ring date seal: the day is large, the month sits below.
 */
export default {
  title: 'Molecules/DateSeal',
  component: DateSeal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateSeal>;

type Story = StoryObj<typeof DateSeal>;

export const Default: Story = {
  args: {
    day: '29',
    month: 'OCT',
    color: '#2F62C8',
  },
};
