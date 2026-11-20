import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Dialog, Icon, ListRow, Text, Toggle, useThemeMode } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { SettingsGroup } from '../../components/SettingsGroup/SettingsGroup';
import { SettingIcon } from '../../components/SettingIcon/SettingIcon';
import { CURRENT_USER, getBlockedUsers, getCloseFriends } from 'fake_data';
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
      <ScreenHeader gap={8} title="Paramètres" onBack={() => navigation.goBack()} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: 8,
          // La carte du compte descend de 6 px de plus que l'écart standard
          paddingTop: 6,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Carte du compte : mène au profil */}
        <SettingsGroup rowPadding={4}>
          <Pressable
            onPress={() => navigation.navigate('UserProfile', { userId: CURRENT_USER.id })}
          >
            <ListRow
              left={
                <Image
                  source={{ uri: CURRENT_USER.avatarUrl }}
                  style={{ width: 56, height: 56, borderRadius: 7 }}
                />
              }
              primaryText={
                <Text size="lg" extraBold>
                  {CURRENT_USER.firstName} {CURRENT_USER.lastName}
                </Text>
              }
              secondaryText={
                <Text size="sm" appearance="gray">
                  @{CURRENT_USER.username} · compte public
                </Text>
              }
              right={chevron}
            />
          </Pressable>
        </SettingsGroup>

        <SettingsGroup title="Ton utilisation">
          <Pressable onPress={() => navigation.navigate('NotificationsSettings')}>
            <ListRow
              left={<SettingIcon name="alert" tone="green" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Notifications
                </Text>
              }
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('LikedPosts')}>
            <ListRow
              left={<SettingIcon name="heart" tone="red" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  J’aime
                </Text>
              }
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('MyComments')}>
            <ListRow
              left={<SettingIcon name="chat" tone="blue" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Commentaires
                </Text>
              }
              right={chevron}
            />
          </Pressable>
        </SettingsGroup>

        <SettingsGroup title="Interactions">
          <ListRow
            left={<SettingIcon name="person" tone="orange" />}
            primaryText={
              <Text appearance="black" bold>
                Fonctionnalité Meet
              </Text>
            }
            secondaryText={
              <Text size="xs" appearance="gray" style={{ lineHeight: 16.8 }}>
                Vois les grimpeurs croisés en séance ; ils pourront aussi voir ton profil.
              </Text>
            }
            right={<Toggle value={meetEnabled} onChange={setMeetEnabled} />}
          />

          <Pressable onPress={() => navigation.navigate('Mentions')}>
            <ListRow
              left={<SettingIcon glyph="@" tone="neutral" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Mentions
                </Text>
              }
              right={
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text size="sm" appearance="gray">
                    Tout le monde
                  </Text>
                  {chevron}
                </View>
              }
            />
          </Pressable>
        </SettingsGroup>

        <SettingsGroup title="Visibilité de ton contenu">
          <Pressable onPress={() => navigation.navigate('AccountPrivacy')}>
            <ListRow
              left={<SettingIcon name="lock-closed" tone="green" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Confidentialité du compte
                </Text>
              }
              right={
                <>
                  <Text size="sm" appearance="gray">
                    Public
                  </Text>
                  {chevron}
                </>
              }
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('CloseFriends')}>
            <ListRow
              left={<SettingIcon name="star" tone="orange" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Ami(e)s proches
                </Text>
              }
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
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Bloqués
                </Text>
              }
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
        </SettingsGroup>

        <SettingsGroup title="Affichage">
          <Pressable onPress={() => navigation.navigate('Appearance')}>
            <ListRow
              left={<SettingIcon name="grid" tone="green" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Apparence
                </Text>
              }
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
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Langue de l&apos;application
                </Text>
              }
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
        </SettingsGroup>

        <SettingsGroup title="À propos">
          <Pressable onPress={() => {}}>
            <ListRow
              left={<SettingIcon name="info" tone="neutral" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Politique de confidentialité
                </Text>
              }
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => {}}>
            <ListRow
              left={<SettingIcon name="document" tone="neutral" />}
              primaryText={
                <Text appearance="black" style={{ fontFamily: theme.fonts.semiBold }}>
                  Conditions d&apos;utilisation
                </Text>
              }
              right={chevron}
            />
          </Pressable>
        </SettingsGroup>

        <SettingsGroup title="Compte">
          <Pressable onPress={() => setPendingAction('logout')}>
            <ListRow
              left={<SettingIcon name="sign-out" tone="red" />}
              primaryText={
                <Text appearance="error" bold>
                  Se déconnecter
                </Text>
              }
            />
          </Pressable>

          <Pressable onPress={() => setPendingAction('delete')}>
            <ListRow
              left={<SettingIcon name="delete" tone="red" />}
              primaryText={
                <Text appearance="error" bold>
                  Supprimer le compte
                </Text>
              }
            />
          </Pressable>
        </SettingsGroup>

        <Text size="xs" appearance="gray" style={{ textAlign: 'center', marginTop: 14 }}>
          Kordo 2.4.0
        </Text>
      </ScrollView>

      {/* Hors du ScrollView : le voile du dialogue se positionne sur son parent, il doit
          couvrir l'écran et non le contenu défilant. */}
      {/* Un dialogue par action : leur contenu ne doit pas dépendre de `pendingAction`, qui
          repasse à `null` alors que le dialogue est encore monté pour son animation de sortie. */}
      <Dialog isOpen={pendingAction === 'logout'} onClose={closeDialog} title="Se déconnecter ?">
        <Text appearance="gray">Tu devras saisir tes identifiants pour retrouver ton compte.</Text>
        {confirmActions('Se déconnecter')}
      </Dialog>

      <Dialog
        isOpen={pendingAction === 'delete'}
        onClose={closeDialog}
        title="Supprimer le compte ?"
      >
        <Text appearance="gray">
          Cette action est définitive : tes activités, blocs validés et abonnements seront perdus.
        </Text>
        {confirmActions('Supprimer')}
      </Dialog>
    </ScreenLayout>
  );
}
