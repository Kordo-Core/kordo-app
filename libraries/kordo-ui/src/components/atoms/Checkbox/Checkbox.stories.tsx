import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from './Checkbox';

/**
 * Controlled checkbox with an optional left-aligned label.
 */
export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: any) => (
      <View style={{ width: 240 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label="Activer les j'aimes" checked={checked} onChange={setChecked} />;
  },
};

export const BoxOnly: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Checkbox checked={checked} onChange={setChecked} />;
  },
};

export const Disabled: Story = {
  render: () => <Checkbox label="Option désactivée" checked disabled onChange={() => {}} />,
};
