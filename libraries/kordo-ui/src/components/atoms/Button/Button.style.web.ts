import styled from '@emotion/styled';
import { ButtonProps } from './Button.types';
import { getColor } from '../../../utils/getColors';

export const ButtonContainer = styled.div<Omit<ButtonProps, 'onPress' | 'style'>>((props) => {
  const color = getColor(props.appearance!);
  const isDisabled = props.disabled;

  const horizontalPadding =
    props.icon && !props.title
      ? 0
      : props.size === 'lg'
        ? props.theme.spacing.xxl
        : props.theme.spacing.md;

  return {
    backgroundColor: props.inverted ? props.theme.colors.neutral.white : color,
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'opacity 0.2s ease',

    // Bordure
    borderStyle: 'solid',
    borderColor: props.inverted ? color : 'transparent',
    borderWidth: props.borderless ? 0 : 1,
    borderRadius:
      props.borderRadius === 'rounded'
        ? props.theme.borderRadius.rounded
        : props.theme.borderRadius.square,

    // Layout
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    height: props.size === 'lg' ? 60 : 36,
    minWidth: !props.icon && props.title ? 80 : undefined,
    width: props.icon && !props.title ? (props.size === 'lg' ? 60 : 36) : undefined,
    gap: props.theme.spacing.sm,
    boxSizing: 'border-box',

    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,

    // Hover effect (seulement si pas disabled)
    '&:hover': !isDisabled ? {
      opacity: 0.9,
    } : {},
  };
});
