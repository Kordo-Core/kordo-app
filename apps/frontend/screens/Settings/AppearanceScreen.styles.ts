import styled from '@emotion/native';

// Vignette d'aperçu d'un thème : proportions d'un écran de téléphone.
export const Preview = styled.View((props) => ({
  width: 100,
  height: 140,
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.neutral.gray.light,
}));
