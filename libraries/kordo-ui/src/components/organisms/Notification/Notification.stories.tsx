import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';
import { Section } from '../../layouts/Section/Section';
import { NotificationPublic } from 'core';
import { phoneFrame } from '../../../__stories__/decorators';

/**
 * Notification row, covering 5 kinds: follow, follow_accept, like_post, new_bloc, meet.
 *
 * Shows a Follow/Following button (follow, follow_accept and meet kinds) or a thumbnail
 * (like_post, new_bloc).
 *
 * A notification carries no background or side margins of its own: like in the app, it is
 * stacked inside a `Section`, which is what the decorator below does.
 *
 * > It deliberately does not build on `ListRow`: a row's text column is `pointerEvents: 'none'`,
 * > while a notification's text is interactive — the actor's name and the gym's name are links.
 */
export default {
  title: 'Organisms/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  // Décorateurs appliqués du plus proche au plus lointain : la Section habille la story,
  // le cadre téléphone habille la Section.
  decorators: [
    (Story) => (
      <Section>
        <Story />
      </Section>
    ),
    phoneFrame,
  ],
} satisfies Meta<typeof Notification>;

type Story = StoryObj<typeof Notification>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';
const actor = {
  id: 'u-alex',
  username: 'alex_m',
  firstName: 'Alex',
  lastName: 'Megos',
  avatarUrl: avatar,
};

const base = (over: Partial<NotificationPublic>): NotificationPublic => ({
  id: 'n-1',
  kind: 'follow',
  actor,
  createdAt: new Date(Date.now() - 12 * 3600_000).toISOString(),
  isRead: false,
  ...over,
});

export const Follow: Story = {
  args: { notification: base({ kind: 'follow', isFollowing: true }) },
};

export const FollowAccept: Story = {
  args: { notification: base({ kind: 'follow_accept', isFollowing: true }) },
};

export const Meet: Story = {
  args: {
    notification: base({
      kind: 'meet',
      isFollowing: false,
      gym: { id: 'arkose-nation', name: 'Arkose Nation' },
    }),
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

/** Toutes les variantes empilées, comme dans une section de l'écran Notifications. */
export const AllVariants: Story = {
  render: () => (
    <>
      <Notification notification={base({ id: 'a', kind: 'follow', isFollowing: true })} />
      <Notification notification={base({ id: 'b', kind: 'follow_accept', isFollowing: false })} />
      <Notification
        notification={base({ id: 'c', kind: 'meet', gym: { id: 'g', name: 'Arkose Nation' } })}
      />
      <Notification
        notification={base({
          id: 'e',
          kind: 'like_post',
          thumbnailUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=200&q=80',
        })}
      />
      <Notification
        notification={base({
          id: 'f',
          kind: 'new_bloc',
          gym: { id: 'g', name: 'Arkose Nation' },
          thumbnailUrl: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=200&q=80',
        })}
      />
    </>
  ),
};
