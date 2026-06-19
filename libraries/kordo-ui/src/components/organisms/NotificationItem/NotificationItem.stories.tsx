import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { NotificationItem } from './NotificationItem';
import { NotificationPublic } from 'core';

/**
 * Ligne de notification. Gère 5 types : follow, follow_accept, like_post, like_comment, meet.
 * Affiche un bouton Follow/Following (types de suivi/rencontre) ou une miniature (types like).
 */
export default {
  title: 'Organisms/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof NotificationItem>;

type Story = StoryObj<typeof NotificationItem>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';
const actor = { id: 'u-alex', username: 'alex_m', firstName: 'Alex', lastName: 'Megos', avatarUrl: avatar };

const base = (over: Partial<NotificationPublic>): NotificationPublic => ({
  id: 'n-1',
  kind: 'follow',
  actor,
  createdAt: new Date(Date.now() - 12 * 3600_000).toISOString(),
  isRead: false,
  ...over,
});

export const Follow: Story = { args: { notification: base({ kind: 'follow', isFollowing: true }) } };

export const FollowAccept: Story = {
  args: { notification: base({ kind: 'follow_accept', isFollowing: true }) },
};

export const Meet: Story = {
  args: {
    notification: base({ kind: 'meet', isFollowing: false, gym: { id: 'arkose-nation', name: 'Arkose Nation' } }),
  },
};

export const LikePost: Story = {
  args: {
    notification: base({
      kind: 'like_post',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=200&q=80',
    }),
  },
};

export const NewBloc: Story = {
  args: {
    notification: base({
      kind: 'new_bloc',
      // la salle tient lieu d'« acteur » : son image s'affiche à gauche
      actor: {
        id: 'arkose-nation',
        username: 'Arkose Nation',
        avatarUrl: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=200&q=80',
      },
      gym: { id: 'arkose-nation', name: 'Arkose Nation' },
      thumbnailUrl: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=200&q=80',
    }),
  },
};

// Toutes les variantes empilées
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 4 }}>
      <NotificationItem notification={base({ id: 'a', kind: 'follow', isFollowing: true })} />
      <NotificationItem notification={base({ id: 'b', kind: 'follow_accept', isFollowing: false })} />
      <NotificationItem
        notification={base({ id: 'c', kind: 'meet', gym: { id: 'g', name: 'Arkose Nation' } })}
      />
      <NotificationItem
        notification={base({
          id: 'e',
          kind: 'like_post',
          thumbnailUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=200&q=80',
        })}
      />
      <NotificationItem
        notification={base({
          id: 'f',
          kind: 'new_bloc',
          gym: { id: 'g', name: 'Arkose Nation' },
          thumbnailUrl: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=200&q=80',
        })}
      />
    </View>
  ),
};
