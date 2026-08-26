import styled from '@emotion/native';
import { theme } from 'kordo-ui';

export const Row = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
}));

// L'identité prend toute la largeur disponible pour pousser le bouton contre le bord droit.
export const Identity = styled.View(() => ({
  flex: 1,
}));

// `Bounce`, qui enveloppe le Button, impose `alignSelf: 'flex-start'` : sans cette surcharge
// le bouton se cale en haut de la ligne au lieu de suivre le `alignItems: 'center'` du parent.
export const followButton = { alignSelf: 'center' as const };
