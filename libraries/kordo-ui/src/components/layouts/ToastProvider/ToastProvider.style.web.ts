import styled from '@emotion/styled';

export const ToastContainer = styled.div((props) => ({
  position: 'fixed',
  bottom: props.theme.spacing.xl,
  left: 0,
  right: 0,
  paddingLeft: props.theme.spacing.lg,
  paddingRight: props.theme.spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: props.theme.spacing.sm,
  zIndex: 100,
}));
