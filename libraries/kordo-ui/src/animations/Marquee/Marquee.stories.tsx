import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Marquee } from './Marquee';
import { Text } from '../../components/atoms/Text/Text';

/**
 * Content scrolling endlessly to the left.
 */
export default {
  title: 'Animations/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 340, paddingVertical: 12, backgroundColor: '#F3B24E' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Marquee>;

type Story = StoryObj<typeof Marquee>;

export const Default: Story = {
  args: {
    children: (
      <Text variant="display" size={26} numberOfLines={1} style={{ color: '#13201B' }}>
        Pense à mettre à jour les blocs réussis pour grimper au classement.
      </Text>
    ),
  },
};
