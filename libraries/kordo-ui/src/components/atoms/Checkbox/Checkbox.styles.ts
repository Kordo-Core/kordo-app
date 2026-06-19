import styled from '@emotion/native';

// Conteneur cliquable : libellé à gauche (s'il existe) + case à droite
export const Container = styled.Pressable<{ disabled?: boolean }>((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
  opacity: props.disabled ? 0.5 : 1,
}));

// Libellé occupant l'espace restant pour pousser la case au bord droit
export const LabelWrapper = styled.View({
  flex: 1,
});

// Case carrée : bordure quand décochée, fond plein quand cochée
export const Box = styled.View<{ checked?: boolean }>((props) => ({
  width: 22,
  height: 22,
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: props.checked ? 0 : 1,
  borderColor: props.theme.colors.neutral.gray.base,
  backgroundColor: props.checked ? props.theme.colors.secondary.base : 'transparent',
}));
