import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Stepper } from './Stepper';
import { Text } from '../../atoms/Text/Text';

/**
 * Compteur « − / + ». La valeur est affichée par l'écran ; `min` et `max` désactivent les
 * boutons aux bornes.
 */
export default {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Stepper>;

type Story = StoryObj<typeof Stepper>;

const Demo = ({ min, max }: { min?: number; max?: number }) => {
  const [value, setValue] = useState(3);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Text variant="display" size={48}>
        {value}
      </Text>
      <Stepper value={value} onChange={setValue} min={min} max={max} />
    </View>
  );
};

export const Default: Story = { render: () => <Demo /> };

export const Bounded: Story = { render: () => <Demo min={2} max={5} /> };
