import React from 'react';
import { Keyboard, Platform, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, IconButton, Input, Logo, Text, Toggle } from 'kordo-ui';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RootStackParamList } from '../../App';
import * as Styled from './LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginForm'>;

export default function LoginFormScreen({ navigation }: Props) {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
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
      <Styled.TopRow>
        <IconButton
          icon="ArrowLeftRegular"
          accessibilityLabel="Retour"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Créer un compte"
          size="md"
          appearance="black"
          inverted
          borderless
          onPress={() => navigation.navigate('SignUp')}
        />
      </Styled.TopRow>

      <Styled.KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: theme.spacing.xl, gap: theme.spacing.lg }}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInDown.duration(450)} style={{ gap: theme.spacing.lg }}>
            <Logo size={52} />
            <View style={{ gap: 10 }}>
              <Text variant="display" size="lg">
                Connexion
              </Text>
              <Text appearance="gray" style={{ lineHeight: 22 }}>
                Connecte-toi avec les identifiants saisis lors de ton inscription.
              </Text>
            </View>
          </Animated.View>

          <Input
            label="E-mail"
            placeholder="ton@email.com"
            type="email"
            value={email}
            onChange={setEmail}
            leftIcon={{ name: 'MailRegular' }}
            autoFocus
          />

          <Input
            label="Mot de passe"
            placeholder="Ton mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
            leftIcon={{ name: 'LockClosedRegular' }}
          />

          <Styled.OptionsRow>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
              <Toggle value={remember} onChange={setRemember} />
              <Text size="sm" bold appearance="gray">
                Rester connecté
              </Text>
            </View>
            <Text size="sm" extraBold appearance="primary">
              Mot de passe oublié ?
            </Text>
          </Styled.OptionsRow>
        </ScrollView>

        <Styled.BottomSection keyboardVisible={keyboardVisible}>
          <Button
            title="Se connecter"
            size="lg"
            appearance="secondary"
            fullWidth
            onPress={handleConnect}
          />
        </Styled.BottomSection>
      </Styled.KeyboardView>
    </Styled.Container>
  );
}
