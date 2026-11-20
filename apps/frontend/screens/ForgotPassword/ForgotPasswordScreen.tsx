import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, IconButton, Input, Text } from 'kordo-ui';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RootStackParamList } from '../../App';
import { TwoToneTitle } from '../../components/TwoToneTitle/TwoToneTitle';
import * as Styled from '../LoginFormScreen/LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

// Mot de passe oublié : l'e-mail du compte, puis l'envoi du lien (fictif, faute de backend).
export default function ForgotPasswordScreen({ navigation }: Props) {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');

  return (
    <Styled.Container>
      <Styled.KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={Styled.contentStyle} keyboardShouldPersistTaps="handled">
          <View style={{ height: 56, justifyContent: 'center', alignItems: 'flex-start' }}>
            <IconButton
              icon="ChevronLeftRegular"
              onPress={() => navigation.goBack()}
              accessibilityLabel="Retour"
            />
          </View>

          <Animated.View entering={FadeInDown.duration(450)}>
            <Styled.Intro>
              <TwoToneTitle first="Mot de passe" second="oublié ?" />
              <Text appearance="gray" style={Styled.introBody}>
                Pas de panique. Entre l’e-mail de ton compte, on t’envoie un lien pour en choisir un
                nouveau.
              </Text>
            </Styled.Intro>
          </Animated.View>

          <Input
            label="E-mail"
            placeholder="ton@email.com"
            type="email"
            value={email}
            onChange={setEmail}
            autoFocus
            leftIcon={{ name: 'MailRegular', color: theme.colors.textMuted }}
          />

          <Button
            title="Envoyer le lien"
            size="lg"
            textSize={16}
            appearance="secondary"
            disabled={!isEmail(email)}
            fullWidth
            containerStyle={{
              boxShadow: `0px 10px 24px ${theme.mode === 'dark' ? 'rgba(0, 163, 111, 0.18)' : 'rgba(0, 132, 90, 0.18)'}`,
            }}
            onPress={() => navigation.replace('ForgotPasswordSent', { email: email.trim() })}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, paddingTop: 6 }}>
            <Text size="sm" appearance="gray">
              Tu t’en souviens ?
            </Text>
            <Text
              size="sm"
              bold
              appearance="primary"
              onPress={() => navigation.goBack()}
              accessibilityRole="link"
            >
              Se connecter
            </Text>
          </View>
        </ScrollView>
      </Styled.KeyboardView>
    </Styled.Container>
  );
}
