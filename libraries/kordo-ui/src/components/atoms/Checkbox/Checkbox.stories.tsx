import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Text } from '../Text/Text';

/**
 * Controlled checkbox with an optional label.
 *
 * The label takes the remaining width and pushes the box to the right edge, so a column of
 * settings keeps its boxes aligned whatever the label length. The gap you see therefore
 * depends on the width of the parent: hugging the content keeps the box next to the text.
 */
export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

// Largeur au contenu : la case se pose juste après le libellé.
const Hug = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12 }}>{children}</div>
);

// Largeur d'un formulaire mobile : les cases s'alignent sur le bord droit.
const Form = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
);

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Hug>
        <Checkbox label="Enable likes" checked={checked} onChange={setChecked} />
      </Hug>
    );
  },
};

/** Without a label the box sizes to itself. */
export const BoxOnly: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Hug>
        <Checkbox checked={checked} onChange={setChecked} />
      </Hug>
    );
  },
};

/** In a form the boxes line up on the right edge, whatever the label length. */
export const InAForm: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({
      meets: true,
      likes: true,
      comments: false,
    });
    const toggle = (key: string) => (next: boolean) =>
      setValues((current) => ({ ...current, [key]: next }));

    return (
      <Form>
        <Checkbox
          label={
            <>
              <Text>Add the people you met</Text>
              <Text size="sm" appearance="gray">
                See who you crossed paths with during your session through the Meet feature
              </Text>
            </>
          }
          checked={values.meets}
          onChange={toggle('meets')}
        />
        <Checkbox label="Enable likes" checked={values.likes} onChange={toggle('likes')} />
        <Checkbox label="Enable comments" checked={values.comments} onChange={toggle('comments')} />
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Hug>
      <Checkbox label="Disabled option" checked disabled onChange={() => {}} />
    </Hug>
  ),
};
