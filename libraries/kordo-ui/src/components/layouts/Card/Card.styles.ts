import styled from '@emotion/native';

export const Card = styled.View((props) => ({
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.neutral.white,
  position: 'relative',
  alignSelf: 'flex-start',
  padding: props.theme.spacing.md,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
}));
