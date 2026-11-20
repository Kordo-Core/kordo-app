import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import Svg, { Path } from 'react-native-svg';
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
 * - **accent**: the « + » tab, a permanent orange square
 */
export default {
  title: 'Organisms/BottomNavBar',
  component: BottomNavBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [phoneScreen],
} satisfies Meta<typeof BottomNavBar>;

type Story = StoryObj<typeof BottomNavBar>;

// Icônes du design D (tracés de la maquette, trait 2 px), comme dans l'app
const navIcon =
  (d: string, strokeWidth = 2) =>
  ({ size = 22, color = '#000000' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

const TABS: NavTab[] = [
  {
    key: 'home',
    icon: navIcon('M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z'),
    isAction: true,
  },
  { key: 'search', icon: navIcon('M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5') },
  // « + » : carré orange permanent
  { key: 'add', icon: navIcon('M12 5v14M5 12h14', 2.6), accent: true },
  {
    key: 'gyms',
    icon: navIcon(
      'M2 16.5V14c0-2 1.2-3.2 3-4l2.5-1.2L9 5h3.5l.8 3.2 4.7 2.1c2.4 1 4 2.6 4 4.7v1.5zM2 16.5h20M6.5 12.5l1.5-1M9.5 12l1.2-1.2',
    ),
  },
  { key: 'stats', icon: navIcon('M18 20V10M12 20V4M6 20v-6') },
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
