import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Text, theme } from 'kordo-ui';
import { RootStackParamList } from '../App';
import React from 'react';
import { Keyboard, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Styled from './LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginForm'>;

export default function LoginFormScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const show = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleConnect = () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });

  return (
    <Styled.Container>
      <Styled.BackButton onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={theme.colors.neutral.black} />
      </Styled.BackButton>

      <Styled.KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Styled.TopSection>
          <Styled.Illustration>
            <Text size={32} appearance="primary" extraBold>
              K
            </Text>
            <Text size={32} appearance="secondary" extraBold>
              o
            </Text>
          </Styled.Illustration>

          <Text size={28} bold style={{ textAlign: 'center' }}>
            Connexion
          </Text>

          <Input
            label="Email"
            placeholder="Entrez votre email"
            type="email"
            value={email}
            onChange={setEmail}
            autoFocus
          />

          <Input
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </Styled.TopSection>

        <Styled.Spacer />

        {keyboardVisible ? (
          <Button
            title="Se connecter"
            size="lg"
            fullWidth
            style={{ borderRadius: 0 }}
            onPress={handleConnect}
          />
        ) : (
          <Styled.BottomSection>
            <Button
              title="Se connecter"
              size="lg"
              borderRadius="rounded"
              fullWidth
              onPress={handleConnect}
            />
          </Styled.BottomSection>
        )}
      </Styled.KeyboardView>
    </Styled.Container>
  );
}
