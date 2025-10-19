import styled from '@emotion/native';
import { ToastProps } from './Toast.types';
import { Feather } from '@expo/vector-icons';
import { IconProps } from 'types/Icon';

export const ToastContainer = styled.View<{ type: ToastProps['type'] }>((props) => {
  const typeColors: Record<ToastProps['type'], { border: string; background: string }> = {
    success: {
      border: props.theme.colors.type.success,
      background: '#E6F4EA',
    },
    error: {
      border: props.theme.colors.type.error,
      background: '#FDECEA',
    },
    warning: {
      border: props.theme.colors.type.warning,
      background: '#FFF4E5',
    },
    info: {
      border: props.theme.colors.type.info,
      background: '#E8F3FD',
    },
  };

  return {
    borderWidth: 1,
    borderLeftWidth: 6,
    borderColor: typeColors[props.type].border,
    backgroundColor: typeColors[props.type].background,
    paddingInline: props.theme.spacing.md,
    borderRadius: props.theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    marginTop: 4,
  };
});

export const Icon = styled(Feather)<{ position: IconProps['position'] }>({
  marginLeft: 0,
  marginRight: 4,
});

export const CloseIcon = styled(Feather)<{ position: IconProps['position'] }>({
  marginLeft: 'auto',
});
