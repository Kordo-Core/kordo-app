import type { Meta, StoryObj } from '@storybook/react';
import { Fade } from './Fade';
import { useRef, useState } from 'react';

const meta: Meta<typeof Fade> = {
  title: 'Animations/Fade',
  component: Fade,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'Direction du mouvement',
    },
    duration: {
      control: { type: 'number', min: 100, max: 1000 },
      description: 'Durée de l\'animation en ms',
    },
    distance: {
      control: { type: 'number', min: 5, max: 50 },
      description: 'Distance du mouvement en pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fade>;

const FadeDemo = (args: any) => {
  const fadeRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    if (visible) {
      fadeRef.current?.trigger('out');
    } else {
      fadeRef.current?.trigger('in');
    }
    setVisible(!visible);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <button onClick={toggle} style={{ padding: '8px 16px' }}>
        {visible ? 'Hide' : 'Show'}
      </button>
      <Fade ref={fadeRef} {...args}>
        <div
          style={{
            padding: 20,
            backgroundColor: '#6366f1',
            color: 'white',
            borderRadius: 8,
          }}
        >
          Contenu animé
        </div>
      </Fade>
    </div>
  );
};

export const Up: Story = {
  render: (args) => <FadeDemo {...args} />,
  args: {
    direction: 'up',
    duration: 200,
    distance: 20,
  },
};

export const Down: Story = {
  render: (args) => <FadeDemo {...args} />,
  args: {
    direction: 'down',
    duration: 200,
    distance: 20,
  },
};

export const Left: Story = {
  render: (args) => <FadeDemo {...args} />,
  args: {
    direction: 'left',
    duration: 300,
    distance: 30,
  },
};

export const Right: Story = {
  render: (args) => <FadeDemo {...args} />,
  args: {
    direction: 'right',
    duration: 300,
    distance: 30,
  },
};
