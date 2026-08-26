import styled from '@emotion/native';
import { theme } from 'kordo-ui';

// La barre reste fixe au-dessus de la liste : elle est hors du scroll de chaque onglet.
export const Toolbar = styled.View(() => ({
  paddingHorizontal: theme.spacing.md,
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.xl,
}));
