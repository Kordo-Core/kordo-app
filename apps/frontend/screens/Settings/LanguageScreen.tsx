import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Header, Icon, Section, Text } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { matchesQuery } from '../../utils/matchesQuery';

// Langues proposées. Aucune traduction n'existe encore : cet écran ne fait que le choix visuel.
const LANGUAGES = [
  'Français (France)',
  'Français (Canada)',
  'English (United Kingdom)',
  'English (United States)',
  'Español (España)',
  'Español (México)',
  'Deutsch',
  'Italiano',
  'Português (Portugal)',
  'Português (Brasil)',
  'Nederlands',
  'Polski',
  'Svenska',
  'Norsk',
  'Dansk',
  'Suomi',
  'Čeština',
  '日本語',
  '한국어',
  '中文 (简体)',
];

// Choix de la langue : la langue courante est épinglée en tête avec une coche,
// le reste de la liste est filtrable.
export default function LanguageScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(LANGUAGES[0]);

  const visible = useMemo(() => LANGUAGES.filter((l) => matchesQuery(query, l)), [query]);

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Langues
        </Text>
      </Header>

      {/* Langue courante et recherche : fixes sous le header, hors de la zone défilante. */}
      <Section>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 }}>{selected}</Text>
          <Icon name="checkmark" size="sm" color={theme.colors.secondary.base} />
        </View>
      </Section>
      <SearchToolbar value={query} onChange={setQuery} placeholder="Rechercher..." />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
          paddingBlock: theme.spacing.sm,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Section style={{ gap: theme.spacing.lg }}>
          {visible.map((language) => (
            <Pressable key={language} onPress={() => setSelected(language)}>
              <Text>{language}</Text>
            </Pressable>
          ))}
        </Section>
      </ScrollView>
    </ScreenLayout>
  );
}
