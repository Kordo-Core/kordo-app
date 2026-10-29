import styled from '@emotion/native';

// Emplacement de trophée (cercle gris, visuel uniquement).
const TROPHY_SIZE = 80;

export const Container = styled.View((props) => ({
  gap: props.theme.spacing.sm,
}));

export const Slots = styled.View((props) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: props.theme.spacing.xs,
}));

export const Slot = styled.View((props) => ({
  width: TROPHY_SIZE,
  height: TROPHY_SIZE,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.neutral.gray.light,
}));

export const Separator = styled.View((props) => ({
  height: 1,
  backgroundColor: props.theme.colors.neutral.gray.light,
}));

export const Footer = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: props.theme.spacing.xs,
}));
