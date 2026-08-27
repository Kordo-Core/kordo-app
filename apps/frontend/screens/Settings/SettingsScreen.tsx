import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Dialog, Header, Icon, ListRow, Section, Text, Toggle } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { getBlockedUsers, getCloseFriends } from 'fake_data';
import { RootStackParamList } from '../../App';

// Action destructive en attente de confirmation (null = aucun dialogue ouvert).
type PendingAction = 'logout' | 'delete' | null;

// Écran racine des réglages : cinq groupes de lignes, dont deux actions destructives
// qui passent par un dialogue de confirmation.
export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const [meetEnabled, setMeetEnabled] = useState(true);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const closeFriendsCount = getCloseFriends().length;
  const blockedCount = getBlockedUsers().length;

  // Chevron de fin de ligne, repris par chaque ligne qui mène à un autre écran.
  const chevron = <Icon name="chevron-right" size="sm" color={theme.colors.neutral.gray.base} />;

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text size="lg" bold>
          Paramètres
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
            Votre utilisation
          </Text>

          <Pressable onPress={() => navigation.navigate('NotificationsSettings')}>
            <ListRow
              left={<Icon name="alert" size="md" />}
              primaryText={<Text appearance="black">Notifications</Text>}
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('LikedPosts')}>
            <ListRow
              left={<Icon name="heart" size="md" />}
              primaryText={<Text appearance="black">J&apos;aimes</Text>}
              right={chevron}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('MyComments')}>
            <ListRow
              left={<Icon name="chat" size="md" />}
              primaryText={<Text appearance="black">Commentaires</Text>}
              right={chevron}
            />
          </Pressable>
        </Section>

        <Section style={{ gap: theme.spacing.lg }}>
          <Text size="sm" appearance="gray">
            Interactions
          </Text>

          <ListRow
            left={<Icon name="person" size="md" />}
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
              left={<Icon name="tag" size="md" />}
              primaryText={<Text appearance="black">Mentions</Text>}
              right={chevron}
            />
          </Pressable>
        </Section>

        <Section style={{ gap: theme.spacing.lg }}>
          <Text size="sm" appearance="gray">
            Visualisation de mon contenu
          </Text>

          <Pressable onPress={() => navigation.navigate('AccountPrivacy')}>
            <ListRow
              left={<Icon name="lock-closed" size="md" />}
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
              left={<Icon name="star" size="md" />}
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
              left={<Icon name="dismiss-circle" size="md" />}
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

        <Section style={{ gap: theme.spacing.lg }}>
          <Text size="sm" appearance="gray">
            Affichage
          </Text>

          <Pressable onPress={() => navigation.navigate('Appearance')}>
            <ListRow
              left={<Icon name="grid" size="md" />}
              primaryText={<Text appearance="black">Apparence</Text>}
              right={
                <>
                  <Text size="sm" appearance="gray">
                    Mode clair
                  </Text>
                  {chevron}
                </>
              }
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Language')}>
            <ListRow
              left={<Icon name="options" size="md" />}
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

        <Section style={{ gap: theme.spacing.lg }}>
          <Text size="sm" appearance="gray">
            Plus d&apos;infos et connexion
          </Text>

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
            <ListRow primaryText={<Text appearance="error">Se déconnecter</Text>} right={chevron} />
          </Pressable>

          <Pressable onPress={() => setPendingAction('delete')}>
            <ListRow
              primaryText={<Text appearance="error">Supprimer le compte</Text>}
              right={chevron}
            />
          </Pressable>
        </Section>
      </ScrollView>

      {/* Hors du ScrollView : le voile du dialogue se positionne sur son parent, il doit
          couvrir l'écran et non le contenu défilant. */}
      <Dialog
        isOpen={pendingAction !== null}
        onClose={() => setPendingAction(null)}
        title={pendingAction === 'delete' ? 'Supprimer le compte ?' : 'Se déconnecter ?'}
      >
        <Text appearance="gray">
          {pendingAction === 'delete'
            ? 'Cette action est définitive : vos activités, blocs validés et abonnements seront perdus.'
            : 'Vous devrez saisir vos identifiants pour retrouver votre compte.'}
        </Text>

        <View style={{ flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'flex-end' }}>
          <Button
            title="Annuler"
            appearance="gray"
            inverted
            size="md"
            onPress={() => setPendingAction(null)}
          />
          <Button
            title={pendingAction === 'delete' ? 'Supprimer' : 'Se déconnecter'}
            appearance="error"
            size="md"
            onPress={() => setPendingAction(null)}
          />
        </View>
      </Dialog>
    </ScreenLayout>
  );
}
