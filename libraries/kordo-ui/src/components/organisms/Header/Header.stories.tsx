import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Header } from './Header';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';

/**
 * Sticky header built on top of `ListRow` with optional scroll-based auto-hide.
 *
 * ## Slots
 * - **left**: back button, hamburger menu…
 * - **primaryText**: page title
 * - **right**: actions (search, notifications…)
 *
 * ## Variants
 * - **smart**: automatically hides on scroll down and reappears on scroll up
 */
export default {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

const ScrollContent = () => (
  <>
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        style={{
          padding: 16,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          flexShrink: 0,
        }}
      >
        <Text>Scroll content item {i + 1}</Text>
      </div>
    ))}
  </>
);

const headerProps = {
  left: (
    <Button
      inverted
      borderless
      appearance="black"
      icon={{ name: 'menu' }}
      borderRadius="square"
      onPress={() => {}}
    />
  ),
  primaryText: (
    <Text size="xl" bold appearance="primary">
      Kordo
    </Text>
  ),
  right: (
    <div style={{ display: 'flex', gap: 4 }}>
      <Button
        inverted
        borderless
        appearance="black"
        icon={{ name: 'search' }}
        borderRadius="square"
        onPress={() => {}}
      />
      <Button
        inverted
        borderless
        appearance="black"
        icon={{ name: 'bell' }}
        borderRadius="square"
        onPress={() => {}}
      />
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: 400 }}>
      <Header {...headerProps} />
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <ScrollContent />
      </div>
    </div>
  ),
};

const SmartHeaderDemo = () => {
  const [scrollY, setScrollY] = useState(0);

  return (
    <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          overflow: 'auto',
          paddingTop: 60,
        }}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        <div
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <ScrollContent />
        </div>
      </div>
      <Header smart scrollY={scrollY} {...headerProps} />
    </div>
  );
};

/** Smart header: hides on scroll down, reappears on scroll up. */
export const Smart: Story = {
  render: () => <SmartHeaderDemo />,
};
