import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Text } from '../../atoms/Text/Text';

/**
 * Conteneur avec ombre et coins arrondis. Peut être rendu cliquable avec animation bounce.
 *
 * ## Variantes
 * - **isPressable**: active l'animation bounce au clic et passe `cursor: pointer`
 */
export default {
  title: 'Layouts/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isPressable: {
      control: 'boolean',
      description: 'Rend la carte cliquable avec animation bounce',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback au clic (si `isPressable`)',
    },
  },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 16 }}>
        <Text size="lg" bold>Titre de la carte</Text>
        <Text size="md" appearance="gray">Description de la carte avec du contenu.</Text>
      </div>
    ),
  },
};

/** Carte cliquable avec animation bounce au clic. */
export const Pressable: Story = {
  args: {
    isPressable: true,
    children: (
      <div style={{ padding: 16 }}>
        <Text size="lg" bold>Carte cliquable</Text>
        <Text size="md" appearance="gray">Cliquez-moi pour voir l'animation bounce.</Text>
      </div>
    ),
  },
};
