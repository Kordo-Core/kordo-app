import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View } from 'react-native';
import { Button } from 'kordo-ui';

export const Container = styled(SafeAreaView)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.primary.lightest,
  alignItems: 'center',
  paddingBottom: props.theme.spacing.xxl,
}));

export const BackButton = styled(TouchableOpacity)((props) => ({
  padding: props.theme.spacing.lg,
  alignSelf: 'flex-start',
}));

export const CenterSection = styled(View)((props) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: props.theme.spacing.xxl,
  gap: props.theme.spacing.md,
}));

export const Illustration = styled(View)((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: props.theme.colors.primary.lighter,
  marginBottom: props.theme.spacing.md,
}));

export const BottomSection = styled(View)((props) => ({
  paddingHorizontal: props.theme.spacing.xxl,
  paddingBottom: props.theme.spacing.xl,
  gap: props.theme.spacing.md,
  width: '94%',
}));

export const SocialButton = Button;
