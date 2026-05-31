import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { theme } from 'kordo-ui';

export const Container = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: theme.colors.primary.lightest,
});

export const BackButton = styled(TouchableOpacity)({
  padding: theme.spacing.lg,
  alignSelf: 'flex-start',
});

export const KeyboardView = styled(KeyboardAvoidingView)({
  flex: 1,
});

export const TopSection = styled(View)({
  paddingHorizontal: theme.spacing.xxl,
  gap: theme.spacing.lg,
});

export const Illustration = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: theme.colors.primary.lighter,
  marginBottom: theme.spacing.sm,
  alignSelf: 'center',
});

export const Spacer = styled(View)({
  flex: 1,
});

export const BottomSection = styled(View)({
  paddingHorizontal: theme.spacing.xxl,
  paddingBottom: theme.spacing.xxl,
});
