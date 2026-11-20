import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Heatmap } from './Heatmap';

/**
 * Grille de régularité : une colonne par semaine, une case par jour.
 */
export default {
  title: 'Molecules/Heatmap',
  component: Heatmap,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Heatmap>;

type Story = StoryObj<typeof Heatmap>;

const VALUES = Array.from({ length: 15 * 7 }, (_, i) =>
  [1, 3, 5, 6].includes(i % 7) ? (i * 7) % 4 : 0,
);

const Demo = () => {
  const [selected, setSelected] = useState(VALUES.length - 4);
  return (
    <Heatmap
      values={VALUES}
      selectedIndex={selected}
      onSelect={setSelected}
      cellLabel={(i) => `Jour ${i + 1}`}
      legend={{ less: 'moins', more: 'plus' }}
    />
  );
};

export const Default: Story = { render: () => <Demo /> };
