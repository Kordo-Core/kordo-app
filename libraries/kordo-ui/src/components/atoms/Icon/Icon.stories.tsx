import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

/**
 * Icône cross-platform issue de la librairie **[Feather Icons](https://feathericons.com/)**.
 * Utilise `react-feather` sur web et `@expo/vector-icons` sur native.
 *
 * Le nom est toujours en **kebab-case** (`arrow-left`, `check-circle`…),
 * la conversion PascalCase est gérée automatiquement sur web.
 *
 * ## Couleurs disponibles
 * - **Apparence** : `primary`, `secondary`
 * - **Neutre** : `black`, `gray`, `white`
 * - **Statut** : `success`, `error`, `warning`, `info`
 */
export default {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'home', 'user', 'settings', 'search', 'heart', 'star', 'check', 'x',
        'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
        'send', 'edit', 'trash', 'eye', 'eye-off', 'lock', 'unlock',
        'bell', 'map-pin', 'calendar', 'clock', 'camera', 'image',
        'check-circle', 'x-circle', 'alert-triangle', 'alert-circle', 'info',
        'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
        'log-out', 'log-in', 'menu', 'more-horizontal', 'more-vertical',
      ],
      description:
        "Nom de l'icône Feather en **kebab-case**. Toutes les icônes de [feathericons.com](https://feathericons.com/) sont supportées.",
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: "Taille de l'icône en pixels.",
      table: {
        defaultValue: { summary: '24' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'gray', 'white', 'success', 'error', 'warning', 'info'],
      description:
        "Couleur issue du thème, résolue via `getColor()`. Supporte les couleurs d'**apparence** (`primary`, `secondary`), **neutres** (`black`, `gray`, `white`) et de **statut** (`success`, `error`, `warning`, `info`).",
    },
    onPress: {
      action: 'pressed',
      description:
        'Callback déclenché au clic (web) ou au tap (native). Ajoute automatiquement `cursor: pointer` sur web lorsque défini.',
    },
    style: {
      control: false,
      description: "Styles personnalisés appliqués directement sur l'icône.",
    },
  },
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

/**
 * Icône par défaut — taille standard (24px), couleur primaire.
 */
export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
    color: 'primary',
  },
};

/**
 * Icône en petite taille (16px).
 * Idéale pour les labels, badges ou les contextes à forte densité d'information.
 */
export const Small: Story = {
  args: {
    name: 'star',
    size: 16,
    color: 'secondary',
  },
};

/**
 * Icône en grande taille (40px).
 * Adaptée aux états vides (_empty states_), illustrations ou appels à l'action visuels.
 */
export const Large: Story = {
  args: {
    name: 'heart',
    size: 40,
    color: 'primary',
  },
};

/**
 * Couleurs de statut : `success`, `error`, `warning`, `info`.
 *
 * Ces couleurs sont issues du thème et résolues automatiquement par `getColor()`.
 * À utiliser pour donner un feedback contextuel à l'utilisateur.
 */
export const StatusColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="check-circle" size={24} color="success" />
      <Icon name="x-circle" size={24} color="error" />
      <Icon name="alert-triangle" size={24} color="warning" />
      <Icon name="info" size={24} color="info" />
    </div>
  ),
};
