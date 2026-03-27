import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

/**
 * Cross-platform loading indicator (spinner or progress bar).
 *
 * ## Variants
 * - **type**: `spinner` (rotating circle) or `bar` (horizontal progress bar)
 * - **size**: `sm`, `md`, `lg` (spinner only)
 * - **appearance**: `primary`, `secondary`, `success`, `error`, `warning`, `info`
 * - **infinite**: loops the animation indefinitely
 */
export default {
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
      description: '`spinner` = rotating circle, `bar` = horizontal progress bar',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner (ignored for `bar`)',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color theme of the loader',
    },
    duration: {
      control: { type: 'number', min: 500, max: 5000 },
      description: 'Duration of one animation cycle in ms',
    },
    infinite: {
      control: 'boolean',
      description: 'Loops the animation indefinitely',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

/** Medium-sized spinner. */
export const Spinner: Story = {
  args: {
    type: 'spinner',
    size: 'md',
    appearance: 'primary',
    duration: 1000,
    infinite: true,
  },
};

/** Small spinner. */
export const SpinnerSmall: Story = {
  args: {
    type: 'spinner',
    size: 'sm',
    appearance: 'secondary',
    duration: 1000,
    infinite: true,
  },
};

/** Large spinner. */
export const SpinnerLarge: Story = {
  args: {
    type: 'spinner',
    size: 'lg',
    appearance: 'primary',
    duration: 1000,
    infinite: true,
  },
};

/** Infinite looping progress bar. */
export const Bar: Story = {
  args: {
    type: 'bar',
    appearance: 'primary',
    duration: 2000,
    infinite: true,
  },
};

/** Progress bar that plays once (non-infinite). */
export const BarProgress: Story = {
  args: {
    type: 'bar',
    appearance: 'success',
    duration: 3000,
    infinite: false,
  },
};
