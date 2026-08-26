import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';

export const Container = styled(SafeAreaView)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.primary.lightest,
}));

export const BackButton = styled(TouchableOpacity)((props) => ({
  padding: props.theme.spacing.lg,
  alignSelf: 'flex-start',
}));

export const KeyboardView = styled(KeyboardAvoidingView)({
  flex: 1,
});

export const TopSection = styled(View)((props) => ({
  paddingHorizontal: props.theme.spacing.xxl,
  gap: props.theme.spacing.lg,
}));

export const Illustration = styled(View)((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: props.theme.colors.primary.lighter,
  marginBottom: props.theme.spacing.sm,
  alignSelf: 'center',
}));

export const Spacer = styled(View)({
  flex: 1,
});

export const BottomSection = styled(View)((props) => ({
  paddingHorizontal: props.theme.spacing.xxl,
  paddingBottom: props.theme.spacing.xxl,
}));
