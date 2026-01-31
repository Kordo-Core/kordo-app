import styled from '@emotion/styled';
import { ToastProps } from './Toast.types';
import { Loader } from '../Loader/Loader';
import { Icon } from '../Icon/Icon';

export const ToastContainer = styled.div<{ type: ToastProps['type'] }>((props) => {
  const typeColors: Record<NonNullable<ToastProps['type']>, { border: string; background: string }> = {
    success: {
      border: props.theme.colors.success.base,
      background: props.theme.colors.success.lighter,
    },
    error: {
      border: props.theme.colors.error.base,
      background: props.theme.colors.error.lighter,
    },
    warning: {
      border: props.theme.colors.warning.base,
      background: props.theme.colors.warning.lighter,
    },
    info: {
      border: props.theme.colors.info.base,
      background: props.theme.colors.info.lighter,
    },
  };

  const colors = typeColors[props.type ?? 'info'];

  return {
    overflow: 'hidden',
    borderLeftWidth: 6,
    borderLeftStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: props.theme.borderRadius.square,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    position: 'relative',
  };
});

export const ToastContent = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingLeft: props.theme.spacing.md,
  paddingRight: props.theme.spacing.md,
}));

export const CustomIcon = styled(Icon)({
  marginLeft: 0,
  marginRight: 4,
});

export const CloseIcon = styled(Icon)({
  marginLeft: 'auto',
  cursor: 'pointer',
});

export const CustomLoader = styled(Loader)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});
