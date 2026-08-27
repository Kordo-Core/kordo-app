import styled from '@emotion/native';

const DOT_SIZE = 18;

// Ligne cliquable : textes à gauche, pastille à droite, comme sur les écrans de réglages.
export const Container = styled.Pressable<{ disabled?: boolean }>((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.md,
  opacity: props.disabled ? 0.5 : 1,
}));

// Les textes occupent l'espace restant pour pousser la pastille au bord droit.
export const Labels = styled.View((props) => ({
  flex: 1,
  gap: props.theme.spacing.xs,
}));

// Pastille pleine quand sélectionnée, grise sinon — pas de bordure, comme la maquette.
export const Dot = styled.View<{ selected: boolean; color: string }>((props) => ({
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.selected ? props.color : props.theme.colors.neutral.gray.light,
}));
