import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme, ToastProvider } from 'kordo-ui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';
import LandingScreen from './screens/LandingScreen/LandingScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import LoginFormScreen from './screens/LoginFormScreen/LoginFormScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import MainTabs from './screens/MainTabs';
import AllGymsScreen from './screens/gyms/AllGyms/AllGymsScreen';
import GymScreen from './screens/gyms/GymScreen/GymScreen';
import NotificationsScreen from './screens/Notifications/NotificationsScreen';
import UserProfile from './screens/UserProfile/UserProfile';
import UserRelationsScreen from './screens/UserRelations/UserRelationsScreen';
import { RelationPivot } from './screens/UserRelations/UserRelationsScreen.types';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  LoginForm: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  AllGyms: undefined;
  Gym: { gymId: string; blocId?: string };
  Notifications: undefined;
  UserProfile: { userId: string };
  UserRelations: { userId: string; pivot: RelationPivot };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_500Medium, Outfit_700Bold });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false, animation: 'none' }}
                // initialRouteName="MainTabs"
              >
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="LoginForm" component={LoginFormScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="AllGyms" component={AllGymsScreen} />
                <Stack.Screen name="Gym" component={GymScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="UserRelations" component={UserRelationsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
