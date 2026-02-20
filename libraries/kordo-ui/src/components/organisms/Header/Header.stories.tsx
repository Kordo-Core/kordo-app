import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Header sticky basé sur `ListRow`, affiché en haut de chaque écran.
 * Sur mobile, supporte un comportement smart : se masque au scroll vers le bas,
 * réapparaît au scroll vers le haut.
 *
 * ## Slots
 * - **left**: bouton retour, menu burger…
 * - **primaryText**: titre de la page
 * - **right**: actions (recherche, notifications…)
 *
 * ## Variantes
 * - **smart**: active le masquage automatique au scroll (native uniquement)
 */
export default {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    primaryText: <Text size="xl" bold appearance="primary">Kordo</Text>,
  },
};

/** Header avec navigation retour et menu contextuel. */
export const WithNavigation: Story = {
  args: {
    left: <Icon name="arrow-left" size={24} color="black" />,
    primaryText: <Text size="lg" bold>Page Title</Text>,
    right: <Icon name="more-vertical" size={24} color="black" />,
  },
};

/** Header avec plusieurs icônes d'action à droite. */
export const WithActions: Story = {
  args: {
    left: <Icon name="menu" size={24} color="black" />,
    primaryText: <Text size="xl" bold appearance="primary">Kordo</Text>,
    right: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Icon name="search" size={24} color="black" />
        <Icon name="bell" size={24} color="black" />
      </div>
    ),
  },
};
