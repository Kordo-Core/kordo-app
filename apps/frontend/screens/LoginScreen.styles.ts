import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View } from 'react-native';
import { Button, theme } from 'kordo-ui';

export const Container = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: theme.colors.primary.lightest,
  alignItems: 'center',
  paddingBottom: theme.spacing.xxl,
});

export const BackButton = styled(TouchableOpacity)({
  padding: theme.spacing.lg,
  alignSelf: 'flex-start',
});

export const CenterSection = styled(View)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: theme.spacing.xxl,
  gap: theme.spacing.md,
});

export const Illustration = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: theme.colors.primary.lighter,
  marginBottom: theme.spacing.md,
});

export const BottomSection = styled(View)({
  paddingHorizontal: theme.spacing.xxl,
  paddingBottom: theme.spacing.xl,
  gap: theme.spacing.md,
  width: '94%',
});

export const SocialButton = styled(Button)({
  backgroundColor: '#F2F2F7',
});
