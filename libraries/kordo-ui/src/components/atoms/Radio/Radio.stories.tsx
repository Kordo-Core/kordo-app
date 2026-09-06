import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Radio } from './Radio';
import { ListRow } from '../../layouts/ListRow/ListRow';
import { Section } from '../../layouts/Section/Section';
import { Text } from '../Text/Text';

/**
 * Controlled dot for an exclusive choice.
 *
 * The radio renders the dot and nothing else — the label and the row layout belong to the
 * parent, usually a `ListRow`. A radio never knows about its siblings: exclusivity comes from
 * the single piece of state the parent compares against each value.
 */
export default {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

export const Selected: Story = {
  args: { selected: true, onSelect: () => {} },
};

export const Unselected: Story = {
  args: { selected: false, onSelect: () => {} },
};

export const Disabled: Story = {
  args: { selected: true, disabled: true, onSelect: () => {} },
};

const THEMES = ['Dark', 'Light', 'Fontainebleau', 'Arkose'];

/** An exclusive list: one state in the parent, `selected` derived from it on each row. */
export const ExclusiveList: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const [selected, setSelected] = useState('Light');

    return (
      <div style={{ width: 342 }}>
        <Section>
          {THEMES.map((name) => (
            <ListRow
              key={name}
              onPress={() => setSelected(name)}
              primaryText={<Text>{name}</Text>}
              right={<Radio selected={selected === name} onSelect={() => setSelected(name)} />}
            />
          ))}
        </Section>
      </div>
    );
  },
};
