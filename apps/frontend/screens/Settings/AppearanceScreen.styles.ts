import styled from '@emotion/native';

// Vignette d'aperçu d'un thème : proportions d'un écran de téléphone, contour vert si choisi.
export const Preview = styled.View<{ selected: boolean }>((props) => ({
  aspectRatio: 0.72,
  padding: 8,
  gap: 6,
  borderRadius: props.theme.borderRadius.card - 4,
  borderWidth: 2.5,
  borderColor: props.selected ? props.theme.colors.secondary.base : props.theme.colors.border,
  overflow: 'hidden',
}));
