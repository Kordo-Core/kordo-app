import { Button, Input, Loader, theme } from 'kordo-ui';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from '@emotion/react';
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';
import { useState } from 'react';
import {
  ToastProvider,
  useToast,
} from '../../kordo-ui/src/components/layouts/ToastProvider/ToastProvider';

export default function App() {
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_500Medium, Outfit_700Bold });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        {/* Rendu de l’écran Home */}
        <HomeScreen />
      </ToastProvider>
    </ThemeProvider>
  );
}

/* --- Écran Home --- */
function HomeScreen() {
  const [username, setUsername] = useState('');
  const { addToast } = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Show Success Toast"
        appearance="primary"
        inverted
        borderRadius="rounded"
        icon={{ name: 'arrow-right-circle', position: 'right' }}
        onClick={() => {
          addToast({ type: 'error', message: `Hello ${username}`, duration: 7000 });
        }}
        size="lg"
      />
      <Input placeholder="Username" value={username} onChangeText={setUsername} required />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
});
