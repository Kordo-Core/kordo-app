import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';
import { Text } from '../../atoms/Text/Text';

/**
 * Full-width, edge-to-edge band that groups content vertically to compose a screen.
 *
 * Unlike `Card` (a content-sized, rounded, pressable tile), a `Section` spans the
 * full width, has no border radius and a lighter shadow. Stack several to build a screen.
 */
export default {
  title: 'Layouts/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Section>;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Text size="md" bold>
          Section title
        </Text>
        <Text size="md" appearance="gray">
          Section content stacked with a gap.
        </Text>
      </>
    ),
  },
};
