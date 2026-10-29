import styled from '@emotion/native';

// Ligne utilisateur en carte arrondie (design D)
export const Row = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.md,
  paddingVertical: props.theme.spacing.sm + 2,
  paddingHorizontal: props.theme.spacing.md,
  borderRadius: 20,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));

// L'identité prend toute la largeur disponible pour pousser le bouton contre le bord droit.
export const Identity = styled.View(() => ({
  flex: 1,
}));
