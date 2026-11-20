import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { PhotoText } from './PhotoText';

const PHOTO =
  'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=70';

/**
 * Very large text filled with a photo that slowly slides behind the letters.
 */
export default {
  title: 'Atoms/PhotoText',
  component: PhotoText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 358 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PhotoText>;

type Story = StoryObj<typeof PhotoText>;

export const Default: Story = {
  args: { text: '50', imageUri: PHOTO, size: 262 },
};

export const Small: Story = {
  args: { text: '12', imageUri: PHOTO, size: 120 },
};
