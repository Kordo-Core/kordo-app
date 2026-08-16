import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from './Section';
import { ListRow } from '../ListRow/ListRow';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { phoneFrame } from '../../../../.storybook/decorators';

/**
 * Full-width, edge-to-edge band that groups content vertically to compose a screen.
 *
 * Unlike `Card` (a content-sized, rounded, pressable tile), a `Section` spans the full
 * width, has no border radius and only a light shadow. Screens are built by stacking
 * several of them, separated by the background showing through — which is why these
 * stories sit on the app background rather than on white, where the shadow is invisible.
 */
export default {
  title: 'Layouts/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneFrame],
} satisfies Meta<typeof Section>;

type Story = StoryObj<typeof Section>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
);

/** Several stacked sections — the shape of a real screen. */
export const Default: Story = {
  render: () => (
    <Stack>
      <Section>
        <Text size="lg" bold>
          Profile
        </Text>
        <Text appearance="gray">Sections stack vertically, separated by the background.</Text>
      </Section>

      <Section>
        <Text bold>Statistics</Text>
        <Text appearance="gray">142 boulders topped · 8 gyms visited</Text>
      </Section>

      <Section>
        <ListRow
          left={<Icon name="list" color="primary" />}
          primaryText={<Text>Activities</Text>}
          right={<Icon name="chevron-right" size="sm" color="gray" />}
        />
        <ListRow
          left={<Icon name="location" color="primary" />}
          primaryText={<Text>Gyms visited</Text>}
          right={<Icon name="chevron-right" size="sm" color="gray" />}
        />
      </Section>

      <Section>
        <Text bold>Trophies</Text>
        <Text appearance="gray">Nothing unlocked yet.</Text>
      </Section>
    </Stack>
  ),
};

/** A single section, to read its own padding, gap and shadow. */
export const Single: Story = {
  render: () => (
    <Section>
      <Text size="lg" bold>
        Section title
      </Text>
      <Text appearance="gray">Section content stacked with a gap.</Text>
    </Section>
  ),
};
