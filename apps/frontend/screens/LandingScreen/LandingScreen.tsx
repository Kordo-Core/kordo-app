import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Logo, Text } from 'kordo-ui';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Styled from './LandingScreen.styles';
import { RootStackParamList } from 'App';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

// Messages qui défilent sous la photo : première ligne en encre, seconde en couleur d'accent.
const SLIDES = [
  {
    top: 'Grimpe ensemble,',
    accent: 'progresse plus vite.',
    body: 'Trouve ton binôme et rejoins des sessions avec des grimpeurs près de chez toi.',
  },
  {
    top: 'Chaque bloc',
    accent: 'validé compte.',
    body: 'Valide tes blocs en salle, grimpe au classement et débloque des badges.',
  },
  {
    top: 'Toute ta grimpe,',
    accent: 'en un coup d’œil.',
    body: 'Séances, niveaux et salles visitées réunis dans tes stats.',
  },
];

const HERO_URI =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg';

export default function LandingScreen({ navigation }: Props) {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);

  // Les messages tournent toutes les 4 s ; toucher un point y saute directement.
  React.useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <Styled.Screen>
      <Styled.Hero>
        <Image source={{ uri: HERO_URI }} style={{ width: '100%', height: '100%' }} />
        {/* Voile de la maquette : sombre en haut (logo) et en bas (puce), clair au milieu */}
        <LinearGradient
          colors={[
            `rgba(${theme.colors.scrim}, 0.45)`,
            `rgba(${theme.colors.scrim}, 0)`,
            `rgba(${theme.colors.scrim}, 0)`,
            `rgba(${theme.colors.scrim}, 0.6)`,
          ]}
          locations={[0, 0.3, 0.62, 1]}
          style={StyleSheet.absoluteFill}
        />
        <Styled.HeroTop>
          <Logo size={40} variant="light" withWordmark wordmarkColor={theme.colors.neutral.white} />
        </Styled.HeroTop>
        <Styled.LiveChip>
          <Styled.LiveDot />
          <Text size="sm" bold appearance="white">
            2 340 grimpeurs en séance
          </Text>
        </Styled.LiveChip>
      </Styled.Hero>

      <Styled.Bottom>
        {/* La clé force le remontage : chaque message entre avec son propre fondu */}
        <Animated.View key={index} entering={FadeInDown.duration(450)} style={{ gap: 10 }}>
          <Text variant="display" size={40}>
            {slide.top}
            {'\n'}
            <Text variant="display" size={40} appearance="secondary">
              {slide.accent}
            </Text>
          </Text>
          <Text appearance="gray" style={{ lineHeight: 22.5 }}>
            {slide.body}
          </Text>
        </Animated.View>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          {SLIDES.map((s, i) => (
            <Pressable
              key={s.top}
              onPress={() => setIndex(i)}
              accessibilityLabel={`Message ${i + 1}`}
              hitSlop={8}
            >
              <Styled.Dot active={i === index} />
            </Pressable>
          ))}
        </View>

        <Styled.Actions>
          <Button
            title="Créer un compte"
            size="lg"
            appearance="black"
            icon={{ name: 'ChevronRightRegular', size: 18 }}
            iconPosition="right"
            style={{ flex: 1.4 }}
            containerStyle={{ borderRadius: 8 }}
            onPress={() => navigation.navigate('SignUp')}
          />
          <Button
            title="Connexion"
            size="lg"
            appearance="secondary"
            inverted
            borderless
            containerStyle={{ backgroundColor: theme.colors.soft, borderRadius: 8 }}
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('LoginForm')}
          />
        </Styled.Actions>
      </Styled.Bottom>
    </Styled.Screen>
  );
}
