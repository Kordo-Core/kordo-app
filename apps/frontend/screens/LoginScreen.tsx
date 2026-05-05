import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from 'kordo-ui';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <Text size="lg">Page de connexion</Text>
      <Button
        title="Se connecter"
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
        }
      />
    </View>
  );
}
