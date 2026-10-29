import styled from '@emotion/native';

const DOT_SIZE = 24;
const INNER_SIZE = 12;

// Anneau coloré quand l'option est sélectionnée, anneau neutre sinon (design D).
// Il centre son contenu pour porter le point de l'état sélectionné.
export const Dot = styled.View<{ selected: boolean; color: string; disabled?: boolean }>(
  (props) => ({
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: props.theme.borderRadius.rounded,
    borderWidth: 2,
    borderColor: props.selected ? props.color : props.theme.colors.border,
    backgroundColor: 'transparent',
    opacity: props.disabled ? 0.5 : 1,
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

// Point plein au centre, rendu seulement quand l'option est sélectionnée.
export const Inner = styled.View<{ color: string }>((props) => ({
  width: INNER_SIZE,
  height: INNER_SIZE,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.color,
}));
