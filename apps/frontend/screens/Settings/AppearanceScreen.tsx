import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { type KordoTheme, Radio, Section, Text, themes, useThemeMode } from 'kordo-ui';
import * as Styled from './AppearanceScreen.styles';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';

type ThemeName = 'light' | 'dark' | 'fontainebleau' | 'arkose';

// Clair et Sombre pilotent le vrai thème de l'application. Fontainebleau et Arkose sont des
// thèmes de salle prévus : ils restent sélectionnables mais n'appliquent encore rien.
const THEMES: { value: ThemeName; label: string; hint: string; preview: KordoTheme }[] = [
  { value: 'light', label: 'Clair', hint: 'Par défaut', preview: themes.light },
  { value: 'dark', label: 'Sombre', hint: 'Idéal en salle', preview: themes.dark },
  { value: 'fontainebleau', label: 'Fontainebleau', hint: 'Bientôt', preview: themes.light },
  { value: 'arkose', label: 'Arkose', hint: 'Bientôt', preview: themes.dark },
];

// Mini-écran dessiné avec les jetons du thème : fond, carte héro, deux cartes et la barre.
const ThemePreview: React.FC<{ preview: KordoTheme; selected: boolean }> = ({
  preview,
  selected,
}) => (
  <Styled.Preview selected={selected} style={{ backgroundColor: preview.colors.background }}>
    <View
      style={{
        height: 34,
        borderRadius: 8,
        backgroundColor: preview.colors.hero[0],
      }}
    />
    {[0, 1].map((i) => (
      <View
        key={i}
        style={{
          height: 22,
          borderRadius: 7,
          backgroundColor: preview.colors.surface,
          borderWidth: 1,
          borderColor: preview.colors.border,
        }}
      />
    ))}
    <View
      style={{
        marginTop: 'auto',
        height: 14,
        borderRadius: 999,
        backgroundColor: preview.colors.navBar,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 18,
          height: 8,
          borderRadius: 999,
          backgroundColor: preview.colors.secondary.base,
        }}
      />
    </View>
  </Styled.Preview>
);

export default function AppearanceScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();
  const [extra, setExtra] = useState<ThemeName | null>(null);
  const selected: ThemeName = extra ?? mode;

  const select = (value: ThemeName) => {
    if (value === 'light' || value === 'dark') {
      setExtra(null);
      setMode(value);
    } else {
      setExtra(value);
    }
  };

  return (
    <ScreenLayout>
      <ScreenHeader title="Apparence" eyebrow="Paramètres" onBack={() => navigation.goBack()} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.xs,
          paddingBlock: theme.spacing.xs,
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <Section gap="lg">
          <Text variant="eyebrow">Thème</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
            {THEMES.map(({ value, label, hint, preview }) => {
              const isSelected = selected === value;
              return (
                <Pressable
                  key={value}
                  onPress={() => select(value)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  style={{ width: '47%', gap: theme.spacing.sm }}
                >
                  <ThemePreview preview={preview} selected={isSelected} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Radio selected={isSelected} onSelect={() => select(value)} />
                    <View style={{ flex: 1 }}>
                      <Text bold>{label}</Text>
                      <Text size="xs" appearance="gray">
                        {hint}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Section>

        {extra && (
          <Animated.View entering={FadeIn}>
            <Section>
              <Text size="sm" appearance="gray">
                Les thèmes de salle arrivent bientôt. En attendant, l&apos;application garde le
                thème {mode === 'dark' ? 'sombre' : 'clair'}.
              </Text>
            </Section>
          </Animated.View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
