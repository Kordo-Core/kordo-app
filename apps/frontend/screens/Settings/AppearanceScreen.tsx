import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Header, Icon, ListRow, Radio, Section, Text } from 'kordo-ui';
import * as Styled from './AppearanceScreen.styles';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';

type ThemeName = 'dark' | 'light' | 'fontainebleau' | 'arkose';

const THEMES: { value: ThemeName; label: string }[] = [
  { value: 'dark', label: 'Sombre' },
  { value: 'light', label: 'Clair' },
  { value: 'fontainebleau', label: 'Fontainebleau' },
  { value: 'arkose', label: 'Arkose' },
];

// Choix du thème : chaque option porte sa vignette d'aperçu à gauche. Les vignettes sont des
// blocs gris tant que les captures de chaque thème n'existent pas.
export default function AppearanceScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [selected, setSelected] = useState<ThemeName>('light');

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
        keyboardShouldPersistTaps="handled"
      >
        {THEMES.map(({ value, label }) => (
          <Section gap="xl">
            <ListRow
              key={value}
              onPress={() => setSelected(value)}
              left={<Styled.Preview />}
              primaryText={<Text>{label}</Text>}
              right={<Radio selected={selected === value} onSelect={() => setSelected(value)} />}
            />
          </Section>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
