import styled from '@emotion/native';
import { ButtonProps } from './Button.types';
import { getColor } from '../../../utils/getColors';

export const ButtonContainer = styled.View<Omit<ButtonProps, 'onClick' | 'style'>>((props) => ({
  backgroundColor: props.inverted
    ? props.withoutBorder
      ? 'transparent'
      : props.theme.colors.neutral.white
    : getColor(props.appearance!),
  borderColor: 'transparent',
  borderWidth: props.withoutBorder ? 0 : 1,
  boxShadow: `inset 0 0 0 ${props.withoutBorder ? -1 : 1}px ${getColor(props.appearance!)}` /* Bordure interne de 2px */,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: props.theme.spacing.sm,

  height: props.size === 'lg' ? 60 : 36,
  alignSelf: !props.fullWidth ? 'flex-start' : undefined,
  minWidth: !props.icon && props.title && !props.fullWidth ? 80 : undefined,
  width:
    props.icon && !props.title
      ? props.size === 'lg'
        ? 60
        : 36
      : props.fullWidth
        ? '100%'
        : undefined,

  paddingHorizontal:
    props.icon && !props.title
      ? 0
      : props.size === 'lg'
        ? props.theme.spacing.xxl
        : props.theme.spacing.md,
}));
