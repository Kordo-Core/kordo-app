import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

export const Container = styled(SafeAreaView)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.background,
  paddingBottom: props.theme.spacing.xl,
}));

export const TopRow = styled(View)((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: props.theme.spacing.xl,
  paddingTop: props.theme.spacing.sm,
}));

export const CenterSection = styled(View)((props) => ({
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: props.theme.spacing.xl + 4,
  gap: props.theme.spacing.xl,
}));

export const BottomSection = styled(View)((props) => ({
  paddingHorizontal: props.theme.spacing.xl,
  paddingBottom: props.theme.spacing.lg,
  gap: props.theme.spacing.sm + 2,
}));
