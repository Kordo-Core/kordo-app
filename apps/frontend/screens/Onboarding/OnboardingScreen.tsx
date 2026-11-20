import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon, IconButton, Input, Text } from 'kordo-ui';
import Animated, { FadeInDown, FadeInRight, LinearTransition } from 'react-native-reanimated';
import { RootStackParamList } from '../../App';
import { TwoToneTitle } from '../../components/TwoToneTitle/TwoToneTitle';
import {
  GRADE_HINTS,
  ONBOARDING_GRADES,
  OnboardingGrade,
  getSuggestedClimbers,
  searchGyms,
} from '../../fake_data';
import * as Styled from '../LoginFormScreen/LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const STEPS = 3;

// Accueil après l'inscription, en 3 étapes : salle principale, niveau max, grimpeurs à suivre.
// Chaque étape peut être passée ; la dernière ouvre le fil.
export default function OnboardingScreen({ navigation }: Props) {
  const theme = useTheme();
  const [step, setStep] = React.useState(1);
  const [query, setQuery] = React.useState('');
  const [gymId, setGymId] = React.useState('arkose-nation');
  const [grade, setGrade] = React.useState<OnboardingGrade>('6C');
  const [followed, setFollowed] = React.useState<string[]>([]);

  const gyms = searchGyms(query);
  const gymName = searchGyms('').find((g) => g.gym.id === gymId)?.gym.name ?? 'ta salle';
  const climbers = getSuggestedClimbers(gymName);

  const finish = () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  const next = () => (step < STEPS ? setStep(step + 1) : finish());

  const toggleFollow = (id: string) =>
    setFollowed((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const cardBorder = (on: boolean) => ({
    borderWidth: on ? 1.5 : 1,
    borderColor: on ? theme.colors.secondary.base : theme.colors.border,
  });

  // --- Étape 1 : salle principale
  const gymStep = (
    <View style={{ gap: 12 }}>
      <Input
        value={query}
        onChange={setQuery}
        placeholder="Rechercher une salle ou une ville"
        leftIcon={{ name: 'SearchRegular', color: theme.colors.textMuted }}
      />
      <Text variant="eyebrow" size={11} style={{ paddingHorizontal: 4, paddingTop: 4 }}>
        {query.trim() ? 'Résultats' : 'Près de toi'}
      </Text>
      {gyms.length === 0 && (
        <Text appearance="gray" style={{ paddingHorizontal: 4 }}>
          Aucune salle ne correspond à « {query.trim()} ».
        </Text>
      )}
      {gyms.map(({ gym, subtitle }) => {
        const on = gym.id === gymId;
        return (
          <Pressable
            key={gym.id}
            onPress={() => setGymId(gym.id)}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              padding: 9,
              borderRadius: theme.borderRadius.card,
              backgroundColor: on ? theme.colors.soft : theme.colors.surface,
              ...cardBorder(on),
            }}
          >
            <Image
              source={{ uri: gym.imageUri }}
              style={{
                width: 52,
                height: 52,
                borderRadius: theme.borderRadius.square,
                backgroundColor: theme.colors.surfaceAlt,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text bold size="md" numberOfLines={1}>
                {gym.name}
              </Text>
              <Text size="sm" appearance="gray" numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
            <View
              style={{
                width: 26,
                height: 26,
                marginRight: 4,
                borderRadius: 13,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? theme.colors.secondary.base : 'transparent',
                borderWidth: on ? 0 : 1.5,
                borderColor: theme.colors.border,
              }}
            >
              {on && <Icon name="CheckmarkRegular" size={16} color={theme.colors.neutral.white} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );

  // --- Étape 2 : niveau max
  const gradeStep = (
    <View style={{ gap: 14 }}>
      <LinearGradient
        colors={theme.colors.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: theme.borderRadius.lg, padding: theme.spacing.xl, gap: 4 }}
      >
        <Text variant="eyebrow" size={11} style={{ color: theme.colors.soft }}>
          Ton niveau max
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}
        >
          <Text variant="display" size={72} appearance="white" style={{ lineHeight: 76 }}>
            {grade}
          </Text>
          <Text bold size="sm" style={{ color: theme.colors.soft, paddingBottom: 12 }}>
            {GRADE_HINTS[grade]}
          </Text>
        </View>
      </LinearGradient>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {ONBOARDING_GRADES.map((g) => {
          const on = g === grade;
          return (
            <Pressable
              key={g}
              onPress={() => setGrade(g)}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              style={{
                width: '23.2%',
                height: 52,
                borderRadius: theme.borderRadius.square,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? theme.colors.primary.base : theme.colors.surface,
                borderWidth: on ? 0 : 1,
                borderColor: theme.colors.border,
              }}
            >
              <Text variant="display" size={22}>
                {g}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text
        bold
        style={{ color: theme.colors.accentText, textAlign: 'center', paddingTop: 6 }}
        onPress={() => setGrade('5')}
        accessibilityRole="button"
      >
        Je débute, je ne sais pas encore
      </Text>
    </View>
  );

  // --- Étape 3 : grimpeurs à suivre
  const followStep = (
    <View
      style={{
        borderRadius: theme.borderRadius.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        overflow: 'hidden',
      }}
    >
      {climbers.map(({ user, subtitle }, i) => {
        const on = followed.includes(user.id);
        return (
          <View
            key={user.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 15,
              paddingHorizontal: 13,
              borderTopWidth: i ? 1 : 0,
              borderTopColor: theme.colors.border,
            }}
          >
            <Image
              source={{ uri: user.avatarUrl }}
              style={{
                width: 46,
                height: 46,
                borderRadius: theme.borderRadius.square,
                backgroundColor: theme.colors.surfaceAlt,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text bold size="md" numberOfLines={1}>
                {user.firstName} {user.lastName}
              </Text>
              <Text size="sm" appearance="gray" numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
            <Button
              size="sm"
              appearance="secondary"
              inverted={on}
              title={on ? 'Abonné' : 'Suivre'}
              onPress={() => toggleFollow(user.id)}
              containerStyle={{ width: 86 }}
            />
          </View>
        );
      })}
    </View>
  );

  const titles: Record<number, [string, string, string]> = {
    1: [
      'Ta salle',
      'principale',
      'On l’affiche sur ton profil et on te montre ses nouveaux blocs en premier.',
    ],
    2: [
      'Ton niveau',
      'en bloc',
      'Le niveau le plus dur que tu enchaînes. Il sert à te proposer des blocs à ta mesure.',
    ],
    3: [
      'Grimpe',
      'en équipe',
      `Des grimpeurs ${/^[aeiouhéè]/i.test(gymName) ? 'd’' : 'de '}${gymName} et de ton niveau. Suis-en quelques-uns pour remplir ton fil.`,
    ],
  };
  const [first, second, body] = titles[step];
  const cta =
    step < STEPS
      ? 'Continuer'
      : followed.length
        ? `C’est parti · ${followed.length} suivi${followed.length > 1 ? 's' : ''}`
        : 'C’est parti';

  return (
    <Styled.Container>
      {/* Progression : retour (dès l'étape 2), trois segments, « n / 3 » */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          height: 56,
          marginTop: 26,
          paddingHorizontal: 20,
        }}
      >
        {step > 1 && (
          <IconButton
            icon="ChevronLeftRegular"
            onPress={() => setStep(step - 1)}
            accessibilityLabel="Étape précédente"
          />
        )}
        <View style={{ flex: 1, flexDirection: 'row', gap: 6 }}>
          {Array.from({ length: STEPS }, (_, i) => (
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
                  width: i < step ? '100%' : '0%',
                  backgroundColor: theme.colors.secondary.base,
                }}
              />
            </View>
          ))}
        </View>
        <Text size="sm" extraBold appearance="gray">
          {step} / {STEPS}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[Styled.contentStyle, { paddingTop: 14 }]}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View key={step} entering={FadeInRight.duration(350)} style={{ gap: 14 }}>
          <Styled.Intro>
            <TwoToneTitle first={first} second={second} />
            <Text appearance="gray" style={Styled.introBody}>
              {body}
            </Text>
          </Styled.Intro>
          {step === 1 && gymStep}
          {step === 2 && gradeStep}
          {step === 3 && followStep}
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={FadeInDown.duration(400)}
        style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16, gap: 6 }}
      >
        <Button
          title={cta}
          size="lg"
          textSize={16}
          appearance="secondary"
          fullWidth
          disabled={step === 1 && !gymId}
          onPress={next}
        />
        <Text
          bold
          appearance="gray"
          onPress={next}
          accessibilityRole="button"
          style={{ textAlign: 'center', paddingVertical: 10 }}
        >
          Passer pour l’instant
        </Text>
      </Animated.View>
    </Styled.Container>
  );
}
