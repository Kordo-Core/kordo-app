import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { VideoStories } from './VideoStories';
import { Button } from '../../atoms/Button/Button';
import { phoneScreen } from '../../../__stories__/decorators';

/**
 * Full-screen video viewer, Stories-style: swipe between clips, tap past the last one to close.
 *
 * ## Variants
 * - **videos**: the clips to play, in order
 * - **initialIndex**: which clip opens first
 *
 * > On the web the player is stubbed (`expo-video` is native-only), so the frames stay
 * > empty in Storybook — only the layout and navigation are meaningful here.
 */
export default {
  title: 'Organisms/VideoStories',
  component: VideoStories,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneScreen],
  argTypes: {
    initialIndex: {
      control: { type: 'number', min: 0, max: 2 },
      description: 'Index of the clip shown on open',
    },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof VideoStories>;

type Story = StoryObj<typeof VideoStories>;

const VIDEOS = [
  { id: 'v-1', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'v-2', url: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 'v-3', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

// La visionneuse s'ouvre par-dessus l'écran : un bouton la déclenche, comme dans l'app.
const ViewerDemo = ({ initialIndex }: { initialIndex?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <Button title="Open videos" appearance="primary" onPress={() => setIsOpen(true)} />
      {isOpen && (
        <VideoStories
          videos={VIDEOS}
          initialIndex={initialIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <ViewerDemo />,
};

/** Opening straight on the last clip. */
export const StartOnLast: Story = {
  render: () => <ViewerDemo initialIndex={VIDEOS.length - 1} />,
};
