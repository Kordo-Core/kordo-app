import styled from '@emotion/native';
import { IconButtonProps } from './IconButton.types';

export const Box = styled.View<{ variant: NonNullable<IconButtonProps['variant']>; size: number }>(
  (props) => {
    const backgrounds = {
      surface: props.theme.colors.surface,
      glass: 'rgba(0, 0, 0, 0.3)',
      // Voile clair posé sur un fond de couleur (carte verte « Ta progression »)
      tint: 'rgba(255, 255, 255, 0.14)',
      soft: props.theme.colors.soft,
      action: props.theme.colors.secondary.base,
    };
    return {
      width: props.size,
      height: props.size,
      borderRadius: Math.round(props.size * 0.14),
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
  // 18 px de pastille + 2 × 2 px de liseré (la maquette compte le liseré en plus)
  minWidth: 22,
  height: 22,
  paddingHorizontal: 6,
  borderRadius: props.theme.borderRadius.rounded,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.secondary.base,
  borderWidth: 2,
  borderColor: props.theme.colors.background,
}));

// 9 px de pastille + 2 × 2 px de liseré blanc, comme la maquette
export const DOT_SIZE = 13;

// Point posé dans le coin de l'icône, cerclé de la couleur du bouton
export const Dot = styled.View((props) => ({
  position: 'absolute',
  top: 10,
  right: 11,
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.primary.base,
  borderWidth: 2,
  borderColor: props.theme.colors.surface,
}));
