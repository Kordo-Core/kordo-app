import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Shake, ShakeRef } from './Shake';
import { useRef } from 'react';
import { Button } from '../../components/atoms/Button/Button';
import { Tag } from '../../components/atoms/Tag/Tag';
import { ShakeProps } from './Shake.types';

/**
 * Horizontal shake animation, imperatively triggered via ref.
 *
 * ## Variants
 * - **amplitude**: shake intensity in pixels
 * - **duration**: duration of each step in the shake sequence (ms)
 */
export default {
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
} satisfies Meta<typeof Shake>;

type Story = StoryObj<typeof Shake>;

const ShakeDemo = (args: ShakeProps) => {
  const shakeRef = useRef<ShakeRef>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <Button
        title="Trigger Shake"
        appearance="secondary"
        onPress={() => shakeRef.current?.trigger()}
      />
      {/* Shake s'étire sur toute la largeur (Input en dépend) : on recentre le contenu. */}
      <Shake ref={shakeRef} {...args}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tag title="Shake me!" appearance="error" />
        </div>
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
