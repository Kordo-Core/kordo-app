import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import { Button, Checkbox, Icon, Input, Logo, Text } from 'kordo-ui';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { RootStackParamList } from '../../App';
// Même colonne, même en-tête et mêmes boutons sociaux que l'écran de connexion
import * as Styled from '../LoginFormScreen/LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

// Force du mot de passe sur 4 critères : longueur ≥ 6, ≥ 9, lettres + chiffres, caractère spécial
const passwordStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 9) score++;
  if (/[0-9]/.test(pw) && /[a-zA-Z]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  return score;
};

const STRENGTH_LABELS = ['', 'Faible', 'Moyen', 'Solide', 'Excellent'];

export default function SignUpScreen({ navigation }: Props) {
  const theme = useTheme();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [accepted, setAccepted] = React.useState(false);

  const strength = passwordStrength(password);
  const strengthColor =
    strength <= 1
      ? theme.colors.error.base
      : strength <= 2
        ? theme.colors.primary.base
        : theme.colors.secondary.base;
  const canSubmit = username.length > 1 && /\S+@\S+\.\S+/.test(email) && strength >= 2 && accepted;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={Styled.contentStyle} keyboardShouldPersistTaps="handled">
        <Styled.TopRow>
          <Logo size={52} />
          <Styled.HeaderLink
            onPress={() => navigation.navigate('LoginForm')}
            accessibilityRole="button"
          >
            <Text size={14} bold>
              Connexion
            </Text>
          </Styled.HeaderLink>
        </Styled.TopRow>

        <Animated.View entering={FadeInDown.duration(450)}>
          <Styled.Intro>
            <Text variant="display" size="lg">
              Crée ton{'\n'}compte
            </Text>
            <Text appearance="gray" style={Styled.introBody}>
              Ton e-mail, ton nom et un mot de passe sécurisé. Ça prend 30 secondes.
            </Text>
          </Styled.Intro>
        </Animated.View>

        <Input
          label="Nom d’utilisateur"
          placeholder="Ton pseudo de grimpeur"
          value={username}
          onChange={setUsername}
          leftIcon={{ name: 'PersonRegular', color: theme.colors.textMuted }}
        />
        <Input
          label="E-mail"
          placeholder="ton@email.com"
          type="email"
          value={email}
          onChange={setEmail}
          leftIcon={{ name: 'MailRegular', color: theme.colors.textMuted }}
          rightIcon={
            /\S+@\S+\.\S+/.test(email)
              ? { name: 'CheckmarkCircleFilled', size: 24, color: theme.colors.secondary.base }
              : undefined
          }
        />
        <Input
          label="Mot de passe"
          placeholder="Au moins 8 caractères"
          type="password"
          value={password}
          onChange={setPassword}
          leftIcon={{ name: 'LockClosedRegular', color: theme.colors.textMuted }}
          revealable
        />

        {/* Jauge de force : quatre segments qui se remplissent dans la couleur du niveau */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 4 }}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 3,
                overflow: 'hidden',
                backgroundColor: theme.colors.border,
              }}
            >
              <Animated.View
                layout={LinearTransition.springify()}
                style={{
                  height: '100%',
                  width: i < strength ? '100%' : '0%',
                  backgroundColor: strengthColor,
                }}
              />
            </View>
          ))}
          <Text size="xs" extraBold style={{ width: 64, textAlign: 'right', color: strengthColor }}>
            {STRENGTH_LABELS[strength]}
          </Text>
        </View>

        <Pressable
          onPress={() => setAccepted((a) => !a)}
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-start',
            paddingTop: 4,
            paddingHorizontal: 4,
            paddingBottom: 6,
          }}
        >
          <Checkbox checked={accepted} onChange={setAccepted} />
          <Text size="sm" appearance="gray" style={{ flex: 1, lineHeight: 18.2 }}>
            J’accepte les conditions d’utilisation et la politique de confidentialité de Kordo.
          </Text>
        </Pressable>

        <Button
          title="Créer mon compte"
          size="lg"
          textSize={16}
          appearance="secondary"
          disabled={!canSubmit}
          fullWidth
          containerStyle={{
            boxShadow: `0px 10px 24px ${theme.mode === 'dark' ? 'rgba(0, 163, 111, 0.18)' : 'rgba(0, 132, 90, 0.18)'}`,
          }}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] })}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
          <Text size="sm" appearance="gray" style={{ fontFamily: theme.fonts.semiBold }}>
            ou continuer avec
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
        </View>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          {[
            { title: 'Google', icon: 'google', color: '#EA4335' },
            { title: 'Facebook', icon: 'facebook', color: '#1877F2' },
            { title: 'Apple', icon: 'apple', color: theme.colors.text },
          ].map((p) => (
            <Styled.SocialButton key={p.title} accessibilityRole="button">
              <Icon name={p.icon} size={18} color={p.color} />
              <Text size={14} bold>
                {p.title}
              </Text>
            </Styled.SocialButton>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
