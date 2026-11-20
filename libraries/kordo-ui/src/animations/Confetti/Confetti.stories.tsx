import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Confetti } from './Confetti';
import { Button } from '../../components/atoms/Button/Button';

/**
 * Éclat de confettis depuis le centre du conteneur. Chaque nouvelle valeur de `trigger` le relance.
 */
export default {
  title: 'Animations/Confetti',
  component: Confetti,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Confetti>;

type Story = StoryObj<typeof Confetti>;

const OnButton = () => {
  const [burst, setBurst] = useState(0);
  return (
    <View style={{ padding: 120 }}>
      <View>
        <Button
          title="Valider ce bloc"
          appearance="secondary"
          onPress={() => setBurst((b) => b + 1)}
        />
        <Confetti trigger={burst} />
      </View>
    </View>
  );
};

export const OnPress: Story = { render: () => <OnButton /> };

// Grand éclat joué à l'apparition (trophée débloqué)
export const OnMount: Story = {
  render: () => (
    <View style={{ width: 360, height: 360, backgroundColor: '#13201B', borderRadius: 24 }}>
      <Confetti trigger={0} playOnMount radius={170} duration={1600} delay={350} size="md" />
    </View>
  ),
};
