import styled from '@emotion/native';

export const Container = styled.View((props) => ({
  gap: props.theme.spacing.md,
  marginTop: props.theme.spacing.sm,
}));

export const Card = styled.View((props) => ({
  paddingHorizontal: props.theme.spacing.lg,
  paddingVertical: props.theme.spacing.xs,
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));
