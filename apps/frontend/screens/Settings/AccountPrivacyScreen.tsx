import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { Icon, ListRow, Section, Text, Toggle } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SettingIcon } from '../../components/SettingIcon/SettingIcon';

// Compte public ou privé, avec les deux paragraphes qui expliquent ce que chaque état implique.
export default function AccountPrivacyScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Confidentialité du compte"
        eyebrow="Paramètres"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.xs,
          paddingBlock: theme.spacing.xs,
          paddingBottom: theme.spacing.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Section gap="lg">
          <ListRow
            primaryText={
              <Text appearance="black" bold>
                Compte privé
              </Text>
            }
            left={<SettingIcon name="lock-closed" tone="green" />}
            right={<Toggle value={isPrivate} onChange={setIsPrivate} />}
          />

          <View
            style={{
              marginTop: theme.spacing.sm,
              padding: theme.spacing.lg,
              gap: theme.spacing.md,
              borderRadius: theme.borderRadius.square + 4,
              backgroundColor: theme.colors.soft,
            }}
          >
            <Text variant="eyebrow" appearance="secondary">
              {isPrivate ? 'Compte privé' : 'Compte public'}
            </Text>
            <Text size="sm" appearance="gray">
              Lorsque votre compte est public, toutes les personnes sur Kordo peuvent voir vos
              publications, activités, etc, même si elles ne vous suivent pas. N&apos;importe qui
              peut interagir avec votre contenu et vous envoyer une demande de message.
            </Text>

            <Text size="sm" appearance="gray">
              Lorsque votre compte est privé, seuls les abonnés que vous approuvez pourront voir vos
              publications et stories. Les personnes non autorisées verront un bouton « Demander à
              s&apos;abonner » sur votre profil. Vos abonnés actuels ne sont pas affectés.
            </Text>
          </View>
        </Section>
      </ScrollView>
    </ScreenLayout>
  );
}
