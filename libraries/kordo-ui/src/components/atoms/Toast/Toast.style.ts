import styled from '@emotion/native';
import { ToastProps } from './Toast.types';
import { Loader } from '../Loader/Loader';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';

export const ToastContainer = styled.View<{ type: ToastProps['type'] }>((props) => {
  const typeColors: Record<ToastProps['type'], { border: string; background: string }> = {
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

  return {
    overflow: 'hidden',
    borderLeftWidth: 6,
    borderColor: typeColors[props.type].border,
    backgroundColor: typeColors[props.type].background,
    borderRadius: props.theme.borderRadius.md,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
  };
});

export const ToastContent = styled.View((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingInline: props.theme.spacing.md,
}));

export const CustomIcon = styled(Icon)({
  marginLeft: 0,
  marginRight: 4,
});

export const CloseIcon = styled(Button)({
  marginLeft: 'auto',
});

export const CustomLoader = styled(Loader)({
  position: 'absolute',
  bottom: 0,
});
