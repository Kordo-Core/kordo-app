import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Header, Icon, RadioGroup, Section, Text } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';

type MentionAudience = 'everyone' | 'following' | 'nobody';

const OPTIONS: { value: MentionAudience; label: string }[] = [
  { value: 'everyone', label: 'Tout le monde' },
  { value: 'following', label: 'Uniquement les personnes que vous suivez' },
  { value: 'nobody', label: 'Ne pas autoriser' },
];

// Qui peut mentionner l'utilisateur : trois options exclusives, suivies de l'explication.
export default function MentionsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [audience, setAudience] = useState<MentionAudience>('everyone');

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Mentions
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
        <Section style={{ gap: theme.spacing.lg }}>
          <Text size="sm" appearance="gray">
            Qui peut @mentionner votre nom
          </Text>
          <RadioGroup options={OPTIONS} value={audience} onChange={setAudience} />

          <Text size="sm" appearance="gray" style={{ marginTop: theme.spacing.sm }}>
            Choisissez qui peut vous mentionner dans des commentaires, des publications ou des
            activités. Lorsqu&apos;une personne essaie de vous identifier, elle pourra voir si vous
            acceptez d&apos;être identifié(e) ou non.
          </Text>
        </Section>
      </ScrollView>
    </ScreenLayout>
  );
}
