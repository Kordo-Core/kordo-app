import styled from '@emotion/native';
import { ExtendedSizeType } from '../../../types/theme.types';

export const Section = styled.View<{ gap: ExtendedSizeType }>((props) => ({
  // Design D : les sections sont des cartes arrondies posées sur le fond de l'écran, avec une
  // marge latérale, plutôt que des bandes blanches bord à bord.
  alignSelf: 'stretch',
  marginHorizontal: props.theme.spacing.md + 2,
  backgroundColor: props.theme.colors.surface,
  borderRadius: props.theme.borderRadius.card,
  paddingHorizontal: props.theme.spacing.lg,
  paddingVertical: props.theme.spacing.md,
  gap: props.theme.spacing[props.gap],
  boxShadow: props.theme.shadows.sm,
}));
