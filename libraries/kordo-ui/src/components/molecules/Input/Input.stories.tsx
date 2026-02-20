import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

/**
 * Champ de saisie cross-platform avec validation intégrée, animations d'erreur (shake + fade)
 * et support des icônes Feather.
 *
 * ## Variantes
 * - **type**: `email`, `password`, `number` (validation automatique au blur)
 * - **icon**: icône Feather positionnée à `left` ou `right`
 * - **required**: affiche `*` et déclenche une erreur si le champ est vide au blur
 */
export default {
  title: 'Molecules/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label affiché au-dessus du champ',
    },
    placeholder: {
      control: 'text',
      description: 'Texte indicatif dans le champ vide',
    },
    type: {
      control: 'select',
      options: ['email', 'password', 'number'],
      description: 'Type du champ — détermine le clavier (native), la validation et le masquage (password)',
    },
    required: {
      control: 'boolean',
      description: 'Rend le champ obligatoire — affiche `*` et valide à la perte du focus',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: "Position de l'icône dans le champ",
    },
    onChangeText: {
      action: 'changed',
      description: 'Callback appelé à chaque changement de valeur',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

const InputWithState = (args: any) => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChangeText={setValue} />;
};

/**
 * Champ email avec validation au blur.
 */
export const Default: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Entrez votre email',
    type: 'email',
  },
};

/**
 * Champ mot de passe — masque la saisie, valide la longueur (8–32 caractères).
 */
export const Password: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Mot de passe',
    placeholder: 'Entrez votre mot de passe',
    type: 'password',
    required: true,
  },
};

/**
 * Champ avec icône à gauche.
 */
export const WithIcon: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Recherche',
    placeholder: 'Rechercher...',
    icon: { name: 'search' },
    iconPosition: 'left',
  },
};

/**
 * Champ obligatoire — shake + message d'erreur si laissé vide.
 */
export const Required: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Champ requis',
    placeholder: 'Ce champ est obligatoire',
    required: true,
  },
};
