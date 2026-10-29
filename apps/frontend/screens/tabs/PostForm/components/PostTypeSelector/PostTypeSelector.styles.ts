import styled from '@emotion/native';
import { Pressable } from 'react-native';

export const Row = styled.View((props) => ({
  flexDirection: 'row' as const,
  gap: props.theme.spacing.sm,
}));

export const TypeCard = styled(Pressable)<{ selected: boolean }>((props) => ({
  flex: 1,
  height: 70,
  borderRadius: 18,
  gap: 6,
  backgroundColor: props.selected ? props.theme.colors.text : props.theme.colors.surface,
  boxShadow: props.selected ? '0px 8px 18px rgba(0, 0, 0, 0.18)' : props.theme.shadows.sm,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
}));
