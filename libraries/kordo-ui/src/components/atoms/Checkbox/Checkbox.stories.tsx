import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { ListRow } from '../../layouts/ListRow/ListRow';
import { Section } from '../../layouts/Section/Section';
import { Text } from '../Text/Text';

/**
 * Controlled checkbox.
 *
 * The checkbox renders the box and nothing else — the label and the row layout belong to the
 * parent, usually a `ListRow`, which keeps the boxes aligned on the right edge whatever the
 * label length.
 */
export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Checked: Story = {
  args: { checked: true, onChange: () => {} },
};

export const Unchecked: Story = {
  args: { checked: false, onChange: () => {} },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true, onChange: () => {} },
};

/** In a form the boxes line up on the right edge, whatever the label length. */
export const InAForm: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({
      meets: true,
      likes: true,
      comments: false,
    });
    const toggle = (key: string) => () =>
      setValues((current) => ({ ...current, [key]: !current[key] }));

    return (
      <div style={{ width: 342 }}>
        <Section>
          <ListRow
            onPress={toggle('meets')}
            primaryText={<Text>Add the people you met</Text>}
            secondaryText={
              <Text size="sm" appearance="gray">
                See who you crossed paths with during your session through the Meet feature
              </Text>
            }
            right={<Checkbox checked={values.meets} onChange={toggle('meets')} />}
          />
          <ListRow
            onPress={toggle('likes')}
            primaryText={<Text>Enable likes</Text>}
            right={<Checkbox checked={values.likes} onChange={toggle('likes')} />}
          />
          <ListRow
            onPress={toggle('comments')}
            primaryText={<Text>Enable comments</Text>}
            right={<Checkbox checked={values.comments} onChange={toggle('comments')} />}
          />
        </Section>
      </div>
    );
  },
};
