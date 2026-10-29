import styled from '@emotion/native';
import { ButtonProps } from './Button.types';
import { getColor } from '../../../utils/getColors';

export const ButtonContainer = styled.View<Omit<ButtonProps, 'onPress' | 'style'>>((props) => {
  const color = getColor(props.theme, props.appearance!);
  const isDisabled = props.disabled;
  const isLarge = props.size === 'lg';
  const iconOnly = props.icon && !props.title;

  return {
    // Plein : fond de la couleur. Inversé : fond de surface, contour fin, texte coloré.
    backgroundColor: props.inverted ? props.theme.colors.surface : color,
    opacity: isDisabled ? 0.45 : 1,

    // Contour
    borderColor: props.inverted ? props.theme.colors.border : 'transparent',
    borderWidth: props.borderless ? 0 : props.inverted ? 1.5 : 0,
    borderRadius:
      props.borderRadius === 'rounded'
        ? props.theme.borderRadius.rounded
        : isLarge
          ? props.theme.borderRadius.square + 2
          : props.theme.borderRadius.square,

    // Mise en page
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: isLarge ? 56 : 44,
    minWidth: !props.icon && props.title ? 88 : undefined,
    width: iconOnly ? (isLarge ? 56 : 44) : props.fullWidth ? '100%' : undefined,
    gap: props.theme.spacing.sm,

    paddingHorizontal: iconOnly ? 0 : isLarge ? props.theme.spacing.xl + 2 : props.theme.spacing.lg,
  };
});
