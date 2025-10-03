import { Button, Input, Text, theme } from 'kordo-ui';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from '@emotion/react';
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';
import { useEffect, useState } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  // 👇 un state par input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');

  useEffect(() => {
    console.log({ username, email, password, experience });
  }, [username, email, password, experience]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Button
          title="Primary"
          appearance="primary"
          inverted
          borderRadius="rounded"
          icon={{ name: 'arrow-right', position: 'right' }}
          onClick={() => alert('Primary Button Clicked')}
          size="lg"
        />

        <Input placeholder="Username" value={username} onChangeText={setUsername} required />

        <Input
          placeholder="Email"
          icon={{ name: 'envelope', position: 'left' }}
          value={email}
          label="Email"
          maxLength={20}
          type="email"
          onChangeText={setEmail}
          required
        />

        <Input
          placeholder="Password"
          maxLength={8}
          icon={{ name: 'lock', position: 'right' }}
          value={password}
          type="password"
          label="Password"
          onChangeText={setPassword}
        />

        <Input
          placeholder="Years of Experience"
          icon={{ name: 'address-card', position: 'left' }}
          type="number"
          maxLength={3}
          value={experience}
          onChangeText={setExperience}
        />

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
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
