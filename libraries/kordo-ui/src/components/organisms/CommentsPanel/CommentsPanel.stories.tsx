import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UserPublic } from 'core';
import { CommentsPanel } from './CommentsPanel';
import { CommentItem } from './CommentsPanel.types';
import { Button } from '../../atoms/Button/Button';
import { phoneScreen } from '../../../__stories__/decorators';

/**
 * Comments panel of a post — a `Panel` holding the comment list and the compose field.
 * Shared by `Activity`, `Publication` and `TextPost`.
 *
 * ## Slots
 * - **comments**: the list to display, newest first
 * - **currentUser**: when provided, shows the compose field at the bottom
 *
 * ## Variants
 * - **onAddComment**: omit it to render a read-only panel
 */
export default {
  title: 'Organisms/CommentsPanel',
  component: CommentsPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  // Le panneau se place d'après `useWindowDimensions()`, que le décorateur fait pointer sur
  // le cadre : ses calculs portent donc bien sur l'écran du téléphone.
  decorators: [phoneScreen],
  argTypes: {
    onPressUser: { action: 'user pressed' },
    onAddComment: { action: 'comment added' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof CommentsPanel>;

type Story = StoryObj<typeof CommentsPanel>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

const currentUser: UserPublic = { id: 'u-me', username: 'me', avatarUrl: avatar };

const COMMENTS: CommentItem[] = [
  {
    id: 'c-1',
    user: { id: 'u-alex', username: 'alex_m', avatarUrl: avatar },
    content: 'Nice send! What did you think of the crux?',
    createdAt: new Date(Date.now() - 12 * 60_000).toISOString(),
  },
  {
    id: 'c-2',
    user: { id: 'u-lea', username: 'lea', avatarUrl: avatar },
    content: 'That heel hook is unreal 🔥',
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
  {
    id: 'c-3',
    user: { id: 'u-tom', username: 'tom_d', avatarUrl: avatar },
    content: 'Trying it again on Saturday, anyone in?',
    createdAt: new Date(Date.now() - 3 * 86400_000).toISOString(),
  },
];

// Le panneau est piloté de l'extérieur : un bouton l'ouvre, comme dans les posts.
const PanelDemo = ({ comments, user }: { comments: CommentItem[]; user?: UserPublic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(comments);

  const addComment = (content: string) =>
    setItems((current) => [
      {
        id: `c-${current.length + 1}`,
        user: user ?? currentUser,
        content,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);

  return (
    <div style={{ padding: 20 }}>
      <Button title="Open comments" appearance="primary" onPress={() => setIsOpen(true)} />
      <CommentsPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        comments={items}
        currentUser={user}
        onAddComment={user ? addComment : undefined}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <PanelDemo comments={COMMENTS} user={currentUser} />,
};

/** Without `currentUser` the compose field is hidden — read-only panel. */
export const ReadOnly: Story = {
  render: () => <PanelDemo comments={COMMENTS} />,
};

/** Empty state, before anyone has commented. */
export const Empty: Story = {
  render: () => <PanelDemo comments={[]} user={currentUser} />,
};
