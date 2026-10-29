import styled from '@emotion/native';
import { IconButtonProps } from './IconButton.types';

export const Box = styled.View<{ variant: NonNullable<IconButtonProps['variant']>; size: number }>(
  (props) => {
    const backgrounds = {
      surface: props.theme.colors.surface,
      glass: 'rgba(0, 0, 0, 0.3)',
      soft: props.theme.colors.soft,
      action: props.theme.colors.secondary.base,
    };
    return {
      width: props.size,
      height: props.size,
      borderRadius: Math.round(props.size * 0.32),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgrounds[props.variant],
      boxShadow: props.variant === 'surface' ? props.theme.shadows.sm : undefined,
    };
  },
);

export const Badge = styled.View((props) => ({
  position: 'absolute',
  top: -4,
  right: -4,
  minWidth: 18,
  height: 18,
  paddingHorizontal: 4,
  borderRadius: props.theme.borderRadius.rounded,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.primary.base,
  borderWidth: 2,
  borderColor: props.theme.colors.background,
}));
