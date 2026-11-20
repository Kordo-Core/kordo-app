import { Easing } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavBar, MOTION_CURVES, useToastBottomInset } from 'kordo-ui';
import {
  BAR_HEIGHT,
  FLOAT_BOTTOM,
} from 'kordo-ui/src/components/organisms/BottomNavBar/BottomNavBar.styles';
import { NavTab } from 'kordo-ui/src/components/organisms/BottomNavBar/BottomNavBar.types';
import HomeScreen from './tabs/HomeScreen/HomeScreen';
import SearchScreen from './tabs/SearchScreen/SearchScreen';
import PostForm from './tabs/PostForm/PostForm';
import GymsScreen from './tabs/GymsScreen/GymsScreen';
import StatsScreen from './tabs/StatsScreen/StatsScreen';
import { AddIcon, HomeIcon, SearchIcon, ShoeIcon, StatsIcon } from '../components/icons/NavIcons';

export type MainTabsParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Gyms: undefined;
  Stats: undefined;
};

// L'ordre des onglets doit correspondre à l'ordre des <Tab.Screen> (navigation par index).
const TABS: NavTab[] = [
  { key: 'Home', icon: HomeIcon, isAction: true },
  { key: 'Search', icon: SearchIcon },
  // « + » : carré orange permanent (design D)
  { key: 'Add', icon: AddIcon, accent: true },
  { key: 'Gyms', icon: ShoeIcon },
  { key: 'Stats', icon: StatsIcon },
];

// Changement d'onglet : l'écran glisse légèrement dans le sens du déplacement en fondu,
// sur la courbe « standard » du design D.
const TAB_TRANSITION: BottomTabNavigationOptions = {
  animation: 'shift',
  transitionSpec: {
    animation: 'timing',
    config: { duration: 280, easing: Easing.bezier(...MOTION_CURVES.standard) },
  },
  sceneStyleInterpolator: ({ current }) => ({
    sceneStyle: {
      opacity: current.progress.interpolate({
        inputRange: [-1, -0.6, 0, 0.6, 1],
        outputRange: [0, 0, 1, 0, 0],
      }),
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-32, 0, 32],
          }),
        },
      ],
    },
  }),
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

// Écart entre le haut de la barre et les toasts
const TOAST_GAP = 12;

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  // La création d'un post est plein écran (fermeture par la croix) : son curseur
  // « Glisser pour publier » occupe la place de la barre
  const hidden = state.routeNames[state.index] === 'Add';
  // Les onglets restent montés sous un écran ouvert par-dessus : la barre n'est réellement
  // visible que tant que les onglets ont le focus
  const focused = useIsFocused();
  const insets = useSafeAreaInsets();
  // Toasts posés au-dessus de la barre flottante tant qu'elle est affichée
  useToastBottomInset(
    !hidden && focused ? Math.max(FLOAT_BOTTOM, insets.bottom) + BAR_HEIGHT + TOAST_GAP : null,
  );
  if (hidden) return null;

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
      screenOptions={{ headerShown: false, ...TAB_TRANSITION }}
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
