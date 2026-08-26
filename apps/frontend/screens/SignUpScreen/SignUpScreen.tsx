import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from 'kordo-ui';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <Text size="lg">Créer un compte</Text>
      <Button
        title="S'inscrire"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })}
      />
    </View>
  );
}
