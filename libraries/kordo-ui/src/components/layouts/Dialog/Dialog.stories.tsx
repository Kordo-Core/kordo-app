import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Dialog } from './Dialog';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import { phoneFrame } from '../../../../.storybook/decorators';

/**
 * Centered modal box. The content is free-form: the component only provides the overlay,
 * the box and an optional title.
 */
export default {
  title: 'Layouts/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [phoneFrame],
} satisfies Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

const DialogDemo = (args: React.ComponentProps<typeof Dialog>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Supprimer le compte" appearance="error" onPress={() => setIsOpen(true)} />

      <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Text appearance="gray">
          Cette action est définitive : vos activités, blocs validés et abonnements seront perdus.
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
          <Button title="Annuler" appearance="gray" inverted onPress={() => setIsOpen(false)} />
          <Button title="Supprimer" appearance="error" onPress={() => setIsOpen(false)} />
        </View>
      </Dialog>
    </View>
  );
};

export const Default: Story = {
  args: { title: 'Supprimer le compte ?' },
  render: (args) => <DialogDemo {...args} />,
};
