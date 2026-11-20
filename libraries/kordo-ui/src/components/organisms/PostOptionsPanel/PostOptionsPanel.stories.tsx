import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { UserPublic } from 'core';
import { PostOptionsPanel } from './PostOptionsPanel';
import { Button } from '../../atoms/Button/Button';
import { phoneScreen } from '../../../../.storybook/decorators';

/**
 * Options panel of a post, opened by the « ⋯ » button of `PostActions`.
 * Shared by `Activity`, `Publication` and `TextPost` through `usePostOptions`.
 *
 * ## Variants
 * - **isMine**: own post → edit, turn comments off/on, share, delete (with confirmation)
 * - otherwise: share, hide, unfollow, report (reasons + details), block (with confirmation)
 */
export default {
  title: 'Organisms/PostOptionsPanel',
  component: PostOptionsPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneScreen],
  argTypes: {
    onEdit: { action: 'edit' },
    onToggleComments: { action: 'toggle comments' },
    onDelete: { action: 'delete' },
    onHide: { action: 'hide' },
    onUnfollow: { action: 'unfollow' },
    onBlock: { action: 'block' },
    onReport: { action: 'report' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof PostOptionsPanel>;

type Story = StoryObj<typeof PostOptionsPanel>;

const author: UserPublic = {
  id: 'u-lea',
  username: 'lea',
  firstName: 'Léa',
  lastName: 'Bozec',
  avatarUrl: 'https://i.pravatar.cc/300?img=47',
};

// Le panneau est piloté de l'extérieur : un bouton l'ouvre, comme le « ⋯ » des posts.
const PanelDemo = ({ isMine }: { isMine: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  return (
    <div style={{ padding: 20 }}>
      <Button title="Open options" appearance="primary" onPress={() => setIsOpen(true)} />
      <PostOptionsPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        author={author}
        isMine={isMine}
        meta="Séance force · Hier"
        shareMessage="Léa Bozec · Séance force"
        commentsEnabled={commentsEnabled}
        onToggleComments={() => setCommentsEnabled((v) => !v)}
      />
    </div>
  );
};

/** Someone else's post. */
export const Default: Story = {
  render: () => <PanelDemo isMine={false} />,
};

/** The current user's own post. */
export const Mine: Story = {
  render: () => <PanelDemo isMine />,
};
