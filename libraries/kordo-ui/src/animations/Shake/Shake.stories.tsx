import type { Meta, StoryObj } from '@storybook/react';
import { Shake } from './Shake';
import { useRef } from 'react';
import { Button } from '../../components/atoms/Button/Button';
import { Tag } from '../../components/atoms/Tag/Tag';

/**
 * Horizontal shake animation, imperatively triggered via ref.
 *
 * ## Variants
 * - **amplitude**: shake intensity in pixels
 * - **duration**: duration of each step in the shake sequence (ms)
 */
const meta: Meta<typeof Shake> = {
  title: 'Animations/Shake',
  component: Shake,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    amplitude: {
      control: { type: 'number', min: 2, max: 20 },
      description: 'Shake amplitude in pixels',
    },
    duration: {
      control: { type: 'number', min: 20, max: 200 },
      description: 'Duration of each step in ms',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Shake>;

const ShakeDemo = (args: any) => {
  const shakeRef = useRef<any>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <Button
        title="Trigger Shake"
        appearance="secondary"
        onPress={() => shakeRef.current?.trigger()}
      />
      <Shake ref={shakeRef} {...args}>
        <Tag title="Shake me!" appearance="error" />
      </Shake>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ShakeDemo {...args} />,
  args: {
    amplitude: 5,
    duration: 50,
  },
};
