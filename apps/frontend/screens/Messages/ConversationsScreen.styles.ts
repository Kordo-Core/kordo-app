import styled from '@emotion/native';

// Ligne cliquable d'une conversation : le bloc UserInfo s'étire, la pastille reste au bord droit.
export const Row = styled.Pressable((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
}));

// Pastille de non-lu, à droite de la ligne — seul repère visuel dans la maquette.
export const UnreadDot = styled.View((props) => ({
  width: 10,
  height: 10,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.secondary.base,
}));

// État vide, calqué sur celui des onglets de relations.
export const Empty = styled.View((props) => ({
  paddingTop: props.theme.spacing.xxl,
  alignItems: 'center',
}));
