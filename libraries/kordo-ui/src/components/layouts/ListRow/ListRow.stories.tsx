import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ListRow } from './ListRow';
import { Section } from '../Section/Section';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';
import { phoneFrame } from '../../../../.storybook/decorators';

/**
 * One line of a list, with a left slot, a central text block and a right slot.
 *
 * A row has no background of its own: it is meant to be stacked inside a `Section`,
 * which is how these stories present it, at phone width.
 *
 * ## Slots
 * - **left**: icon, avatar…
 * - **primaryText** / **secondaryText**: central content
 * - **right**: icon, button, counter…
 */
export default {
  title: 'Layouts/ListRow',
  component: ListRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneFrame],
} satisfies Meta<typeof ListRow>;

type Story = StoryObj<typeof ListRow>;

const chevron = <Icon name="chevron-right" size="sm" color="gray" />;

/** A settings list — the usual shape: icon, label, chevron. */
export const Default: Story = {
  render: () => (
    <Section>
      <ListRow
        left={<Icon name="person" color="primary" />}
        primaryText={<Text>Account</Text>}
        right={chevron}
      />
      <ListRow
        left={<Icon name="alert" color="primary" />}
        primaryText={<Text>Notifications</Text>}
        right={chevron}
      />
      <ListRow
        left={<Icon name="lock-closed" color="primary" />}
        primaryText={<Text>Privacy</Text>}
        right={chevron}
      />
      <ListRow
        left={<Icon name="settings" color="primary" />}
        primaryText={<Text>Preferences</Text>}
        right={chevron}
      />
    </Section>
  ),
};

/** Two-line rows: a title plus a secondary line. */
export const WithSecondaryText: Story = {
  render: () => (
    <Section>
      <ListRow
        left={<Icon name="location" color="primary" />}
        primaryText={<Text size="lg">Climb Up Paris</Text>}
        secondaryText={<Text appearance="gray">Visited 12 times</Text>}
        right={chevron}
      />
      <ListRow
        left={<Icon name="location" color="primary" />}
        primaryText={<Text size="lg">Arkose Montreuil</Text>}
        secondaryText={<Text appearance="gray">Visited 4 times</Text>}
        right={chevron}
      />
      <ListRow
        left={<Icon name="location" color="primary" />}
        primaryText={<Text size="lg">Les Petites Pierres</Text>}
        secondaryText={<Text appearance="gray">Never visited</Text>}
        right={chevron}
      />
    </Section>
  ),
};

/** The right slot takes any element, an action button included. */
export const WithActions: Story = {
  render: () => (
    <Section>
      <ListRow
        left={<Icon name="person" color="primary" />}
        primaryText={<Text>alex_m</Text>}
        secondaryText={<Text appearance="gray">Met at Climb Up Paris</Text>}
        right={<Button title="Follow" appearance="secondary" />}
      />
      <ListRow
        left={<Icon name="person" color="primary" />}
        primaryText={<Text>lea</Text>}
        secondaryText={<Text appearance="gray">Met at Arkose Nation</Text>}
        right={<Button title="Following" appearance="gray" inverted />}
      />
    </Section>
  ),
};

/** A long title wraps instead of pushing the right slot out. */
export const LongText: Story = {
  render: () => (
    <Section>
      <ListRow
        left={<Icon name="chat" color="primary" />}
        primaryText={
          <Text>
            A deliberately long row title, to show that the central block wraps rather than
            overflowing onto the right slot
          </Text>
        }
        right={chevron}
      />
    </Section>
  ),
};
