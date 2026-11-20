import React from 'react';
import { Image, Platform, Pressable, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Button, Dropdown, Icon, Input, Text, useToast } from 'kordo-ui';
import { RootStackParamList } from '../../App';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import {
  BIO_MAX,
  CURRENT_PROFILE,
  CURRENT_USER,
  GYMS,
  ONBOARDING_GRADES,
  OnboardingGrade,
  isUsernameTaken,
  updateCurrentProfile,
} from '../../fake_data';
import * as Styled from '../LoginFormScreen/LoginFormScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

const AVATAR = 120;

// Modifier le profil : couverture et photo, identité, bio, salle principale, niveau max.
// Les changements s'appliquent aux données fictives le temps de la session.
export default function EditProfileScreen({ navigation }: Props) {
  const theme = useTheme();
  const { addToast } = useToast();
  const toast = (message: string, type: 'success' | 'info' | 'error' = 'success') =>
    addToast({ message, type, showLoader: false, isClosable: true, duration: 2500 });

  const [firstName, setFirstName] = React.useState(CURRENT_USER.firstName);
  const [lastName, setLastName] = React.useState(CURRENT_USER.lastName);
  const [username, setUsername] = React.useState(CURRENT_USER.username);
  const [bio, setBio] = React.useState(CURRENT_USER.bio ?? '');
  const [gymId, setGymId] = React.useState<string | null>(CURRENT_PROFILE.mainGymId);
  const [grade, setGrade] = React.useState<OnboardingGrade>(CURRENT_PROFILE.maxGrade);

  const cleanUsername = username.trim().replace(/^@/, '');
  const usernameValid = /^[a-z0-9._]{3,24}$/i.test(cleanUsername);
  const usernameTaken = usernameValid && isUsernameTaken(cleanUsername);
  const canSave = firstName.trim().length > 0 && usernameValid && !usernameTaken;

  const save = () => {
    updateCurrentProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: cleanUsername,
      bio: bio.trim(),
      mainGymId: gymId ?? CURRENT_PROFILE.mainGymId,
      maxGrade: grade,
    });
    toast('Profil mis à jour');
    navigation.goBack();
  };

  const soon = () => toast('Le choix d’une photo arrive bientôt', 'info');

  const card = {
    borderRadius: theme.borderRadius.square,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  };

  return (
    <ScreenLayout>
      <ScreenHeader
        eyebrow="Ton profil"
        title="Modifier le profil"
        onBack={() => navigation.goBack()}
        backIcon="DismissRegular"
      />
      <Styled.KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingTop: 4,
            paddingBottom: 30,
            gap: 12,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Couverture + photo de profil qui déborde en bas à gauche */}
          <View style={{ marginBottom: AVATAR / 2 - 18 }}>
            <Pressable onPress={soon} accessibilityLabel="Changer la couverture">
              <Image
                source={{ uri: CURRENT_PROFILE.coverUri }}
                style={{
                  height: 150,
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: theme.colors.surfaceAlt,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  height: 34,
                  paddingHorizontal: 12,
                  borderRadius: theme.borderRadius.square,
                  backgroundColor: theme.colors.overlay.dark,
                }}
              >
                <Icon name="CameraRegular" size={18} color={theme.colors.neutral.white} />
                <Text size="sm" bold appearance="white">
                  Couverture
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={soon}
              accessibilityLabel="Changer la photo de profil"
              style={{ position: 'absolute', left: 14, bottom: -(AVATAR / 2 - 18) }}
            >
              <Image
                source={{ uri: CURRENT_USER.avatarUrl }}
                style={{
                  width: AVATAR - 30,
                  height: AVATAR - 30,
                  borderRadius: 10,
                  borderWidth: 4,
                  borderColor: theme.colors.background,
                  backgroundColor: theme.colors.surfaceAlt,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  right: -8,
                  bottom: -8,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  borderWidth: 3,
                  borderColor: theme.colors.background,
                  backgroundColor: theme.colors.secondary.base,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="EditRegular" size={14} color={theme.colors.neutral.white} />
              </View>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Input label="Prénom" value={firstName} onChange={setFirstName} />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Nom" value={lastName} onChange={setLastName} />
            </View>
          </View>

          <View style={{ gap: 4 }}>
            <Input
              label="Nom d’utilisateur"
              value={username}
              onChange={(v) => setUsername(v.replace(/\s/g, ''))}
              maxLength={25}
              rightIcon={
                usernameValid && !usernameTaken
                  ? { name: 'CheckmarkCircleRegular', size: 24, color: theme.colors.secondary.base }
                  : undefined
              }
            />
            {(!usernameValid || usernameTaken) && (
              <Text size="xs" appearance="error" style={{ paddingHorizontal: 4 }}>
                {usernameTaken
                  ? 'Ce nom d’utilisateur est déjà pris.'
                  : '3 à 24 caractères : lettres, chiffres, point ou tiret bas.'}
              </Text>
            )}
          </View>

          <View style={{ gap: 4 }}>
            <Input
              label="Bio"
              value={bio}
              onChange={setBio}
              multiline
              maxLength={BIO_MAX}
              placeholder="Ton style, tes projets…"
            />
            <Text size="xs" appearance="gray" style={{ alignSelf: 'flex-end', paddingRight: 4 }}>
              {bio.length} / {BIO_MAX}
            </Text>
          </View>

          <Dropdown
            label="Salle principale"
            icon={{ name: 'LocationRegular', color: theme.colors.info.base }}
            value={gymId}
            onChange={setGymId}
            items={GYMS.map((g) => ({
              key: g.id,
              text: g.name,
              left: (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image
                    source={{ uri: g.imageUri }}
                    style={{ width: 32, height: 32, borderRadius: theme.borderRadius.sm }}
                  />
                  <Text bold>{g.name}</Text>
                </View>
              ),
            }))}
          />

          <View style={[card, { padding: 14, gap: 10 }]}>
            <Text size="sm" bold appearance="gray">
              Niveau max en bloc
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {ONBOARDING_GRADES.map((g) => {
                const on = g === grade;
                return (
                  <Pressable
                    key={g}
                    onPress={() => setGrade(g)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: on }}
                    style={{
                      minWidth: 50,
                      height: 40,
                      paddingHorizontal: 10,
                      borderRadius: theme.borderRadius.square,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: on ? theme.colors.primary.base : theme.colors.surfaceAlt,
                    }}
                  >
                    <Text bold appearance={on ? 'white' : 'black'}>
                      {g}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate('AccountPrivacy')}
            accessibilityRole="button"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 4,
              paddingVertical: 8,
            }}
          >
            <Text bold appearance="gray">
              Visibilité du profil : public
            </Text>
            <Icon name="ChevronRightRegular" size={20} color={theme.colors.textMuted} />
          </Pressable>

          <Button
            title="Enregistrer"
            size="lg"
            textSize={16}
            appearance="secondary"
            fullWidth
            disabled={!canSave}
            onPress={save}
          />
        </ScrollView>
      </Styled.KeyboardView>
    </ScreenLayout>
  );
}
