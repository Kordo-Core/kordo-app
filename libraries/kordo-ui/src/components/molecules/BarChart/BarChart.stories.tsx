import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { BarChart } from './BarChart';

/**
 * Histogramme vertical animé. Une barre peut être mise en avant (orange) ; avec `onSelect`, les
 * barres deviennent sélectionnables.
 */
export default {
  title: 'Molecules/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

const WEEK = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((label, i) => ({
  label,
  value: [6, 0, 9, 4, 0, 18, 6][i],
}));

// Héros des stats : sur fond vert, barres sélectionnables avec valeur et libellés
const Interactive = () => {
  const [selected, setSelected] = useState(5);
  return (
    <View style={{ backgroundColor: '#2F6B55', padding: 20, borderRadius: 24 }}>
      <BarChart
        data={WEEK}
        height={72}
        spread
        tone="light"
        showValue
        showLabels
        highlightIndex={selected}
        onSelect={setSelected}
        unit="blocs"
      />
    </View>
  );
};

export const Hero: Story = { render: () => <Interactive /> };

// Mini-barres de la semaine (accueil) : pic mis en avant, sans texte
export const Mini: Story = {
  render: () => (
    <View
      style={{ backgroundColor: '#2F6B55', padding: 20, borderRadius: 24, alignSelf: 'flex-start' }}
    >
      <BarChart data={WEEK} height={48} barWidth={7} tone="light" highlightIndex={5} />
    </View>
  ),
};

// Petite tendance sur fond clair, dernière valeur mise en avant
export const Trend: Story = {
  render: () => (
    <BarChart
      data={[80, 120, 95, 140, 110, 134].map((value) => ({ value }))}
      height={36}
      barWidth={6}
      gap={3}
      highlightIndex={5}
    />
  ),
};
