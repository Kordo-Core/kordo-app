import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MeetSuggestions } from './MeetSuggestions';
import { phoneFrame } from '../../../../.storybook/decorators';

/**
 * Feed block suggesting climbers met recently through Meet.
 *
 * Independent from posts: people met during a session live inside the activity card.
 */
export default {
  title: 'Organisms/MeetSuggestions',
  component: MeetSuggestions,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneFrame],
} satisfies Meta<typeof MeetSuggestions>;

type Story = StoryObj<typeof MeetSuggestions>;

export const Default: Story = {
  args: {
    suggestions: [
      {
        user: {
          id: 'u-1',
          username: 'adam',
          firstName: 'Adam',
          avatarUrl: 'https://i.pravatar.cc/300?img=12',
        },
        subtitle: 'Arkose Nation',
      },
      {
        user: {
          id: 'u-2',
          username: 'clara',
          firstName: 'Clara',
          avatarUrl: 'https://i.pravatar.cc/300?img=47',
          isFollowing: true,
        },
        subtitle: 'Climb Up Cergy',
      },
      {
        user: {
          id: 'u-3',
          username: 'malik',
          firstName: 'Malik',
          avatarUrl: 'https://i.pravatar.cc/300?img=33',
        },
        subtitle: 'Arkose Massy',
      },
    ],
  },
};
