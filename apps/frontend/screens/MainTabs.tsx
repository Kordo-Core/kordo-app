import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavBar } from 'kordo-ui';
import { NavTab } from 'kordo-ui/src/components/organisms/BottomNavBar/BottomNavBar.types';
import HomeScreen from './tabs/HomeScreen';
import SearchScreen from './tabs/SearchScreen';
import AddScreen from './tabs/AddScreen';
import DataScreen from './tabs/DataScreen';
import ProfileScreen from './tabs/ProfileScreen';

export type MainTabsParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Data: undefined;
  Profile: undefined;
};

const TABS: NavTab[] = [
  { key: 'Home', icon: 'HomeRegular', isAction: true },
  { key: 'Search', icon: 'search' },
  { key: 'Add', icon: 'AddSquareFilled' },
  { key: 'Data', icon: 'DataHistogramRegular' },
  { key: 'Profile', icon: 'PersonRegular' },
];

const Tab = createBottomTabNavigator<MainTabsParamList>();

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <BottomNavBar
      tabs={TABS}
      onTabPress={(index) => navigation.navigate(state.routeNames[index])}
    />
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Data" component={DataScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
