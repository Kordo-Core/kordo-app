import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Le composant **Button** est un bouton interactif avec animation bounce au clic.
 *
 * ## Utilisation
 * ```tsx
 * <Button
 *   title="Valider"
 *   appearance="primary"
 *   onPress={() => console.log('clicked')}
 * />
 * ```
 *
 * ## Variantes
 * - **appearance**: `primary`, `secondary`, `black`, `gray`
 * - **size**: `md` (défaut), `lg`
 * - **inverted**: inverse les couleurs (fond blanc, texte coloré)
 * - **borderRadius**: `square` (défaut), `rounded`
 * - **icon**: ajoute une icône Feather
 */
export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Texte affiché dans le bouton',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray'],
      description: 'Couleur du bouton',
    },
    size: {
      control: 'radio',
      options: ['md', 'lg'],
      description: 'Taille du bouton (`md` = 36px, `lg` = 60px)',
    },
    inverted: {
      control: 'boolean',
      description: 'Inverse les couleurs (fond blanc, texte/bordure colorés)',
    },
    borderRadius: {
      control: 'radio',
      options: ['square', 'rounded'],
      description: 'Forme des coins',
    },
    borderless: {
      control: 'boolean',
      description: 'Supprime la bordure',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le bouton',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback au clic',
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

/**
 * Bouton par défaut avec texte.
 */
export const Default: Story = {
  args: {
    title: 'Click me',
    appearance: 'primary',
    size: 'md',
    borderRadius: 'square',
  },
};

/**
 * Bouton de grande taille (`size="lg"`). Hauteur de 60px avec un padding horizontal plus large.
 */
export const Large: Story = {
  args: {
    title: 'Submit',
    appearance: 'primary',
    size: 'lg',
  },
};

/**
 * Bouton avec couleurs inversées : fond blanc, texte et bordure de la couleur `appearance`.
 */
export const Inverted: Story = {
  args: {
    title: 'Cancel',
    appearance: 'primary',
    inverted: true,
  },
};

/**
 * Bouton icône : affiche uniquement une icône, sans texte.
 * Le bouton prend une forme carrée (36x36 en `md`, 60x60 en `lg`).
 */
export const IconButton: Story = {
  args: {
    appearance: 'primary',
    icon: { name: 'check' },
  },
};

/**
 * Bouton secondaire.
 */
export const Secondary: Story = {
  args: {
    title: 'Secondary',
    appearance: 'secondary',
  },
};

/**
 * Bouton arrondi (pill shape) avec `borderRadius="rounded"`.
 */
export const Rounded: Story = {
  args: {
    title: 'Rounded',
    appearance: 'primary',
    borderRadius: 'rounded',
  },
};

/**
 * Bouton désactivé. L'opacité est réduite à 0.5 et le callback `onPress` est ignoré.
 */
export const Disabled: Story = {
  args: {
    title: 'Disabled',
    appearance: 'primary',
    disabled: true,
  },
};
