import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { PostageStamp } from './PostageStamp';
import { DateSeal } from '../DateSeal/DateSeal';

/**
 * Postage stamp with a scalloped edge, a photo and a caption.
 * `mark` sits on the photo corner, for instance a `DateSeal`.
 */
export default {
  title: 'Molecules/PostageStamp',
  component: PostageStamp,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 130, padding: 16, backgroundColor: '#E9F1EC' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PostageStamp>;

type Story = StoryObj<typeof PostageStamp>;

const image = 'https://picsum.photos/seed/kordo/300/200';

export const Stamped: Story = {
  args: {
    image,
    title: 'Arkose Nation',
    caption: 'Tamponnée',
    rotate: '-2deg',
    mark: (
      <DateSeal
        day="1"
        month="NOV"
        color="#2F6B55"
        style={{ position: 'absolute', right: -7, top: 34 }}
      />
    ),
  },
};

export const ToDiscover: Story = {
  args: {
    image,
    title: 'Arkose Pantin',
    caption: 'À découvrir',
    muted: true,
  },
};
