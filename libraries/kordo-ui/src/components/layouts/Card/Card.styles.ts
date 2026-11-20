import styled from '@emotion/native';

export const Card = styled.View((props) => ({
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.surface,
  position: 'relative',
  alignSelf: 'flex-start',
  padding: props.theme.spacing.md,
  boxShadow: props.theme.shadows.md,
}));
