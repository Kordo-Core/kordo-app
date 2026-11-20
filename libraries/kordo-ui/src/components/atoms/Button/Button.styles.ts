import styled from '@emotion/native';
import { ButtonProps } from './Button.types';
import { getColor } from '../../../utils/getColors';
import { getToneColors, isSurfaceTone } from '../../../utils/surfaceTones';

// Hauteur de chaque taille ; un bouton icône seule est carré
const HEIGHTS = { sm: 32, md: 44, lg: 58 };

export const ButtonContainer = styled.View<Omit<ButtonProps, 'onPress' | 'style'>>((props) => {
  const color = isSurfaceTone(props.appearance)
    ? getToneColors(props.theme, props.appearance).background
    : getColor(props.theme, props.appearance!);
  const isDisabled = props.disabled;
  const size = props.size ?? 'md';
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';
  const iconOnly = props.icon && !props.title;

  return {
    // Plein : fond de la couleur. Inversé : fond de surface, contour fin, texte coloré.
    backgroundColor: props.inverted ? props.theme.colors.surface : color,
    opacity: isDisabled ? 0.45 : 1,

    // Contour
    // Inversé : filet intérieur de 1 px (maquette « sport »), sans décaler le contenu
    borderColor: 'transparent',
    borderWidth: 0,
    boxShadow: props.inverted && !props.borderless ? props.theme.shadows.sm : undefined,
    borderRadius:
      props.borderRadius === 'rounded'
        ? props.theme.borderRadius.rounded
        : isSmall
          ? 5
          : props.theme.borderRadius.square,

    // Mise en page
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHTS[size],
    minWidth: !props.icon && props.title && !isSmall ? 88 : undefined,
    width: iconOnly ? HEIGHTS[size] : props.fullWidth ? '100%' : undefined,
    gap: isSmall ? props.theme.spacing.xs : props.theme.spacing.sm,

    paddingHorizontal: iconOnly
      ? 0
      : isLarge
        ? props.theme.spacing.xl + 2
        : isSmall
          ? 12
          : props.theme.spacing.lg,
  };
});
