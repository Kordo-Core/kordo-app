import styled from '@emotion/native';

export const Section = styled.View((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.neutral.white,
  padding: props.theme.spacing.md,
  gap: props.theme.spacing.sm,
  boxShadow: props.theme.shadows.sm,
}));
