import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text } from 'kordo-ui';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <Text size="lg">Page de connexion</Text>
      <Button title="Se connecter" onPress={() => router.replace('/(tabs)/home')} />
    </View>
  );
}
