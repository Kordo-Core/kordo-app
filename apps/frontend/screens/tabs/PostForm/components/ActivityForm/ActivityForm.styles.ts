import styled from '@emotion/native';

// Carte de section (design D) : surtitre en petites majuscules puis les champs
export const SectionContainer = styled.View((props) => ({
  gap: props.theme.spacing.md,
}));

export const BlocsWrapper = styled.View((props) => ({
  gap: props.theme.spacing.sm,
}));

// Compteur de blocs validés, en grand chiffre display
export const Counter = styled.View((props) => ({
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: props.theme.spacing.md,
  padding: props.theme.spacing.lg,
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));
