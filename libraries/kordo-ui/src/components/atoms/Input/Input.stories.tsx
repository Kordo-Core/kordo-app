import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label du champ',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder du champ',
    },
    type: {
      control: 'select',
      options: ['email', 'password', 'number'],
      description: 'Type de champ',
    },
    required: {
      control: 'boolean',
      description: 'Champ requis',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position de l\'icône',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWithState = (args: any) => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChangeText={setValue} />;
};

export const Default: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Entrez votre email',
    type: 'email',
  },
};

export const Password: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Mot de passe',
    placeholder: 'Entrez votre mot de passe',
    type: 'password',
    required: true,
  },
};

export const WithIcon: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Recherche',
    placeholder: 'Rechercher...',
    icon: { name: 'search' },
    iconPosition: 'left',
  },
};

export const Required: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Champ requis',
    placeholder: 'Ce champ est obligatoire',
    required: true,
  },
};
