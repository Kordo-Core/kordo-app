import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Interactive button with a bounce animation on press.
 *
 * ## Variants
 * - **appearance**: `primary`, `secondary`, `black`, `gray`
 * - **size**: `md` (default), `lg`
 * - **inverted**: inverts colors (white background, colored text and border)
 * - **borderRadius**: `square` (default), `rounded`
 * - **icon**: adds a Feather icon
 */
export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Text displayed inside the button',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray'],
      description: 'Color theme of the button',
    },
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'Button size (`md` = 36px height, `lg` = 60px height)',
    },
    inverted: {
      control: 'boolean',
      description: 'Inverts colors: white background with colored text and border',
    },
    borderRadius: {
      control: 'radio',
      options: ['square', 'rounded'],
      description: 'Corner shape of the button',
    },
    borderless: {
      control: 'boolean',
      description: 'Removes the border',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and suppresses onPress',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback fired on press',
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

/**
 * Default button with text.
 */
export const Default: Story = {
  args: {
    title: 'Click me',
    appearance: 'primary',
    size: 'md',
    borderRadius: 'square',
  },
};

/**
 * Large button (`size="lg"`). 60px height with wider horizontal padding.
 */
export const Large: Story = {
  args: {
    title: 'Submit',
    appearance: 'primary',
    size: 'lg',
  },
};

/**
 * Inverted button: white background with text and border colored by `appearance`.
 */
export const Inverted: Story = {
  args: {
    title: 'Cancel',
    appearance: 'primary',
    inverted: true,
  },
};

/**
 * Icon-only button: displays a single icon with no text.
 * The button takes a square shape (36×36 in `md`, 60×60 in `lg`).
 */
export const IconButton: Story = {
  args: {
    appearance: 'primary',
    icon: { name: 'check' },
  },
};

/**
 * Secondary appearance button.
 */
export const Secondary: Story = {
  args: {
    title: 'Secondary',
    appearance: 'secondary',
  },
};

/**
 * Pill-shaped button using `borderRadius="rounded"`.
 */
export const Rounded: Story = {
  args: {
    title: 'Rounded',
    appearance: 'primary',
    borderRadius: 'rounded',
  },
};

/**
 * Disabled button. Opacity is reduced to 0.5 and the `onPress` callback is suppressed.
 */
export const Disabled: Story = {
  args: {
    title: 'Disabled',
    appearance: 'primary',
    disabled: true,
  },
};
