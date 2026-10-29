import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Header } from './Header';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { UserInfo } from '../../molecules/UserInfo/UserInfo';
import { phoneScreen } from '../../../../.storybook/decorators';

/**
 * Sticky header built on top of `ListRow`, with optional scroll-based auto-hide.
 *
 * ## Slots
 * - **left**: back button, menu, current user…
 * - **children** (centered) or **primaryText**: page title
 * - **right**: actions (search, notifications, settings…)
 *
 * ## Variants
 * - **smart**: hides on scroll down and reappears on scroll up — needs `scrollY`
 * - **centerChildren**: centers the title whatever the width of the side slots
 */
export default {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [phoneScreen],
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

const avatar =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

const action = (name: string) => (
  <Button
    inverted
    borderless
    appearance="black"
    icon={{ name }}
    borderRadius="square"
    onPress={() => {}}
  />
);

const ScrollContent = () => (
  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        style={{ padding: 16, backgroundColor: '#F5F5F5', borderRadius: 8, flexShrink: 0 }}
      >
        <Text>Scroll content item {i + 1}</Text>
      </div>
    ))}
  </div>
);

const Screen = ({ header, paddingTop = 0 }: { header: React.ReactNode; paddingTop?: number }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    {header}
    <div style={{ flex: 1, overflow: 'auto', paddingTop }}>
      <ScrollContent />
    </div>
  </div>
);

/** Home header: current user on the left, actions on the right. */
export const Default: Story = {
  render: () => (
    <Screen
      header={
        <Header
          left={
            <UserInfo
              user={{ id: 'u-me', username: 'leo', avatarUrl: avatar }}
              onPressUser={() => {}}
            />
          }
          right={
            <>
              {action('alert')}
              {action('chat')}
            </>
          }
        />
      }
    />
  ),
};

/** Detail header: back arrow, centered title, one action. */
export const WithBackButton: Story = {
  render: () => (
    <Screen
      header={
        <Header
          centerChildren
          left={<Icon name="ArrowLeftRegular" size="md" onPress={() => {}} />}
          right={<Icon name="more-vertical" size="md" onPress={() => {}} />}
        >
          <Text size="lg" bold>
            alex_m
          </Text>
        </Header>
      }
    />
  ),
};

/** Title only, no side actions. */
export const TitleOnly: Story = {
  render: () => (
    <Screen
      header={
        <Header centerChildren>
          <Text size="xl" bold appearance="primary">
            Kordo
          </Text>
        </Header>
      }
    />
  ),
};

const SmartHeaderDemo = () => {
  const [scrollY, setScrollY] = useState(0);

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      {/* Le contenu compense la hauteur du header, qui le survole. */}
      <div
        style={{ height: '100%', overflow: 'auto', paddingTop: 60 }}
        onScroll={(event) => setScrollY(event.currentTarget.scrollTop)}
      >
        <ScrollContent />
      </div>
      <Header
        smart
        scrollY={scrollY}
        left={<Icon name="navigation" size="md" onPress={() => {}} />}
        right={action('search')}
        centerChildren
      >
        <Text size="lg" bold appearance="primary">
          Kordo
        </Text>
      </Header>
    </div>
  );
};

/** Smart header: hides on scroll down, reappears on scroll up. */
export const Smart: Story = {
  render: () => <SmartHeaderDemo />,
};
