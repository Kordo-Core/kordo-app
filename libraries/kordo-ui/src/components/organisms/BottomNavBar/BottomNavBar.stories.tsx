import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavBar } from './BottomNavBar';

export default {
  title: 'Organisms/BottomNavBar',
  component: BottomNavBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BottomNavBar>;

type Story = StoryObj<typeof BottomNavBar>;

export const Default: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 400, backgroundColor: '#f5f5f5' }}>
      <BottomNavBar tabs={[]} />
    </div>
  ),
};
