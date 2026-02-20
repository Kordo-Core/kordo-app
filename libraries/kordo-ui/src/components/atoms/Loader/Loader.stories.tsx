import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

/**
 * Indicateur de chargement cross-platform disponible en deux formes.
 *
 * ## Variantes
 * - **type**: `spinner` (cercle rotatif) ou `bar` (barre de progression horizontale)
 * - **size**: `sm`, `md`, `lg` — spinner uniquement
 * - **appearance**: `primary`, `secondary`, `success`, `error`, `warning`, `info`
 * - **infinite**: boucle l'animation si `true`, joue une seule fois si `false`
 */
export default {
  title: 'Atoms/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['spinner', 'bar'],
      description: '`spinner` = cercle rotatif, `bar` = barre horizontale',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du spinner (ignoré pour `bar`)',
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Couleur du loader',
    },
    duration: {
      control: { type: 'number', min: 500, max: 5000 },
      description: "Durée d'un cycle d'animation en ms",
    },
    infinite: {
      control: 'boolean',
      description: 'Boucle l\'animation indéfiniment',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

/** Spinner de taille moyenne. */
export const Spinner: Story = {
  args: {
    type: 'spinner',
    size: 'md',
    appearance: 'primary',
    duration: 1000,
    infinite: true,
  },
};

/** Spinner petit. */
export const SpinnerSmall: Story = {
  args: {
    type: 'spinner',
    size: 'sm',
    appearance: 'secondary',
    duration: 1000,
    infinite: true,
  },
};

/** Spinner grand. */
export const SpinnerLarge: Story = {
  args: {
    type: 'spinner',
    size: 'lg',
    appearance: 'primary',
    duration: 1000,
    infinite: true,
  },
};

/** Barre de chargement infinie. */
export const Bar: Story = {
  args: {
    type: 'bar',
    appearance: 'primary',
    duration: 2000,
    infinite: true,
  },
};

/** Barre de progression qui joue une seule fois. */
export const BarProgress: Story = {
  args: {
    type: 'bar',
    appearance: 'success',
    duration: 3000,
    infinite: false,
  },
};
