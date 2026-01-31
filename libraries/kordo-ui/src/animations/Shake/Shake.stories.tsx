import type { Meta, StoryObj } from '@storybook/react';
import { Shake } from './Shake';
import { useRef } from 'react';

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
      description: 'Amplitude du shake en pixels',
    },
    duration: {
      control: { type: 'number', min: 20, max: 200 },
      description: 'Durée d\'une étape en ms',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Shake>;

const ShakeDemo = (args: any) => {
  const shakeRef = useRef<any>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <button onClick={() => shakeRef.current?.trigger()} style={{ padding: '8px 16px' }}>
        Trigger Shake
      </button>
      <Shake ref={shakeRef} {...args}>
        <div
          style={{
            padding: 20,
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: 8,
            fontWeight: 'bold',
          }}
        >
          Shake me!
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

export const Strong: Story = {
  render: (args) => <ShakeDemo {...args} />,
  args: {
    amplitude: 15,
    duration: 80,
  },
};

export const Subtle: Story = {
  render: (args) => <ShakeDemo {...args} />,
  args: {
    amplitude: 3,
    duration: 30,
  },
};
