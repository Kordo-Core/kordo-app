import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Toggle } from './Toggle';

/**
 * Controlled switch used across the settings screens.
 */
export default {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

// Le composant est contrôlé : la story tient l'état pour le rendre manipulable.
const ToggleDemo = (args: React.ComponentProps<typeof Toggle>) => {
  const [value, setValue] = useState(args.value);
  return <Toggle {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: { value: true },
  render: (args) => <ToggleDemo {...args} />,
};

export const Off: Story = {
  args: { value: false },
  render: (args) => <ToggleDemo {...args} />,
};

export const Disabled: Story = {
  args: { value: true, disabled: true },
  render: (args) => <ToggleDemo {...args} />,
};
