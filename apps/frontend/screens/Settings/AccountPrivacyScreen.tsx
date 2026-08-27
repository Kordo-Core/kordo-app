import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Header, Icon, ListRow, Section, Text, Toggle } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';

// Compte public ou privé, avec les deux paragraphes qui expliquent ce que chaque état implique.
export default function AccountPrivacyScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Confidentialité du compte
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
        <Section gap="lg">
          <ListRow
            primaryText={<Text appearance="black">Compte privé</Text>}
            right={<Toggle value={isPrivate} onChange={setIsPrivate} />}
          />

          <Text size="sm" appearance="gray" style={{ marginTop: theme.spacing.sm }}>
            Lorsque votre compte est public, toutes les personnes sur Kordo peuvent voir vos
            publications, activités, etc, même si elles ne vous suivent pas. N&apos;importe qui peut
            interagir avec votre contenu et vous envoyer une demande de message.
          </Text>

          <Text size="sm" appearance="gray">
            Lorsque votre compte est privé, seuls les abonnés que vous approuvez pourront voir vos
            publications et stories. Les personnes non autorisées verront un bouton « Demander à
            s&apos;abonner » sur votre profil. Vos abonnés actuels ne sont pas affectés.
          </Text>
        </Section>
      </ScrollView>
    </ScreenLayout>
  );
}
