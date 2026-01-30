import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Text } from '../../atoms/Text/Text';

/**
 * Le composant **Card** est un conteneur avec ombre et coins arrondis.
 * Peut être rendu cliquable avec `isPressable`.
 *
 * ## Utilisation
 * ```tsx
 * <Card isPressable onPress={() => console.log('clicked')}>
 *   <Text>Contenu de la carte</Text>
 * </Card>
 * ```
 */
const meta: Meta<typeof Card> = {
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
      description: 'Callback au clic (si isPressable)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 16 }}>
        <Text size="lg" bold>
          Titre de la carte
        </Text>
        <Text size="md" appearance="gray">
          Description de la carte avec du contenu.
        </Text>
      </div>
    ),
  },
};

export const Pressable: Story = {
  args: {
    isPressable: true,
    children: (
      <div style={{ padding: 16 }}>
        <Text size="lg" bold>
          Carte cliquable
        </Text>
        <Text size="md" appearance="gray">
          Cliquez-moi pour voir l'animation bounce.
        </Text>
      </div>
    ),
  },
};
