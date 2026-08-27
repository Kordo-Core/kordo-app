import styled from '@emotion/native';

export const Row = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingVertical: 8,
  gap: 16,
});

export const Left = styled.View(() => ({
  flexDirection: 'row',
  gap: 4,
}));

export const Right = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  marginLeft: 'auto',
}));

export const TextWrapper = styled.View(() => ({
  //TODO alignItems: 'center',
  pointerEvents: 'none',
  // Borne la zone de texte à l'espace disponible entre Left et Right → le texte long
  // revient à la ligne au lieu de déborder sur la droite.
  flex: 1,
}));

export const LeftWrapper = styled.View((props) => ({
  minWidth: props.theme.spacing.xxl,
}));
