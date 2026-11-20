import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { CollapsibleCard } from './CollapsibleCard';
import { Text } from '../../atoms/Text/Text';
import { LiveBadge } from '../../molecules/LiveBadge/LiveBadge';

/**
 * Card whose body folds away: the title row stays visible and toggles the content.
 */
export default {
  title: 'Layouts/CollapsibleCard',
  component: CollapsibleCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 340 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CollapsibleCard>;

type Story = StoryObj<typeof CollapsibleCard>;

const body = (
  <Text style={{ padding: 14 }}>
    Le contenu de la carte, ici le plan de la salle, se replie sous la ligne de titre.
  </Text>
);

export const Open: Story = {
  args: {
    title: 'Plan de la salle',
    right: <LiveBadge label="47 en séance" />,
    children: body,
  },
};

export const Closed: Story = {
  args: {
    ...Open.args,
    defaultOpen: false,
  },
};
