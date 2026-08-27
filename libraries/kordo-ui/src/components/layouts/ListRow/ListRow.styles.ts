import styled from '@emotion/native';

// Gabarit partagé par les deux variantes de ligne, cliquable ou non.
const row = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingVertical: 8,
  gap: 16,
} as const;

export const Row = styled.View(row);

// Même gabarit, mais la ligne entière déclenche l'action du parent.
export const PressableRow = styled.Pressable(row);

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
