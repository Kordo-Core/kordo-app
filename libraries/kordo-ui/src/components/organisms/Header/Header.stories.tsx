import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';

/**
 * Le composant **Header** est un header sticky qui utilise ListRow en interne.
 * Sur mobile, il peut se cacher/afficher au scroll avec la prop `smart`.
 *
 * ## Utilisation
 * ```tsx
 * <Header
 *   left={<Icon name="menu" />}
 *   primaryText={<Text size="xl" bold>Kordo</Text>}
 *   right={<Icon name="bell" />}
 * />
 * ```
 */
const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    primaryText: (
      <Text size="xl" bold appearance="primary">
        Kordo
      </Text>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    left: <Icon name="arrow-left" size={24} color="black" />,
    primaryText: <Text size="lg" bold>Page Title</Text>,
    right: <Icon name="more-vertical" size={24} color="black" />,
  },
};

export const WithActions: Story = {
  args: {
    left: <Icon name="menu" size={24} color="black" />,
    primaryText: (
      <Text size="xl" bold appearance="primary">
        Kordo
      </Text>
    ),
    right: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Icon name="search" size={24} color="black" />
        <Icon name="bell" size={24} color="black" />
      </div>
    ),
  },
};
