import styled from '@emotion/native';

// Barre ancrée en bas du fil, sur fond plein pour rester lisible au-dessus des messages.
export const Bar = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
  paddingHorizontal: props.theme.spacing.md,
  paddingTop: props.theme.spacing.sm,
  paddingBottom: props.theme.spacing.lg,
  backgroundColor: props.theme.colors.background,
}));

// Bouton appareil photo : pastille pleine à gauche de la saisie, comme sur la maquette.
export const CameraButton = styled.Pressable((props) => ({
  width: 48,
  height: 48,
  borderRadius: props.theme.borderRadius.square,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.primary.base,
}));

// La saisie occupe tout l'espace restant entre les deux boutons.
export const InputWrapper = styled.View({
  flex: 1,
});
