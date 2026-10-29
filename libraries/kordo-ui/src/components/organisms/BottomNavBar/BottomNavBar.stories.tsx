import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { BottomNavBar } from './BottomNavBar';
import { NavTab } from './BottomNavBar.types';
import { phoneScreen } from '../../../../.storybook/decorators';

/**
 * Bottom navigation bar with an animated indicator following the active tab.
 *
 * ## Slots
 * - **tabs**: each has a `key` and an `icon` (icon name or SVG component)
 *
 * ## Variants
 * - **activeIndex**: index of the highlighted tab
 * - **isAction**: marks a tab as the primary action
 */
export default {
  title: 'Organisms/BottomNavBar',
  component: BottomNavBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [phoneScreen],
} satisfies Meta<typeof BottomNavBar>;

type Story = StoryObj<typeof BottomNavBar>;

const TABS: NavTab[] = [
  { key: 'home', icon: 'HomeRegular', isAction: true },
  { key: 'search', icon: 'search' },
  { key: 'add', icon: 'AddSquareFilled' },
  { key: 'gyms', icon: 'terrain' },
  { key: 'stats', icon: 'DataHistogramRegular' },
];

/** La barre est en position absolue : le cadre téléphone lui sert d'écran. */
const Screen = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: '100%', backgroundColor: '#F5F5F5' }}>{children}</div>
);

export const Default: Story = {
  render: () => (
    <Screen>
      <BottomNavBar tabs={TABS} />
    </Screen>
  ),
};

/** Tab selection is driven from the outside — here by local state. */
export const Interactive: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <Screen>
        <BottomNavBar tabs={TABS} activeIndex={activeIndex} onTabPress={setActiveIndex} />
      </Screen>
    );
  },
};
