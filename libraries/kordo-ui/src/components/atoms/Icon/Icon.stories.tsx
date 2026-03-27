import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

/**
 * Cross-platform icon component based on Feather Icons (kebab-case names).
 *
 * ## Variants
 * - **name**: icon name in kebab-case (`arrow-left`, `check-circle`…)
 * - **size**: size in pixels (default 24)
 * - **color**: `primary`, `secondary`, `black`, `gray`, `white`, `success`, `error`, `warning`, `info`
 */
export default {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'home', 'user', 'settings', 'search', 'heart', 'star', 'check', 'x',
        'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
        'send', 'edit', 'trash', 'eye', 'eye-off', 'lock', 'unlock',
        'bell', 'map-pin', 'calendar', 'clock', 'camera', 'image',
        'check-circle', 'x-circle', 'alert-triangle', 'alert-circle', 'info',
        'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
        'log-out', 'log-in', 'menu', 'more-horizontal', 'more-vertical',
      ],
      description:
        'Feather icon name in **kebab-case**. All icons from [feathericons.com](https://feathericons.com/) are supported.',
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: 'Icon size in pixels.',
      table: {
        defaultValue: { summary: '24' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray', 'white', 'success', 'error', 'warning', 'info'],
      description:
        'Theme color resolved via `getColor()`. Supports **appearance** colors (`primary`, `secondary`), **neutral** colors (`black`, `gray`, `white`) and **status** colors (`success`, `error`, `warning`, `info`).',
    },
    onPress: {
      action: 'pressed',
      description:
        'Callback fired on click (web) or tap (native). Automatically adds `cursor: pointer` on web when defined.',
    },
    style: {
      control: false,
      description: 'Custom styles applied directly to the icon element.',
    },
  },
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

/**
 * Default icon — standard size (24px), primary color.
 */
export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
    color: 'primary',
  },
};

/**
 * Small icon (16px).
 * Suited for labels, badges, or high-density information contexts.
 */
export const Small: Story = {
  args: {
    name: 'star',
    size: 16,
    color: 'secondary',
  },
};

/**
 * Large icon (40px).
 * Suited for empty states, illustrations, or prominent visual calls to action.
 */
export const Large: Story = {
  args: {
    name: 'heart',
    size: 40,
    color: 'primary',
  },
};

/**
 * Status colors: `success`, `error`, `warning`, `info`.
 *
 * These colors are resolved from the theme via `getColor()`.
 * Use them to provide contextual feedback to the user.
 */
export const StatusColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="check-circle" size={24} color="success" />
      <Icon name="x-circle" size={24} color="error" />
      <Icon name="alert-triangle" size={24} color="warning" />
      <Icon name="info" size={24} color="info" />
    </div>
  ),
};
