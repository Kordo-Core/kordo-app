import styled from '@emotion/native';

export const ToastContainer = styled.View((props) => ({
  position: 'absolute',
  bottom: props.theme.spacing.xl,
  left: 0,
  right: 0,
  paddingHorizontal: props.theme.spacing.lg,
  gap: props.theme.spacing.sm,
  zIndex: 100,
  elevation: 100,
}));
