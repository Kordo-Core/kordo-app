import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text } from 'kordo-ui';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <Text size="xl" bold>
        Bienvenu
      </Text>
      <Button title="Se connecter" onPress={() => router.push('/login')} />
    </View>
  );
}
