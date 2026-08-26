import styled from '@emotion/native';

export const Row = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.md,
  paddingVertical: props.theme.spacing.sm,
}));

// L'identité prend toute la largeur disponible pour pousser le bouton contre le bord droit.
export const Identity = styled.View(() => ({
  flex: 1,
}));
