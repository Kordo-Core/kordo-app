import styled from '@emotion/native';

// Ligne cliquable d'une conversation : le bloc UserInfo s'étire, la pastille reste au bord droit.
export const Row = styled.Pressable((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
}));

// Compteur de non-lus, à droite de la ligne (pastille orange, design D)
export const UnreadBadge = styled.View((props) => ({
  minWidth: 22,
  height: 22,
  paddingHorizontal: 6,
  borderRadius: props.theme.borderRadius.rounded,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.primary.base,
}));

// État vide, calqué sur celui des onglets de relations.
export const Empty = styled.View((props) => ({
  paddingTop: props.theme.spacing.xxl,
  alignItems: 'center',
}));
