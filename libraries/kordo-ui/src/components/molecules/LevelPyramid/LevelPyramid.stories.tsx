import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LevelPyramid } from './LevelPyramid';

/**
 * Pyramide de niveaux : blocs validés par niveau, du plus dur au plus facile.
 */
export default {
  title: 'Molecules/LevelPyramid',
  component: LevelPyramid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    levels: [
      { label: '7A', count: 14, color: '#F3B24E' },
      { label: '6C', count: 58, color: '#F8D39A' },
      { label: '6B', count: 132 },
      { label: '6A', count: 214 },
      { label: '≤5', count: 360 },
    ],
  },
} satisfies Meta<typeof LevelPyramid>;

type Story = StoryObj<typeof LevelPyramid>;

export const Default: Story = {};
