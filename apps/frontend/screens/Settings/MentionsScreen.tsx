import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { ListRow, Radio, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SettingsGroup } from '../../components/SettingsGroup/SettingsGroup';

type MentionAudience = 'everyone' | 'following' | 'nobody';

const OPTIONS: { value: MentionAudience; label: string }[] = [
  { value: 'everyone', label: 'Tout le monde' },
  { value: 'following', label: 'Personnes que tu suis' },
  { value: 'nobody', label: 'Ne pas autoriser' },
];

// Qui peut mentionner l'utilisateur : trois options exclusives, suivies de l'explication.
export default function MentionsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [audience, setAudience] = useState<MentionAudience>('everyone');

  return (
    <ScreenLayout>
      <ScreenHeader title="Mentions" eyebrow="Paramètres" onBack={() => navigation.goBack()} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <SettingsGroup title="Qui peut te @mentionner">
          {OPTIONS.map(({ value, label }) => (
            <ListRow
              key={value}
              onPress={() => setAudience(value)}
              primaryText={<Text>{label}</Text>}
              right={<Radio selected={audience === value} onSelect={() => setAudience(value)} />}
            />
          ))}

          <Text
            size="sm"
            appearance="gray"
            style={{ marginTop: theme.spacing.sm, marginBottom: theme.spacing.sm }}
          >
            Si une personne non autorisée essaie de t’identifier, elle sera prévenue que tu ne
            l’acceptes pas.
          </Text>
        </SettingsGroup>
      </ScrollView>
    </ScreenLayout>
  );
}
