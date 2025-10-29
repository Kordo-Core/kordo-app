import styled from '@emotion/native';
import { ButtonProps } from './Button.types';
import { getColor } from '../../../utils/getColors';

export const ButtonContainer = styled.View<Exclude<ButtonProps, 'onClick'>>((props) => ({
  backgroundColor: props.inverted ? props.theme.colors.neutral.white : getColor(props.appearance!),
  borderColor: props.inverted ? getColor(props.appearance) : props.theme.colors.neutral.white,
  borderWidth: 1,

  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.md,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: props.theme.spacing.sm,

  height: props.size === 'lg' ? 60 : 36,

  width:
    props.icon && !props.title
      ? props.size === 'lg'
        ? 70
        : 40
      : props.width === 'full'
        ? '100%'
        : undefined,

  paddingHorizontal:
    props.icon && !props.title
      ? 0
      : props.size === 'lg'
        ? props.theme.spacing.xxl
        : props.theme.spacing.md,
}));
