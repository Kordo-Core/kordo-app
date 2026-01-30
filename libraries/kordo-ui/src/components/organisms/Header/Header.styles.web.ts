import styled from '@emotion/styled';

export const Header = styled.header((props) => ({
  zIndex: 2,
  paddingTop: 4,
  paddingBottom: 4,
  position: 'sticky' as const,
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: props.theme.colors.neutral.white,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));
