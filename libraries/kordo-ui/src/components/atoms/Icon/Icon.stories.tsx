import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Icon } from './Icon';
import { fluentIcons } from '../../../utils/fluent-icons';

/**
 * Icon rendered from the generated `utils/fluent-icons` map — identical paths on web and native.
 *
 * ## Variants
 * - **name**: either a Fluent name (`HomeRegular`, `CheckmarkFilled`…), a short kebab-case
 *   alias (`home`, `chevron-right`…) or a house icon (`carabiner`, `terrain`, `play`)
 * - **size**: `sm` (20), `md` (24), `lg` (32) or any number of pixels
 * - **color**: an appearance token (`primary`, `error`…) or a raw CSS color
 */
export default {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(fluentIcons),
      description: 'Icon name — see `utils/fluent-icons` for the full list',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 16, 40, 64],
      description: 'Size token or an explicit number of pixels',
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'black',
        'gray',
        'white',
        'success',
        'error',
        'warning',
        'info',
      ],
      description: 'Appearance token, or any raw CSS color',
    },
    onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>{children}</div>
);

export const Default: Story = {
  args: { name: 'home', size: 'md', color: 'primary' },
};

/** The three size tokens resolve to 20, 24 and 32 pixels. */
export const Sizes: Story = {
  render: () => (
    <Row>
      <Icon name="star" size="sm" color="secondary" />
      <Icon name="star" size="md" color="secondary" />
      <Icon name="star" size="lg" color="secondary" />
      <Icon name="star" size={64} color="secondary" />
    </Row>
  ),
};

export const StatusColors: Story = {
  render: () => (
    <Row>
      <Icon name="checkmark-circle" size="md" color="success" />
      <Icon name="dismiss-circle" size="md" color="error" />
      <Icon name="warning" size="md" color="warning" />
      <Icon name="info" size="md" color="info" />
    </Row>
  ),
};

/** Kordo-specific icons, absent from the Fluent set — climbing and sign-in providers. */
export const KordoIcons: Story = {
  render: () => (
    <Row>
      <Icon name="carabiner" size="lg" color="primary" />
      <Icon name="terrain" size="lg" color="primary" />
      <Icon name="play" size="lg" color="primary" />
      <Icon name="apple" size="lg" />
      <Icon name="google" size="lg" />
    </Row>
  ),
};
