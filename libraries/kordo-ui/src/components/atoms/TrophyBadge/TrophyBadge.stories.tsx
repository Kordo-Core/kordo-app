import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { TrophyBadge } from './TrophyBadge';

const AWARD = 'M12 15a7 7 0 100-14 7 7 0 000 14zM8.2 13.9L7 23l5-3 5 3-1.2-9.1';

/**
 * Pastille d'un trophée : orangée si obtenu, grise sinon.
 */
export default {
  title: 'Atoms/TrophyBadge',
  component: TrophyBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    earned: { control: 'boolean' },
    size: { control: 'select', options: ['md', 'lg'] },
  },
  args: { icon: AWARD, earned: true, size: 'md' },
} satisfies Meta<typeof TrophyBadge>;

type Story = StoryObj<typeof TrophyBadge>;

export const Earned: Story = {};

export const Locked: Story = { args: { earned: false } };

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <TrophyBadge icon={AWARD} earned size="md" />
      <TrophyBadge icon={AWARD} earned size="lg" />
      <TrophyBadge icon={AWARD} earned={false} size="lg" />
    </View>
  ),
};
