import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Panel } from './Panel';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import { phoneScreen } from '../../../../.storybook/decorators';

/**
 * Bottom sheet sliding up from the bottom of the screen.
 *
 * ## Behavior
 * - Slides up on open, back down on close
 * - Dark overlay behind, dimming as the sheet is dragged down
 * - Drag handle: pull up to read overflowing content, pull down to dismiss
 * - Lifts above the keyboard when a field inside gets focus
 */
export default {
  title: 'Layouts/Panel',
  component: Panel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  // Le panneau se place d'après `useWindowDimensions()`, que le décorateur fait pointer sur
  // le cadre : ses calculs portent donc bien sur l'écran du téléphone.
  decorators: [phoneScreen],
} satisfies Meta<typeof Panel>;

type Story = StoryObj<typeof Panel>;

const Trigger = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <div style={{ padding: 20 }}>
    <Button title={label} appearance="primary" onPress={onPress} />
  </div>
);

/** Short content: the sheet sits against the bottom of the screen. */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Trigger label="Open panel" onPress={() => setIsOpen(true)} />
        <Panel title="My panel" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text>Panel content.</Text>
            <Text size="sm" appearance="gray">
              Drag the handle down, or tap the overlay, to close.
            </Text>
          </div>
        </Panel>
      </>
    );
  },
};

/** Taller than the screen: it opens at 75% and the rest is reached by dragging up. */
export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Trigger label="Open" onPress={() => setIsOpen(true)} />
        <Panel title="Panel with content" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Array.from({ length: 24 }, (_, i) => (
              <Text key={i}>Item {i + 1}</Text>
            ))}
          </div>
        </Panel>
      </>
    );
  },
};
