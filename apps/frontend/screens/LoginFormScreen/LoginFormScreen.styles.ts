import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';

export const Container = styled(SafeAreaView)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.background,
}));

export const TopRow = styled(View)((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: props.theme.spacing.xl,
  paddingTop: props.theme.spacing.sm,
  paddingBottom: props.theme.spacing.lg,
}));

export const KeyboardView = styled(KeyboardAvoidingView)({
  flex: 1,
});

export const OptionsRow = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

// Bouton principal ancré en bas ; il colle au clavier quand celui-ci est ouvert.
export const BottomSection = styled(View)<{ keyboardVisible: boolean }>((props) => ({
  paddingHorizontal: props.theme.spacing.xl,
  paddingTop: props.theme.spacing.md,
  paddingBottom: props.keyboardVisible ? props.theme.spacing.md : props.theme.spacing.xxl,
}));
