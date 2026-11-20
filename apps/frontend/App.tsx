import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KordoThemeProvider, ToastProvider } from 'kordo-ui';
import { kordoFonts } from 'kordo-ui/src/fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import LandingScreen from './screens/LandingScreen/LandingScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import LoginFormScreen from './screens/LoginFormScreen/LoginFormScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPassword/ForgotPasswordScreen';
import ForgotPasswordSentScreen from './screens/ForgotPassword/ForgotPasswordSentScreen';
import OnboardingScreen from './screens/Onboarding/OnboardingScreen';
import EditProfileScreen from './screens/EditProfile/EditProfileScreen';
import MainTabs from './screens/MainTabs';
import AllGymsScreen from './screens/gyms/AllGyms/AllGymsScreen';
import GymScreen from './screens/gyms/GymScreen/GymScreen';
import NotificationsScreen from './screens/Notifications/NotificationsScreen';
import UserProfile from './screens/UserProfile/UserProfile';
import UserRelationsScreen from './screens/UserRelations/UserRelationsScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import NotificationsSettingsScreen from './screens/Settings/NotificationsSettingsScreen';
import LikedPostsScreen from './screens/Settings/LikedPostsScreen';
import MyCommentsScreen from './screens/Settings/MyCommentsScreen';
import MentionsScreen from './screens/Settings/MentionsScreen';
import AccountPrivacyScreen from './screens/Settings/AccountPrivacyScreen';
import CloseFriendsScreen from './screens/Settings/CloseFriendsScreen';
import BlockedAccountsScreen from './screens/Settings/BlockedAccountsScreen';
import AppearanceScreen from './screens/Settings/AppearanceScreen';
import LanguageScreen from './screens/Settings/LanguageScreen';
import ConversationsScreen from './screens/Messages/ConversationsScreen';
import ChatScreen from './screens/Messages/ChatScreen';
import NewConversationScreen from './screens/Messages/NewConversationScreen';
import TrophiesScreen from './screens/Trophies/TrophiesScreen';
import BadgeScreen from './screens/Trophies/BadgeScreen';
import { RelationPivot } from './screens/UserRelations/UserRelationsScreen.types';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  LoginForm: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ForgotPasswordSent: { email: string };
  Onboarding: undefined;
  EditProfile: undefined;
  MainTabs: undefined;
  AllGyms: undefined;
  Gym: { gymId: string; blocId?: string; initialTab?: 'blocs' };
  Notifications: undefined;
  UserProfile: { userId: string };
  UserRelations: { userId: string; pivot: RelationPivot };
  Settings: undefined;
  NotificationsSettings: undefined;
  LikedPosts: undefined;
  MyComments: undefined;
  Mentions: undefined;
  AccountPrivacy: undefined;
  CloseFriends: undefined;
  BlockedAccounts: undefined;
  Appearance: undefined;
  Language: undefined;
  Conversations: undefined;
  Chat: { conversationId: string };
  NewConversation: undefined;
  Trophies: undefined;
  Badge: { trophyId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Web : comme sur mobile, aucune barre de défilement visible (le navigateur en dessine une
// permanente sur chaque liste, que la maquette n'a pas).
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = '*{scrollbar-width:none}*::-webkit-scrollbar{display:none}';
  document.head.appendChild(style);
}

export default function App() {
  // Polices de la maquette « sport » (Plus Jakarta Sans + Barlow Condensed italique), embarquées par kordo-ui
  const [fontsLoaded] = useFonts(kordoFonts);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Thème clair par défaut ; l'écran Apparence bascule en sombre via useThemeMode() */}
        <KordoThemeProvider initialMode="light">
          <ToastProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  // Push iOS sur les deux plateformes, retour au geste depuis le bord
                  animation: 'ios_from_right',
                  gestureEnabled: true,
                }}
                // initialRouteName="MainTabs"
              >
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="LoginForm" component={LoginFormScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="ForgotPasswordSent" component={ForgotPasswordSentScreen} />
                <Stack.Screen
                  name="Onboarding"
                  component={OnboardingScreen}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                  options={{ animation: 'slide_from_bottom' }}
                />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="AllGyms" component={AllGymsScreen} />
                <Stack.Screen name="Gym" component={GymScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="UserRelations" component={UserRelationsScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen
                  name="NotificationsSettings"
                  component={NotificationsSettingsScreen}
                />
                <Stack.Screen name="LikedPosts" component={LikedPostsScreen} />
                <Stack.Screen name="MyComments" component={MyCommentsScreen} />
                <Stack.Screen name="Mentions" component={MentionsScreen} />
                <Stack.Screen name="AccountPrivacy" component={AccountPrivacyScreen} />
                <Stack.Screen name="CloseFriends" component={CloseFriendsScreen} />
                <Stack.Screen name="BlockedAccounts" component={BlockedAccountsScreen} />
                <Stack.Screen name="Appearance" component={AppearanceScreen} />
                <Stack.Screen name="Language" component={LanguageScreen} />
                <Stack.Screen name="Conversations" component={ConversationsScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="NewConversation" component={NewConversationScreen} />
                <Stack.Screen name="Trophies" component={TrophiesScreen} />
                <Stack.Screen
                  name="Badge"
                  component={BadgeScreen}
                  options={{ animation: 'fade_from_bottom' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ToastProvider>
        </KordoThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
