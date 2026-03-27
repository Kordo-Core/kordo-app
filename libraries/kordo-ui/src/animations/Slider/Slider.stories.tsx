import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { Card } from '../../components/layouts/Card/Card';
import { Text } from '../../components/atoms/Text/Text';
import { theme } from '../../theme';

/**
 * Horizontally scrollable carousel for displaying a list of items.
 *
 * ## Variants
 * - **gap**: spacing between items in pixels
 * - **height**: fixed height of the slider container
 */
const meta: Meta<typeof Slider> = {
  title: 'Animations/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: { type: 'number', min: 0, max: 32 },
      description: 'Spacing between items in pixels',
    },
    height: {
      control: { type: 'number', min: 50, max: 300 },
      description: 'Fixed height of the slider container in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const SliderCard = ({ title, description }: { title: string; description: string }) => (
  <div style={{ width: 200, flexShrink: 0 }}>
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <Text bold>{title}</Text>
        <Text appearance="gray">{description}</Text>
      </div>
    </Card>
  </div>
);

export const Default: Story = {
  args: {
    gap: 16,
    height: 120,
    children: Array.from({ length: 10 }, (_, i) => (
      <SliderCard key={i} title={`Card ${i + 1}`} description="Content description" />
    )),
  },
};

