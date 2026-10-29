import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Dialog, Icon, ListRow, Section, Text, Toggle, useThemeMode } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SettingIcon } from '../../components/SettingIcon/SettingIcon';
import { getBlockedUsers, getCloseFriends } from 'fake_data';
import { RootStackParamList } from '../../App';

// Action destructive en attente de confirmation (null = aucun dialogue ouvert).
type PendingAction = 'logout' | 'delete' | null;

// Écran racine des réglages : cinq groupes de lignes, dont deux actions destructives
// qui passent par un dialogue de confirmation.
export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const { mode } = useThemeMode();

  const [meetEnabled, setMeetEnabled] = useState(true);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const closeFriendsCount = getCloseFriends().length;
  const blockedCount = getBlockedUsers().length;

  // Chevron de fin de ligne, repris par chaque ligne qui mène à un autre écran.
  const chevron = <Icon name="chevron-right" size="sm" color={theme.colors.textMuted} />;

  const closeDialog = () => setPendingAction(null);

  // Boutons communs aux deux dialogues de confirmation.
  const confirmActions = (confirmLabel: string) => (
    <View style={{ flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'flex-end' }}>
      <Button title="Annuler" appearance="gray" inverted size="md" onPress={closeDialog} />
      <Button title={confirmLabel} appearance="error" size="md" onPress={closeDialog} />
    </View>
  );

  return (
    <ScreenLayout>
      <ScreenHeader title="Paramètres" eyebrow="Ton compte" onBack={() => navigation.goBack()} />

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
          <Text variant="eyebrow">Votre utilisation</Text>

          <Pressable onPress={() => navigation.navigate('NotificationsSettings')}>
            <ListRow
              left={<SettingIcon name="alert" tone="orange" />}
              primaryText={<Text appearance="black">Notifications</Text>}
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('LikedPosts')}>
            <ListRow
              left={<SettingIcon name="heart" tone="red" />}
              primaryText={<Text appearance="black">J&apos;aimes</Text>}
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('MyComments')}>
            <ListRow
              left={<SettingIcon name="chat" tone="blue" />}
              primaryText={<Text appearance="black">Commentaires</Text>}
              right={chevron}
            />
          </Pressable>
        </Section>

        <Section gap="lg">
          <Text variant="eyebrow">Interactions</Text>

          <ListRow
            left={<SettingIcon name="person" tone="green" />}
            primaryText={
              <Text appearance="black" bold>
                Fonctionnalité Meet
              </Text>
            }
            secondaryText={
              <Text size="sm" appearance="gray">
                Vous pourrez voir les profils des personnes que vous avez croisées lors de vos
                activités, et elles pourront également voir le vôtre.
              </Text>
            }
            right={<Toggle value={meetEnabled} onChange={setMeetEnabled} />}
          />

          <Pressable onPress={() => navigation.navigate('Mentions')}>
            <ListRow
              left={<SettingIcon name="tag" tone="blue" />}
              primaryText={<Text appearance="black">Mentions</Text>}
              right={chevron}
            />
          </Pressable>
        </Section>

        <Section gap="lg">
          <Text variant="eyebrow">Visualisation de mon contenu</Text>

          <Pressable onPress={() => navigation.navigate('AccountPrivacy')}>
            <ListRow
              left={<SettingIcon name="lock-closed" tone="green" />}
              primaryText={<Text appearance="black">Confidentialité du compte</Text>}
              right={
                <>
                  <Text size="sm" appearance="gray">
                    publique
                  </Text>
                  {chevron}
                </>
              }
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('CloseFriends')}>
            <ListRow
              left={<SettingIcon name="star" tone="orange" />}
              primaryText={<Text appearance="black">Ami(e)s proches</Text>}
              right={
                <>
                  <Text size="sm" appearance="gray">
                    {closeFriendsCount}
                  </Text>
                  {chevron}
                </>
              }
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('BlockedAccounts')}>
            <ListRow
              left={<SettingIcon name="dismiss-circle" tone="red" />}
              primaryText={<Text appearance="black">Bloqués</Text>}
              right={
                <>
                  <Text size="sm" appearance="gray">
                    {blockedCount}
                  </Text>
                  {chevron}
                </>
              }
            />
          </Pressable>
        </Section>

        <Section gap="lg">
          <Text variant="eyebrow">Affichage</Text>

          <Pressable onPress={() => navigation.navigate('Appearance')}>
            <ListRow
              left={<SettingIcon name="grid" tone="green" />}
              primaryText={<Text appearance="black">Apparence</Text>}
              right={
                <>
                  <Text size="sm" appearance="gray">
                    {mode === 'dark' ? 'Sombre' : 'Clair'}
                  </Text>
                  {chevron}
                </>
              }
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Language')}>
            <ListRow
              left={<SettingIcon name="options" tone="blue" />}
              primaryText={<Text appearance="black">Langue de l&apos;application</Text>}
              right={
                <>
                  <Text size="sm" appearance="gray">
                    Français
                  </Text>
                  {chevron}
                </>
              }
            />
          </Pressable>
        </Section>

        <Section gap="lg">
          <Text variant="eyebrow">Plus d&apos;infos et connexion</Text>

          <Pressable onPress={() => {}}>
            <ListRow
              primaryText={<Text appearance="black">Politique de confidentialité</Text>}
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => {}}>
            <ListRow
              primaryText={<Text appearance="black">Conditions d&apos;utilisation</Text>}
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => setPendingAction('logout')}>
            <ListRow
              left={<SettingIcon name="sign-out" tone="red" />}
              primaryText={
                <Text appearance="error" bold>
                  Se déconnecter
                </Text>
              }
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => setPendingAction('delete')}>
            <ListRow
              left={<SettingIcon name="delete" tone="red" />}
              primaryText={<Text appearance="error">Supprimer le compte</Text>}
              right={chevron}
            />
          </Pressable>
        </Section>
      </ScrollView>

      {/* Hors du ScrollView : le voile du dialogue se positionne sur son parent, il doit
          couvrir l'écran et non le contenu défilant. */}
      {/* Un dialogue par action : leur contenu ne doit pas dépendre de `pendingAction`, qui
          repasse à `null` alors que le dialogue est encore monté pour son animation de sortie. */}
      <Dialog isOpen={pendingAction === 'logout'} onClose={closeDialog} title="Se déconnecter ?">
        <Text appearance="gray">
          Vous devrez saisir vos identifiants pour retrouver votre compte.
        </Text>
        {confirmActions('Se déconnecter')}
      </Dialog>

      <Dialog
        isOpen={pendingAction === 'delete'}
        onClose={closeDialog}
        title="Supprimer le compte ?"
      >
        <Text appearance="gray">
          Cette action est définitive : vos activités, blocs validés et abonnements seront perdus.
        </Text>
        {confirmActions('Supprimer')}
      </Dialog>
    </ScreenLayout>
  );
}
