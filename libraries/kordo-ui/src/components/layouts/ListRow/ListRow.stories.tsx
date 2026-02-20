import type { Meta, StoryObj } from '@storybook/react';
import { ListRow } from './ListRow';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';

/**
 * Ligne de liste flexible avec slots gauche, centre et droite.
 * Utilisé comme base pour les menus, paramètres, listes d'items.
 *
 * ## Slots
 * - **left**: élément à gauche (icône, avatar…)
 * - **primaryText** / **secondaryText**: contenu central
 * - **right**: élément à droite (icône, bouton, badge…)
 */
export default {
  title: 'Layouts/ListRow',
  component: ListRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ListRow>;

type Story = StoryObj<typeof ListRow>;

export const Default: Story = {
  args: {
    primaryText: <Text size="lg">Titre principal</Text>,
    secondaryText: <Text appearance="gray">Texte secondaire</Text>,
  },
};

/** Ligne avec icônes à gauche et à droite. */
export const WithIcons: Story = {
  args: {
    left: <Icon name="user" size={24} color="primary" />,
    primaryText: <Text size="lg">Mon profil</Text>,
    secondaryText: <Text appearance="gray">Voir et modifier</Text>,
    right: <Icon name="chevron-right" size={20} color="gray" />,
  },
};

/** Ligne avec un bouton d'action à droite. */
export const WithButton: Story = {
  args: {
    left: <Icon name="bell" size={24} color="secondary" />,
    primaryText: <Text size="lg">Notifications</Text>,
    secondaryText: <Text appearance="gray">3 nouvelles</Text>,
    right: <Button title="Voir" appearance="primary" size="md" />,
  },
};

/** Item de type paramètres avec chevron. */
export const SettingsItem: Story = {
  args: {
    left: <Icon name="settings" size={24} color="gray" />,
    primaryText: <Text size="lg">Paramètres</Text>,
    right: <Icon name="chevron-right" size={20} color="gray" />,
  },
};
