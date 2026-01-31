import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Atoms/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['spinner', 'bar'],
      description: 'Type de loader',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du loader',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Couleur du loader',
    },
    duration: {
      control: { type: 'number', min: 500, max: 5000 },
      description: 'Durée de l\'animation en ms',
    },
    infinite: {
      control: 'boolean',
      description: 'Animation infinie',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Spinner: Story = {
  args: {
    type: 'spinner',
    size: 'md',
    appearance: 'primary',
    duration: 1000,
    infinite: true,
  },
};

export const SpinnerSmall: Story = {
  args: {
    type: 'spinner',
    size: 'sm',
    appearance: 'secondary',
    duration: 1000,
    infinite: true,
  },
};

export const SpinnerLarge: Story = {
  args: {
    type: 'spinner',
    size: 'lg',
    appearance: 'primary',
    duration: 1000,
    infinite: true,
  },
};

export const Bar: Story = {
  args: {
    type: 'bar',
    appearance: 'primary',
    duration: 2000,
    infinite: true,
  },
};

export const BarProgress: Story = {
  args: {
    type: 'bar',
    appearance: 'success',
    duration: 3000,
    infinite: false,
  },
};
