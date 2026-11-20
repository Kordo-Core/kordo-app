import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Pressable, View } from 'react-native';

export const Container = styled(SafeAreaView)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.background,
}));

export const KeyboardView = styled(KeyboardAvoidingView)({
  flex: 1,
});

// Colonne de la maquette : 26 px sous la zone sûre, 20 px de côté, 14 px entre les blocs.
export const contentStyle = {
  paddingTop: 26,
  paddingHorizontal: 20,
  paddingBottom: 40,
  gap: 14,
} as const;

// Logo et lien « Créer un compte » ; la rangée fait 56 px, le lien y est centré.
export const TopRow = styled(View)({
  height: 56,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const HeaderLink = styled(Pressable)((props) => ({
  height: 40,
  paddingHorizontal: 14,
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
  justifyContent: 'center',
}));

export const Intro = styled(View)({
  paddingTop: 18,
  paddingHorizontal: 2,
  paddingBottom: 8,
  gap: 10,
});

export const introBody = { lineHeight: 21.75 } as const;

export const OptionsRow = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 4,
  paddingBottom: 8,
});

// Boutons de connexion sociale : blancs, filet de 1 px, icône et nom centrés.
export const SocialButton = styled(Pressable)((props) => ({
  flex: 1,
  height: 48,
  paddingHorizontal: 4,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  borderRadius: props.theme.borderRadius.square,
  borderWidth: 1,
  borderColor: props.theme.colors.border,
  backgroundColor: props.theme.colors.surface,
}));
