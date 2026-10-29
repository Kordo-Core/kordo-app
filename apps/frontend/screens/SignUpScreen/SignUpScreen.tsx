import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import { Button, Checkbox, IconButton, Input, Logo, Text } from 'kordo-ui';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { RootStackParamList } from '../../App';

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
        : theme.colors.success.base;
  const canSubmit = username.length > 1 && /\S+@\S+\.\S+/.test(email) && strength >= 2 && accepted;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.xl,
          paddingTop: theme.spacing.sm,
        }}
      >
        <IconButton
          icon="ArrowLeftRegular"
          accessibilityLabel="Retour"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Connexion"
          size="md"
          appearance="black"
          inverted
          borderless
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.xl,
          gap: theme.spacing.lg,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.duration(450)} style={{ gap: theme.spacing.lg }}>
          <Logo size={52} />
          <View style={{ gap: 10 }}>
            <Text variant="display" size="lg">
              Crée ton{'\n'}compte
            </Text>
            <Text appearance="gray" style={{ lineHeight: 22 }}>
              Ton e-mail, ton nom et un mot de passe sécurisé. Ça prend 30 secondes.
            </Text>
          </View>
        </Animated.View>

        <Input
          label="Nom d’utilisateur"
          placeholder="Ton pseudo de grimpeur"
          value={username}
          onChange={setUsername}
          leftIcon={{ name: 'PersonRegular' }}
        />
        <Input
          label="E-mail"
          placeholder="ton@email.com"
          type="email"
          value={email}
          onChange={setEmail}
          leftIcon={{ name: 'MailRegular' }}
        />
        <Input
          label="Mot de passe"
          placeholder="Au moins 8 caractères"
          type="password"
          value={password}
          onChange={setPassword}
          leftIcon={{ name: 'LockClosedRegular' }}
        />

        {/* Jauge de force : quatre segments qui se remplissent dans la couleur du niveau */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
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
          style={{ flexDirection: 'row', gap: theme.spacing.sm + 2, alignItems: 'flex-start' }}
        >
          <Checkbox checked={accepted} onChange={setAccepted} />
          <Text size="sm" appearance="gray" style={{ flex: 1, lineHeight: 19 }}>
            J’accepte les conditions d’utilisation et la politique de confidentialité de Kordo.
          </Text>
        </Pressable>

        <Button
          title="Créer mon compte"
          size="lg"
          appearance="secondary"
          disabled={!canSubmit}
          fullWidth
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
          <Text size="sm" bold appearance="gray">
            ou continuer avec
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
        </View>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          <Button
            title="Google"
            appearance="black"
            inverted
            icon={{ name: 'google', size: 18, color: '#EA4335' }}
            style={{ flex: 1 }}
          />
          <Button
            title="Apple"
            appearance="black"
            inverted
            icon={{ name: 'apple', size: 18, color: theme.colors.text }}
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
