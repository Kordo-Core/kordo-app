import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { ListRow, Radio, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { SettingsGroup } from '../../components/SettingsGroup/SettingsGroup';
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

// Choix de la langue (design D) : recherche, puis la liste filtrable avec un bouton radio.
export default function LanguageScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(LANGUAGES[0]);

  const visible = useMemo(() => LANGUAGES.filter((l) => matchesQuery(query, l)), [query]);

  return (
    <ScreenLayout>
      <ScreenHeader title="Langue" eyebrow="Paramètres" onBack={() => navigation.goBack()} />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginHorizontal: 14 }}>
          <SearchToolbar value={query} onChange={setQuery} placeholder="Rechercher..." />
        </View>

        <SettingsGroup rowPadding={4} rowPaddingHorizontal={16} separatorInset={0}>
          {visible.map((language) => (
            <ListRow
              key={language}
              onPress={() => setSelected(language)}
              primaryText={
                <Text appearance="black" bold={language === selected}>
                  {language}
                </Text>
              }
              right={
                <Radio selected={language === selected} onSelect={() => setSelected(language)} />
              }
            />
          ))}
        </SettingsGroup>
      </ScrollView>
    </ScreenLayout>
  );
}
