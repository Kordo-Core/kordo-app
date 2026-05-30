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
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import LoginFormScreen from './screens/LoginFormScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainTabs from './screens/MainTabs';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  LoginForm: undefined;
  SignUp: undefined;
  MainTabs: undefined;
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
                initialRouteName="MainTabs"
              >
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="LoginForm" component={LoginFormScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
              </Stack.Navigator>
            </NavigationContainer>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
