import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Header, Icon, RadioGroup, Section, Text } from 'kordo-ui';
import * as Styled from './AppearanceScreen.styles';
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

  const options = THEMES.map((entry) => ({
    ...entry,
    left: <Styled.Preview />,
  }));

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Apparence
        </Text>
      </Header>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
          paddingBlock: theme.spacing.sm,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Section style={{ gap: theme.spacing.xl }}>
          <RadioGroup
            options={options}
            value={selected}
            onChange={setSelected}
            gap={theme.spacing.xl}
          />
        </Section>
      </ScrollView>
    </ScreenLayout>
  );
}
