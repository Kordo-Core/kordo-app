import React from 'react';
import { Linking, Platform, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Icon, IconButton, Text, useToast } from 'kordo-ui';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { RootStackParamList } from '../../App';
import * as Styled from '../LoginFormScreen/LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPasswordSent'>;

// Confirmation de l'envoi du lien de réinitialisation (fictif).
export default function ForgotPasswordSentScreen({ navigation, route }: Props) {
  const theme = useTheme();
  const { addToast } = useToast();
  const { email } = route.params;

  const backToLogin = () => navigation.goBack();

  return (
    <Styled.Container>
      <View style={[Styled.contentStyle, { flex: 1 }]}>
        <View style={{ height: 56, justifyContent: 'center', alignItems: 'flex-start' }}>
          <IconButton icon="ChevronLeftRegular" onPress={backToLogin} accessibilityLabel="Retour" />
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Animated.View
            entering={ZoomIn.springify()}
            style={{
              width: 96,
              height: 96,
              borderRadius: 12,
              backgroundColor: theme.colors.soft,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="MailRegular" size={44} color={theme.colors.softText} />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(450).delay(150)} style={{ gap: 10 }}>
            <Text variant="display" size="lg" style={{ textAlign: 'center' }}>
              Vérifie{'\n'}tes e-mails
            </Text>
            <Text appearance="gray" style={[Styled.introBody, { textAlign: 'center' }]}>
              On a envoyé un lien à{' '}
              <Text bold style={Styled.introBody}>
                {email}
              </Text>
              . Il est valable 30 minutes.
            </Text>
          </Animated.View>
        </View>

        <View style={{ gap: 10 }}>
          <Button
            title="Ouvrir ma messagerie"
            size="lg"
            textSize={16}
            appearance="secondary"
            fullWidth
            onPress={() =>
              Linking.openURL(Platform.OS === 'ios' ? 'message://' : 'mailto:').catch(() => {})
            }
          />
          <Button
            title="Retour à la connexion"
            size="lg"
            textSize={16}
            appearance="black"
            inverted
            fullWidth
            onPress={backToLogin}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, paddingTop: 4 }}>
            <Text size="sm" appearance="gray">
              Rien reçu ?
            </Text>
            <Text
              size="sm"
              bold
              appearance="primary"
              accessibilityRole="button"
              onPress={() =>
                addToast({
                  message: 'Nouveau lien envoyé',
                  type: 'success',
                  showLoader: false,
                  isClosable: true,
                  duration: 2500,
                })
              }
            >
              Renvoyer le lien
            </Text>
          </View>
        </View>
      </View>
    </Styled.Container>
  );
}
