import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

/**
 * Cross-platform text input with built-in validation and error animations.
 *
 * ## Variants
 * - **type**: `email`, `password`, `number` (validated on blur)
 * - **leftIcon / rightIcon**: Feather icons, can be used independently or together
 * - **required**: marks the field as required with a `*` indicator
 */
export default {
  title: 'Molecules/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed above the field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the field is empty',
    },
    type: {
      control: 'select',
      options: ['email', 'password', 'number'],
      description:
        'Field type — determines keyboard (native), validation rules, and masking (password)',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required — shows `*` and validates on blur',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired on every value change',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

const InputWithState = (args: any) => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChange={setValue} />;
};

/**
 * Email field with validation on blur.
 */
export const Default: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

/**
 * Password field — masks input, validates length (8–32 characters).
 */
export const Password: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    required: true,
  },
};

/**
 * Field with an icon on the left.
 */
export const WithIcon: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: { name: 'search' },
  },
};

/**
 * Field with icons on both sides.
 */
export const WithBothIcons: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: { name: 'search' },
    rightIcon: { name: 'x' },
  },
};

/**
 * Required field — triggers a shake animation and error message when left empty on blur.
 */
export const Required: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Required field',
    placeholder: 'This field is required',
    required: true,
  },
};
