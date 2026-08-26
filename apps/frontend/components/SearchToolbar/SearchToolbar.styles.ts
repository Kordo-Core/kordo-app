import styled from '@emotion/native';

// La barre reste fixe au-dessus de la liste : elle est hors du scroll de chaque onglet.
export const Toolbar = styled.View((props) => ({
  paddingHorizontal: props.theme.spacing.md,
  paddingTop: props.theme.spacing.md,
  paddingBottom: props.theme.spacing.xl,
}));
