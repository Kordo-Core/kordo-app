import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Icon, Text } from 'kordo-ui';
import { ScreenHeader } from '../../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { SearchToolbar } from '../../../components/SearchToolbar/SearchToolbar';

// Recherche (grimpeurs, salles, blocs) : coquille au style du design D en attendant l'API.
export default function SearchScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  return (
    <ScreenLayout>
      <ScreenHeader title="Recherche" eyebrow="Explorer">
        <SearchToolbar
          value={query}
          onChange={setQuery}
          placeholder="Grimpeurs, salles, blocs..."
        />
      </ScreenHeader>

      <ScrollView contentContainerStyle={{ padding: theme.spacing.xl, paddingBottom: 130 }}>
        <View style={{ alignItems: 'center', gap: theme.spacing.md, marginTop: theme.spacing.xxl }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 22,
              backgroundColor: theme.colors.soft,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="SearchRegular" size="lg" color={theme.colors.softText} />
          </View>
          <Text variant="display" size="xs" style={{ textAlign: 'center' }}>
            {query ? 'Aucun résultat' : 'Trouve ta prochaine session'}
          </Text>
          <Text appearance="gray" style={{ textAlign: 'center' }}>
            Cherche un grimpeur, une salle ou un bloc.
          </Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
