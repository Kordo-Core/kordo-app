import type { Meta, StoryObj } from '@storybook/react';
import { Bounce } from './Bounce';

const meta: Meta<typeof Bounce> = {
  title: 'Animations/Bounce',
  component: Bounce,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    scaleTo: {
      control: { type: 'range', min: 0.8, max: 1, step: 0.01 },
      description: 'Échelle lors du clic (0.8 - 1)',
    },
    duration: {
      control: { type: 'number', min: 50, max: 500 },
      description: 'Durée de l\'animation en ms',
    },
    onPress: {
      action: 'pressed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Bounce>;

export const Default: Story = {
  args: {
    scaleTo: 0.95,
    duration: 200,
    children: (
      <div
        style={{
          padding: '16px 32px',
          backgroundColor: '#6366f1',
          color: 'white',
          borderRadius: 8,
          fontWeight: 'bold',
        }}
      >
        Cliquez-moi
      </div>
    ),
  },
};

export const Subtle: Story = {
  args: {
    scaleTo: 0.98,
    duration: 150,
    children: (
      <div
        style={{
          padding: '12px 24px',
          backgroundColor: '#f3f4f6',
          borderRadius: 8,
        }}
      >
        Animation subtile
      </div>
    ),
  },
};

export const Strong: Story = {
  args: {
    scaleTo: 0.85,
    duration: 300,
    children: (
      <div
        style={{
          padding: '20px 40px',
          backgroundColor: '#ef4444',
          color: 'white',
          borderRadius: 12,
          fontWeight: 'bold',
        }}
      >
        Animation forte
      </div>
    ),
  },
};
