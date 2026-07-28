import styled from '@emotion/native';
import { theme } from 'kordo-ui';

// Emplacement de trophée (cercle gris, visuel uniquement).
const TROPHY_SIZE = 80;

export const Container = styled.View(() => ({
  gap: theme.spacing.sm,
}));

export const Slots = styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: theme.spacing.xs,
}));

export const Slot = styled.View(() => ({
  width: TROPHY_SIZE,
  height: TROPHY_SIZE,
  borderRadius: theme.borderRadius.rounded,
  backgroundColor: theme.colors.neutral.gray.light,
}));

export const Separator = styled.View(() => ({
  height: 1,
  backgroundColor: theme.colors.neutral.gray.light,
}));

export const Footer = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.spacing.xs,
}));
