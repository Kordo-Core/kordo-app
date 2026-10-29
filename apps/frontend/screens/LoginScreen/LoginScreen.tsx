import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, IconButton, Logo, Text } from 'kordo-ui';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Styled from './LoginScreen.styles';
import { RootStackParamList } from 'App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const theme = useTheme();
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

      <Styled.CenterSection>
        <Animated.View entering={FadeInDown.springify().damping(14)}>
          <Logo size={64} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(80).duration(450)} style={{ gap: 10 }}>
          <Text variant="display" size="lg">
            Content de{'\n'}te revoir
          </Text>
          <Text appearance="gray" style={{ lineHeight: 22 }}>
            Connecte-toi pour retrouver tes séances, tes blocs et ta cordée.
          </Text>
        </Animated.View>
      </Styled.CenterSection>

      <Animated.View entering={FadeInDown.delay(160).duration(450)}>
        <Styled.BottomSection>
          <Button
            title="Continuer avec Google"
            size="lg"
            appearance="black"
            inverted
            icon={{ name: 'google', size: 22, color: '#EA4335' }}
            fullWidth
          />
          <Button
            title="Continuer avec Apple"
            size="lg"
            appearance="black"
            inverted
            icon={{ name: 'apple', size: 22, color: theme.colors.text }}
            fullWidth
          />
          <Button
            title="Continuer avec mon e-mail"
            size="lg"
            appearance="secondary"
            icon={{ name: 'MailRegular', size: 22 }}
            onPress={() => navigation.navigate('LoginForm')}
            fullWidth
          />
        </Styled.BottomSection>
      </Animated.View>

      <View style={{ paddingHorizontal: 28 }}>
        <Text size="xs" appearance="gray" style={{ textAlign: 'center', lineHeight: 18 }}>
          En continuant, j’accepte les{' '}
          <Text size="xs" bold style={{ textDecorationLine: 'underline' }}>
            CGU
          </Text>{' '}
          et la{' '}
          <Text size="xs" bold style={{ textDecorationLine: 'underline' }}>
            politique de confidentialité
          </Text>
          .
        </Text>
      </View>
    </Styled.Container>
  );
}
