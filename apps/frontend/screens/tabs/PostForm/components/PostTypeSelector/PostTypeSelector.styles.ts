import styled from '@emotion/native';
import { Pressable } from 'react-native';

export const Row = styled.View((props) => ({
  flexDirection: 'row' as const,
  gap: props.theme.spacing.md,
}));

export const TypeWrapper = styled.View((props) => ({
  flex: 1,
  alignItems: 'center' as const,
  gap: props.theme.spacing.xs,
}));

export const TypeCard = styled(Pressable)<{ selected: boolean }>((props) => ({
  width: '100%',
  aspectRatio: 1,
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.neutral.gray.light,
  borderWidth: 2,
  borderColor: props.selected ? props.theme.colors.primary.base : 'transparent',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
}));
