import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

/**
 * Le composant **Text** est le composant de base pour afficher du texte stylisé.
 *
 * ## Utilisation
 * ```tsx
 * <Text size="lg" appearance="primary" bold>
 *   Hello World
 * </Text>
 * ```
 */
const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Contenu textuel',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Taille du texte',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray', 'white'],
      description: 'Couleur du texte',
    },
    bold: {
      control: 'boolean',
      description: 'Texte en gras',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Hello World',
    size: 'md',
    appearance: 'black',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md)</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
      <Text size="xxl">XXL (xxl)</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text appearance="primary">Primary</Text>
      <Text appearance="secondary">Secondary</Text>
      <Text appearance="black">Black</Text>
      <Text appearance="gray">Gray</Text>
    </div>
  ),
};

export const Bold: Story = {
  args: {
    children: 'Bold Text',
    size: 'lg',
    bold: true,
  },
};
