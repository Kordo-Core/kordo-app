import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavBar } from 'kordo-ui';
import { NavTab } from 'kordo-ui/src/components/organisms/BottomNavBar/BottomNavBar.types';
import HomeScreen from './tabs/HomeScreen/HomeScreen';
import SearchScreen from './tabs/SearchScreen/SearchScreen';
import PostForm from './tabs/PostForm/PostForm';
import GymsScreen from './tabs/GymsScreen/GymsScreen';
import StatsScreen from './tabs/StatsScreen/StatsScreen';
import { ClimbingShoesIcon } from '../components/icons/ClimbingShoesIcon';
import { ProgressIcon } from '../components/icons/ProgressIcon';

export type MainTabsParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Gyms: undefined;
  Stats: undefined;
};

// L'ordre des onglets doit correspondre à l'ordre des <Tab.Screen> (navigation par index).
const TABS: NavTab[] = [
  { key: 'Home', icon: 'HomeRegular', isAction: true },
  { key: 'Search', icon: 'search' },
  { key: 'Add', icon: 'AddSquareFilled' },
  { key: 'Gyms', icon: ClimbingShoesIcon },
  { key: 'Stats', icon: ProgressIcon },
];

const Tab = createBottomTabNavigator<MainTabsParamList>();

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <BottomNavBar
      tabs={TABS}
      activeIndex={state.index}
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
      <Tab.Screen name="Add" component={PostForm} />
      <Tab.Screen name="Gyms" component={GymsScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}
