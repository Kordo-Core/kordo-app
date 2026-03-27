import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Panel } from './Panel.web';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';

/**
 * Side panel that slides in from the right edge of the screen.
 *
 * ## Behavior
 * - Slides in from the right on open, slides out on close
 * - Clickable overlay to dismiss
 * - Close button (✕) in the header
 */
export default {
  title: 'Layouts/Panel',
  component: Panel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Panel>;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: 20 }}>
        <div style={{ display: 'inline-block' }}>
          <Button title="Open panel" appearance="primary" onPress={() => setIsOpen(true)} />
        </div>
        <Panel title="My panel" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text size="md">Panel content.</Text>
            <Text size="sm" appearance="gray">
              Click the overlay or the ✕ to close.
            </Text>
          </div>
        </Panel>
      </div>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: 20 }}>
        <div style={{ display: 'inline-block' }}>
          <Button title="Open" appearance="primary" onPress={() => setIsOpen(true)} />
        </div>
        <Panel title="Panel with content" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <Text key={i} size="md">
                Item {i + 1}
              </Text>
            ))}
          </div>
        </Panel>
      </div>
    );
  },
};
