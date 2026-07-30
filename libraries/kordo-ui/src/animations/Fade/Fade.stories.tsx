import type { Meta, StoryObj } from '@storybook/react';
import { Fade, FadeRef } from './Fade';
import { useRef, useState } from 'react';
import { Button } from '../../components/atoms/Button/Button';
import { Card } from '../../components/layouts/Card/Card';
import { Text } from '../../components/atoms/Text/Text';
import { theme } from '../../theme';
import { FadeProps } from './Fade.types';

/**
 * Fade animation with directional translation, imperatively controlled via ref.
 *
 * ## Variants
 * - **direction**: `up`, `down`, `left`, `right`
 * - **duration**: animation duration in ms
 * - **distance**: translation distance in pixels
 */
export default {
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
      description: 'Direction of movement during the fade',
    },
    duration: {
      control: { type: 'number', min: 100, max: 1000 },
      description: 'Animation duration in ms',
    },
    distance: {
      control: { type: 'number', min: 5, max: 50 },
      description: 'Translation distance in pixels',
    },
  },
} satisfies Meta<typeof Fade>;

type Story = StoryObj<typeof Fade>;

const FadeDemo = (args: FadeProps) => {
  const fadeRef = useRef<FadeRef>(null);
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
      {/* `Bounce` cale le bouton en `alignSelf: 'flex-start'` : il ignore l'alignement du
          parent. On le centre via un conteneur intermédiaire, qui se réduit à son contenu. */}
      <div style={{ display: 'flex' }}>
        <Button title={visible ? 'Hide' : 'Show'} appearance="primary" onPress={toggle} />
      </div>
      <Fade ref={fadeRef} {...args}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            <Text bold>Animated content</Text>
            <Text appearance="gray">This content appears with a fade</Text>
          </div>
        </Card>
      </Fade>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FadeDemo {...args} />,
  args: {
    direction: 'up',
    duration: 200,
    distance: 20,
  },
};
