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
    // La barre occupe toute la largeur donnée, le spinner se centre dedans.
    (Story) => (
      <div style={{ width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

/** The three spinner sizes side by side. */
export const SpinnerSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Loader type="spinner" size="sm" appearance="secondary" duration={1000} infinite />
      <Loader type="spinner" size="md" appearance="primary" duration={1000} infinite />
      <Loader type="spinner" size="lg" appearance="success" duration={1000} infinite />
    </div>
  ),
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
