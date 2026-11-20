import styled from '@emotion/native';

// Gabarit de chaque taille : hauteur, marge intérieure, rayon et corps du texte
export const TAG_SIZES = {
  xs: { height: 16, paddingHorizontal: 5, borderRadius: 8, fontSize: 10 },
  sm: { height: 22, paddingHorizontal: 8, borderRadius: 3, fontSize: 11 },
  md: { height: 26, paddingHorizontal: 10, borderRadius: 4, fontSize: 12 },
  lg: { height: 32, paddingHorizontal: 12, borderRadius: 5, fontSize: 13 },
} as const;

export const Tag = styled.View<{ size: keyof typeof TAG_SIZES; background: string }>((props) => ({
  height: TAG_SIZES[props.size].height,
  minWidth: TAG_SIZES[props.size].height,
  paddingHorizontal: TAG_SIZES[props.size].paddingHorizontal,
  borderRadius: TAG_SIZES[props.size].borderRadius,
  alignSelf: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: props.theme.spacing.xs,
  backgroundColor: props.background,
}));
