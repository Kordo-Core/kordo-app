import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Animations/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: { type: 'number', min: 0, max: 32 },
      description: 'Espacement entre les éléments',
    },
    height: {
      control: { type: 'number', min: 50, max: 300 },
      description: 'Hauteur du slider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const Card = ({ color, text }: { color: string; text: string }) => (
  <div
    style={{
      width: 150,
      height: 100,
      backgroundColor: color,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
    }}
  >
    {text}
  </div>
);

export const Default: Story = {
  args: {
    gap: 16,
    height: 120,
    children: [
      <Card key="1" color="#6366f1" text="Card 1" />,
      <Card key="2" color="#8b5cf6" text="Card 2" />,
      <Card key="3" color="#a855f7" text="Card 3" />,
      <Card key="4" color="#d946ef" text="Card 4" />,
      <Card key="5" color="#ec4899" text="Card 5" />,
    ],
  },
};

export const Compact: Story = {
  args: {
    gap: 8,
    height: 80,
    children: [
      <Card key="1" color="#22c55e" text="1" />,
      <Card key="2" color="#16a34a" text="2" />,
      <Card key="3" color="#15803d" text="3" />,
      <Card key="4" color="#166534" text="4" />,
      <Card key="5" color="#14532d" text="5" />,
      <Card key="6" color="#052e16" text="6" />,
    ],
  },
};

export const Spaced: Story = {
  args: {
    gap: 32,
    height: 150,
    children: [
      <Card key="1" color="#f59e0b" text="Item A" />,
      <Card key="2" color="#d97706" text="Item B" />,
      <Card key="3" color="#b45309" text="Item C" />,
    ],
  },
};
