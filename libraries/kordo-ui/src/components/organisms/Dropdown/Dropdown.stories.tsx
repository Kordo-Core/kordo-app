import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from './Dropdown';
import { DropdownItem } from './Dropdown.types';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Dropdown built on top of the Input look.
 *
 * - **mode**: `single` (default) closes on pick, `multi` toggles and stays open
 * - **items**: each has a `key`, a `text` (shown in the trigger when selected),
 *   a `left` node and an optional `right` node
 * - opens **up or down** automatically depending on available space
 * - the open list has a **max height** then scrolls
 */
export default {
  title: 'Organisms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 280 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

const textItem = (key: string, label: string): DropdownItem => ({
  key,
  text: label,
  left: <Text size="md">{label}</Text>,
});

const TRAVEL_ITEMS: DropdownItem[] = [
  textItem('walking', 'Walking'),
  textItem('wheelchair', 'By wheelchair'),
  textItem('cycling', 'Cycling'),
  textItem('driving', 'Driving'),
  textItem('horse', 'Horse riding'),
];

/**
 * Single select — the chosen value replaces the placeholder.
 */
export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('walking');
    return (
      <Dropdown
        items={TRAVEL_ITEMS}
        placeholder="Pick an option…"
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * With a left icon in the trigger.
 */
export const WithIcon: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Dropdown
        items={TRAVEL_ITEMS}
        placeholder="Pick a gym…"
        icon={{ name: 'LocationRegular' }}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Multi select — stays open, trigger summarises the selection.
 */
export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['walking', 'cycling']);
    return (
      <Dropdown
        mode="multi"
        items={TRAVEL_ITEMS}
        placeholder="Pick an option…"
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Items with a right node (e.g. a trailing icon).
 */
export const WithRightNode: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const items: DropdownItem[] = TRAVEL_ITEMS.map((item) => ({
      ...item,
      right: <Icon name="ChevronRightRegular" size={16} color="gray" />,
    }));
    return (
      <Dropdown items={items} placeholder="Pick an option…" value={value} onChange={setValue} />
    );
  },
};

/**
 * Long list — caps at max height then scrolls.
 */
export const Scrollable: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const items: DropdownItem[] = Array.from({ length: 20 }, (_, i) =>
      textItem(`item-${i}`, `Option ${i + 1}`),
    );
    return (
      <Dropdown items={items} placeholder="Pick an option…" value={value} onChange={setValue} />
    );
  },
};
