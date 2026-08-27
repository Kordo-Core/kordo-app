import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';

/**
 * Exclusive options with an optional description under each label.
 */
export default {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

const OPTIONS = [
  { value: 'everyone', label: 'Tout le monde' },
  { value: 'following', label: 'Uniquement les personnes que vous suivez' },
  { value: 'none', label: 'Ne pas autoriser', description: 'Personne ne pourra vous mentionner.' },
];

const RadioGroupDemo = (args: React.ComponentProps<typeof RadioGroup>) => {
  const [value, setValue] = useState(args.value);
  return <RadioGroup {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: { options: OPTIONS, value: 'everyone' },
  render: (args) => <RadioGroupDemo {...args} />,
};
