import styled from '@emotion/styled';

export const Card = styled.div((props) => ({
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.neutral.white,
  position: 'relative' as const,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));
