import styled from '@emotion/native';

export const Card = styled.View((props) => ({
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.neutral.white,
  position: 'relative',
  alignSelf: 'flex-start',
  padding: props.theme.spacing.md,
  boxShadow: props.theme.shadows.lg,
}));
