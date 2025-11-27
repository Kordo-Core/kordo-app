import styled from '@emotion/native';
import { ButtonProps } from './Button.types';
import { getColor } from '../../../utils/getColors';

export const ButtonContainer = styled.View<Omit<ButtonProps, 'onClick' | 'style'>>((props) => ({
  backgroundColor: props.inverted ? props.theme.colors.neutral.white : getColor(props.appearance!),

  borderColor: 'transparent',
  borderWidth: props.borderless ? 0 : 1,
  boxShadow: `inset 0 0 0 ${props.borderless ? -1 : 1}px ${getColor(props.appearance!)}`,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  height: props.size === 'lg' ? 60 : 36,
  minWidth: !props.icon && props.title ? 80 : undefined,
  width: props.icon && !props.title ? (props.size === 'lg' ? 60 : 36) : undefined,
  gap: props.theme.spacing.sm,

  paddingHorizontal:
    props.icon && !props.title
      ? 0
      : props.size === 'lg'
        ? props.theme.spacing.xxl
        : props.theme.spacing.md,
}));
