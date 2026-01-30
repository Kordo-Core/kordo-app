import type { Meta, StoryObj } from '@storybook/react';
import { ListRow } from './ListRow';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';

/**
 * Le composant **ListRow** affiche une ligne avec des éléments à gauche, au centre et à droite.
 * Idéal pour les listes d'items, les paramètres, les menus.
 *
 * ## Utilisation
 * ```tsx
 * <ListRow
 *   left={<Icon name="user" />}
 *   primaryText={<Text>Titre</Text>}
 *   secondaryText={<Text appearance="gray">Sous-titre</Text>}
 *   right={<Icon name="chevron-right" />}
 * />
 * ```
 */
const meta: Meta<typeof ListRow> = {
  title: 'Layouts/ListRow',
  component: ListRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ListRow>;

export const Default: Story = {
  args: {
    primaryText: <Text size="lg">Titre principal</Text>,
    secondaryText: <Text appearance="gray">Texte secondaire</Text>,
  },
};

export const WithIcons: Story = {
  args: {
    left: <Icon name="user" size={24} color="primary" />,
    primaryText: <Text size="lg">Mon profil</Text>,
    secondaryText: <Text appearance="gray">Voir et modifier</Text>,
    right: <Icon name="chevron-right" size={20} color="gray" />,
  },
};

export const WithButton: Story = {
  args: {
    left: <Icon name="bell" size={24} color="secondary" />,
    primaryText: <Text size="lg">Notifications</Text>,
    secondaryText: <Text appearance="gray">3 nouvelles</Text>,
    right: <Button title="Voir" appearance="primary" size="md" />,
  },
};

export const SettingsItem: Story = {
  args: {
    left: <Icon name="settings" size={24} color="gray" />,
    primaryText: <Text size="lg">Paramètres</Text>,
    right: <Icon name="chevron-right" size={20} color="gray" />,
  },
};
