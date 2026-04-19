import { ThemeProvider } from '@emotion/react';
import { Stack } from 'expo-router';
import { theme, ToastProvider } from 'kordo-ui';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ animationEnabled: false }} />
            <Stack.Screen name="login" options={{ animationEnabled: false }} />
            <Stack.Screen name="(tabs)" options={{ animationEnabled: false }} />
          </Stack>
        </SafeAreaView>
      </ToastProvider>
    </ThemeProvider>
  );
}
