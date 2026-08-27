import styled from '@emotion/native';

const DOT_SIZE = 18;
const INNER_SIZE = 8;

// Pastille pleine quand sélectionnée, grise sinon — pas de bordure, comme la maquette.
// Elle centre son contenu pour porter le point blanc de l'état sélectionné.
export const Dot = styled.View<{ selected: boolean; color: string; disabled?: boolean }>(
  (props) => ({
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: props.theme.borderRadius.rounded,
    backgroundColor: props.selected ? props.color : props.theme.colors.neutral.gray.light,
    opacity: props.disabled ? 0.5 : 1,
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

// Point blanc au centre, rendu seulement quand l'option est sélectionnée.
export const Inner = styled.View((props) => ({
  width: INNER_SIZE,
  height: INNER_SIZE,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.neutral.white,
}));
