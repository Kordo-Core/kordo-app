import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';
import { useState } from 'react';

/**
 * Sélecteur à segments, alternative aux onglets ou aux radios.
 * Chaque segment peut avoir une couleur d'indicateur personnalisée.
 *
 * ## Variantes
 * - **size**: `md`, `lg`
 * - **borderRadius**: `rounded`, `square`
 * - **segments**: tableau de `{ text, color? }` — `color` surcharge la couleur de l'indicateur actif
 */
export default {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'Taille du contrôle',
    },
    borderRadius: {
      control: 'radio',
      options: ['rounded', 'square'],
      description: 'Forme des coins',
    },
  },
} satisfies Meta<typeof SegmentedControl>;

type Story = StoryObj<typeof SegmentedControl>;

const SegmentedControlWithState = (args: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return <SegmentedControl {...args} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />;
};

export const Default: Story = {
  render: (args) => <SegmentedControlWithState {...args} />,
  args: {
    segments: [{ text: 'Jour' }, { text: 'Semaine' }, { text: 'Mois' }],
    size: 'lg',
    borderRadius: 'rounded',
  },
};

/** Chaque segment avec sa propre couleur d'indicateur. */
export const WithColors: Story = {
  render: (args) => <SegmentedControlWithState {...args} />,
  args: {
    segments: [
      { text: 'Easy', color: '#22c55e' },
      { text: 'Medium', color: '#f59e0b' },
      { text: 'Hard', color: '#ef4444' },
    ],
    size: 'lg',
    borderRadius: 'rounded',
  },
};

export const Square: Story = {
  render: (args) => <SegmentedControlWithState {...args} />,
  args: {
    segments: [{ text: 'On' }, { text: 'Off' }],
    size: 'md',
    borderRadius: 'square',
  },
};
