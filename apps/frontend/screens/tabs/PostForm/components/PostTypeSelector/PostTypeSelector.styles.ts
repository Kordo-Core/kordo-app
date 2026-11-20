import styled from '@emotion/native';
import { Pressable } from 'react-native';

export const Row = styled.View((props) => ({
  flexDirection: 'row' as const,
  gap: props.theme.spacing.sm,
}));

export const TypeCard = styled(Pressable)<{ selected: boolean }>((props) => ({
  flex: 1,
  height: 68,
  borderRadius: 8,
  gap: 6,
  backgroundColor: props.selected ? props.theme.colors.text : props.theme.colors.surface,
  // Seules cartes de la maquette qui gardent une ombre portée au lieu du filet
  boxShadow: props.selected
    ? '0px 8px 18px rgba(0, 0, 0, 0.18)'
    : `0px 1px 2px rgba(${props.theme.colors.scrim}, 0.05)`,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
}));
