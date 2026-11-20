import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Icon, Input, Logo, Text, Toggle } from 'kordo-ui';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RootStackParamList } from '../../App';
import * as Styled from './LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginForm'>;

// Fournisseurs proposés sous le formulaire
const SOCIAL: { title: string; icon: string; color?: string }[] = [
  { title: 'Google', icon: 'google', color: '#EA4335' },
  { title: 'Facebook', icon: 'facebook', color: '#1877F2' },
  { title: 'Apple', icon: 'apple' },
];

export default function LoginFormScreen({ navigation }: Props) {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);

  const handleConnect = () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });

  return (
    <Styled.Container>
      <Styled.KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={Styled.contentStyle} keyboardShouldPersistTaps="handled">
          <Styled.TopRow>
            <Logo size={52} />
            <Styled.HeaderLink
              onPress={() => navigation.navigate('SignUp')}
              accessibilityRole="button"
            >
              <Text size={14} bold>
                Créer un compte
              </Text>
            </Styled.HeaderLink>
          </Styled.TopRow>

          <Animated.View entering={FadeInDown.duration(450)}>
            <Styled.Intro>
              <Text variant="display" size="lg">
                Content de{'\n'}te revoir
              </Text>
              <Text appearance="gray" style={Styled.introBody}>
                Connecte-toi avec les identifiants saisis lors de ton inscription.
              </Text>
            </Styled.Intro>
          </Animated.View>

          <View style={{ gap: 10 }}>
            <Input
              label="E-mail"
              placeholder="ton@email.com"
              type="email"
              value={email}
              onChange={setEmail}
              leftIcon={{ name: 'MailRegular', color: theme.colors.textMuted }}
            />
            <Input
              label="Mot de passe"
              placeholder="Ton mot de passe"
              type="password"
              value={password}
              onChange={setPassword}
              leftIcon={{ name: 'LockClosedRegular', color: theme.colors.textMuted }}
            />
          </View>

          <Styled.OptionsRow>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
              <Toggle size="sm" value={remember} onChange={setRemember} />
              <Text size="sm" appearance="gray" style={{ fontFamily: theme.fonts.semiBold }}>
                Rester connecté
              </Text>
            </View>
            <Text
              size="sm"
              bold
              appearance="primary"
              accessibilityRole="link"
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Mot de passe oublié ?
            </Text>
          </Styled.OptionsRow>

          <Button
            title="Se connecter"
            size="lg"
            textSize={16}
            appearance="secondary"
            fullWidth
            containerStyle={{
              boxShadow: `0px 10px 24px ${theme.mode === 'dark' ? 'rgba(0, 163, 111, 0.18)' : 'rgba(0, 132, 90, 0.18)'}`,
            }}
            onPress={handleConnect}
          />

          {/* Connexion sociale, comme sur la maquette (non branchée, faute de backend) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
            <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
            <Text size="sm" appearance="gray" style={{ fontFamily: theme.fonts.semiBold }}>
              ou continuer avec
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
          </View>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            {SOCIAL.map((p) => (
              <Styled.SocialButton key={p.title} accessibilityRole="button">
                <Icon name={p.icon} size={18} color={p.color ?? theme.colors.text} />
                <Text size={14} bold>
                  {p.title}
                </Text>
              </Styled.SocialButton>
            ))}
          </View>
        </ScrollView>
      </Styled.KeyboardView>
    </Styled.Container>
  );
}
