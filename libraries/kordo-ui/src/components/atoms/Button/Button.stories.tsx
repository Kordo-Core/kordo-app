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
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Bouton avec animation bounce. Supporte les icônes, plusieurs tailles et styles.',
      },
    },
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
      description: 'Taille du bouton',
    },
    inverted: {
      control: 'boolean',
      description: 'Inverse les couleurs (fond blanc)',
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
    onPress: {
      action: 'pressed',
      description: 'Callback au clic',
    },
  },
};

export default meta;
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
 * Bouton de grande taille.
 */
export const Large: Story = {
  args: {
    title: 'Submit',
    appearance: 'primary',
    size: 'lg',
  },
};

/**
 * Bouton avec couleurs inversées (fond blanc, texte coloré).
 */
export const Inverted: Story = {
  args: {
    title: 'Cancel',
    appearance: 'primary',
    inverted: true,
  },
};

/**
 * Bouton avec une icône et du texte.
 */
export const WithIcon: Story = {
  args: {
    title: 'Send',
    appearance: 'primary',
    icon: { name: 'send' },
  },
};

/**
 * Bouton avec uniquement une icône (sans texte).
 */
export const IconOnly: Story = {
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
 * Bouton arrondi (pill shape).
 */
export const Rounded: Story = {
  args: {
    title: 'Rounded',
    appearance: 'primary',
    borderRadius: 'rounded',
  },
};
