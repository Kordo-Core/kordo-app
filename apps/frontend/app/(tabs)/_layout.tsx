import { Tabs } from 'expo-router';
import { BottomNavBar } from 'kordo-ui';
import { NavTab } from 'kordo-ui/src/components/organisms/BottomNavBar/BottomNavBar.types';

const TABS: NavTab[] = [
  { key: 'home', icon: 'HomeRegular' },
  { key: 'search', icon: 'search' },
  { key: 'add', icon: 'AddSquareFilled', isAction: true },
  { key: 'data', icon: 'DataHistogramRegular' },
  { key: 'profile', icon: 'PersonRegular' },
];

interface CustomTabBarProps {
  state: any;
  navigation: any;
}

function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  const screenNames = ['home', 'search', 'add', 'data', 'profile'];

  const handleTabPress = (index: number) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routeNames[index],
      preventDefault: () => {},
    });

    if (!event.defaultPrevented) {
      navigation.navigate(screenNames[index]);
    }
  };

  const updatedTabs = TABS.map((tab, idx) => ({
    ...tab,
    isAction: state.index === idx,
  }));

  return (
    <BottomNavBar
      tabs={updatedTabs}
      onTabPress={(index: number) => {
        handleTabPress(index);
      }}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="data" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
