import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Icon, Text, useThemeMode } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';

type ThemeName = 'dark' | 'light' | 'fontainebleau' | 'arkose';

interface Palette {
  bg: string;
  surf: string;
  line: string;
  ink: string;
  acc: string;
  org: string;
  nav: string;
}

// Clair et Sombre pilotent le vrai thème de l'application. Fontainebleau et Arkose sont des
// thèmes de salle prévus : ils se prévisualisent mais n'appliquent encore rien.
const THEMES: { value: ThemeName; label: string; hint: string; palette: Palette }[] = [
  {
    value: 'dark',
    label: 'Sombre',
    hint: 'Idéal en salle le soir',
    palette: {
      bg: '#0D0E0E',
      surf: '#202322',
      line: '#363A38',
      ink: '#F5F1EE',
      acc: '#2E7D64',
      org: '#FF7A1A',
      nav: '#202322',
    },
  },
  {
    value: 'light',
    label: 'Clair',
    hint: 'Le thème par défaut',
    palette: {
      bg: '#F1F3F2',
      surf: '#FFFFFF',
      line: '#D9F7E9',
      ink: '#0B1410',
      acc: '#00845A',
      org: '#FF7A1A',
      nav: '#0B1410',
    },
  },
  {
    value: 'fontainebleau',
    label: 'Fontainebleau',
    hint: 'Grès, mousse et sable',
    palette: {
      bg: '#F1E7DF',
      surf: '#FBF5F0',
      line: '#D9C4B5',
      ink: '#252B28',
      acc: '#5E6B3A',
      org: '#C9763A',
      nav: '#252B28',
    },
  },
  {
    value: 'arkose',
    label: 'Arkose',
    hint: 'Les couleurs vives des murs',
    palette: {
      bg: '#FFF7F2',
      surf: '#FFFFFF',
      line: '#FFD9C7',
      ink: '#1C1A18',
      acc: '#1F5BFF',
      org: '#EB4D5F',
      nav: '#1C1A18',
    },
  },
];

const TEXT_SIZES = [
  { label: 'Petite', px: 13 },
  { label: 'Normale', px: 15 },
  { label: 'Grande', px: 18 },
];

// Téléphone miniature dessiné avec la palette du thème sélectionné
const PhonePreview: React.FC<{ palette: Palette }> = ({ palette }) => {
  const line = (width: number | `${number}%`) => (
    <View
      style={{ width, height: 6, borderRadius: 3, backgroundColor: palette.ink, opacity: 0.7 }}
    />
  );
  const row = (width: number | `${number}%`) => (
    <View
      style={{
        height: 42,
        flexShrink: 1,
        borderRadius: 5,
        backgroundColor: palette.surf,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 8,
      }}
    >
      <View style={{ width: 22, height: 22, borderRadius: 3, backgroundColor: palette.line }} />
      {line(width)}
    </View>
  );

  return (
    <View
      style={{
        // Écran de 170 × 250 dans un cadre de 6 px (la maquette compte le cadre en plus)
        width: 182,
        height: 262,
        padding: 6,
        borderRadius: 12,
        backgroundColor: '#0B1410',
        boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 9,
          overflow: 'hidden',
          backgroundColor: palette.bg,
          gap: 8,
          paddingTop: 26,
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 7,
            left: '50%',
            width: 46,
            height: 12,
            marginLeft: -23,
            borderRadius: 8,
            backgroundColor: '#000000',
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 22, height: 22, borderRadius: 3, backgroundColor: palette.acc }} />
          <View style={{ width: 60, height: 8, borderRadius: 4, backgroundColor: palette.ink }} />
        </View>
        <View
          style={{
            height: 64,
            flexShrink: 1,
            padding: 8,
            borderRadius: 6,
            backgroundColor: palette.acc,
            justifyContent: 'flex-end',
          }}
        >
          <View style={{ width: 40, height: 14, borderRadius: 3, backgroundColor: palette.org }} />
        </View>
        {row(70)}
        {row('60%')}
        <View
          style={{
            marginTop: 'auto',
            height: 28,
            borderRadius: 4,
            backgroundColor: palette.nav,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {[palette.org, 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)'].map((color, i) => (
            <View
              key={i}
              style={{ width: 8, height: 8, borderRadius: 3, backgroundColor: color }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// Apparence (design D) : aperçu du thème, quatre thèmes au choix, puis la taille du texte.
export default function AppearanceScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();
  const [extra, setExtra] = useState<ThemeName | null>(null);
  const [textSize, setTextSize] = useState(1);
  const selected: ThemeName = extra ?? mode;
  const current = THEMES.find((t) => t.value === selected) ?? THEMES[1];

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
      <ScreenHeader
        gap={12}
        title="Apparence"
        eyebrow="Paramètres"
        subtitle="Choisis l’ambiance de ton app. Le changement s’applique tout de suite."
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: theme.spacing.md,
          paddingHorizontal: 14,
          paddingBottom: 30,
        }}
      >
        <View style={{ alignItems: 'center', paddingVertical: 6 }}>
          <PhonePreview palette={current.palette} />
        </View>

        <View
          accessibilityRole="radiogroup"
          style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}
        >
          {THEMES.map(({ value, label, hint, palette }) => {
            const isSelected = selected === value;
            return (
              <Pressable
                key={value}
                onPress={() => select(value)}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                style={{
                  flexBasis: '48%',
                  flexGrow: 1,
                  gap: 10,
                  padding: 12,
                  borderRadius: 9,
                  backgroundColor: theme.colors.surface,
                  boxShadow: theme.shadows.sm,
                  borderWidth: 2,
                  borderColor: isSelected ? theme.colors.secondary.base : 'transparent',
                }}
              >
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  {[palette.bg, palette.surf, palette.acc, palette.org].map((color, i) => (
                    <View
                      key={i}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 4,
                        backgroundColor: color,
                        borderWidth: 1,
                        borderColor: 'rgba(127,127,127,0.25)',
                      }}
                    />
                  ))}
                </View>
                <View style={{ gap: 2 }}>
                  <Text extraBold>{label}</Text>
                  <Text size="xs" appearance="gray">
                    {hint}
                  </Text>
                </View>
                {isSelected && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 24,
                      height: 24,
                      borderRadius: 999,
                      backgroundColor: theme.colors.secondary.base,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="CheckmarkFilled" size={14} color={theme.colors.neutral.white} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <View
          style={{
            gap: 10,
            paddingVertical: 14,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: 9,
            backgroundColor: theme.colors.surface,
            boxShadow: theme.shadows.sm,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text bold>Taille du texte</Text>
            <Text size="sm" bold appearance="gray">
              {TEXT_SIZES[textSize].label}
            </Text>
          </View>
          {/* Curseur à trois crans : la piste est découpée en zones cliquables */}
          <View style={{ height: 22, justifyContent: 'center' }}>
            <View style={{ height: 6, borderRadius: 3, backgroundColor: theme.colors.border }}>
              <View
                style={{
                  width: `${textSize * 50}%`,
                  height: '100%',
                  borderRadius: 3,
                  backgroundColor: theme.colors.secondary.base,
                }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                left: `${textSize * 50}%`,
                width: 18,
                height: 18,
                marginLeft: -9,
                borderRadius: 999,
                backgroundColor: theme.colors.secondary.base,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                flexDirection: 'row',
              }}
            >
              {TEXT_SIZES.map((size, i) => (
                <Pressable
                  key={size.label}
                  onPress={() => setTextSize(i)}
                  accessibilityLabel={`Taille ${size.label}`}
                  style={{ flex: 1 }}
                />
              ))}
            </View>
          </View>
          <Text
            size={TEXT_SIZES[textSize].px}
            style={{ lineHeight: TEXT_SIZES[textSize].px * 1.4 }}
          >
            Le jaune du fond est top, charge bien le talon gauche.
          </Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
