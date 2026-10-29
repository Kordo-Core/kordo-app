import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Text } from 'kordo-ui';
import { Feather } from '@expo/vector-icons';
import * as Styled from './LoginScreen.styles';
import { RootStackParamList } from 'App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const theme = useTheme();
  return (
    <Styled.Container>
      <Styled.BackButton onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={theme.colors.neutral.black} />
      </Styled.BackButton>

      <Styled.CenterSection>
        <Styled.Illustration>
          <Text size={40} appearance="primary" extraBold>
            K
          </Text>
          <Text size={40} appearance="secondary" extraBold>
            o
          </Text>
        </Styled.Illustration>

        <Text size={32} bold style={{ textAlign: 'center' }}>
          Bienvenue !
        </Text>
        <Text size="lg" appearance="gray" style={{ textAlign: 'center', lineHeight: 26 }}>
          Connectez-vous pour accéder{'\n'}à votre compte Kordo
        </Text>
      </Styled.CenterSection>

      <Styled.BottomSection>
        <Styled.SocialButton
          title="Continuer avec Google"
          size="lg"
          borderRadius="rounded"
          inverted
          borderless
          containerStyle={{ backgroundColor: theme.colors.neutral.gray.lightest }}
          icon={{ name: 'google', size: 24, color: 'red' }}
          fullWidth
        />

        <Styled.SocialButton
          title="Continuer avec Apple"
          size="lg"
          borderRadius="rounded"
          inverted
          borderless
          containerStyle={{ backgroundColor: theme.colors.neutral.gray.lightest }}
          icon={{ name: 'apple', size: 24, color: theme.colors.neutral.black }}
          fullWidth
        />

        <Button
          title="Continuer avec mon Email"
          size="lg"
          borderRadius="rounded"
          inverted
          appearance="gray"
          icon={{ name: 'mail', size: 24 }}
          onPress={() => navigation.navigate('LoginForm')}
          fullWidth
        />
      </Styled.BottomSection>

      <Text size="md" appearance="gray" style={{ textAlign: 'center', lineHeight: 20 }}>
        En continuant, j'accepte les{' '}
        <Text size="md" style={{ textDecorationLine: 'underline' }}>
          CGU
        </Text>
        et la{' '}
        <Text size="md" style={{ textDecorationLine: 'underline' }}>
          politique de confidentialité
        </Text>
        .
      </Text>
    </Styled.Container>
  );
}
