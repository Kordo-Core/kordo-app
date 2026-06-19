import styled from '@emotion/native';
import { Text } from '../../atoms/Text/Text';

// Trigger fermé : aligné visuellement sur l'Input (bordure, radius, hauteur, padding)
export const Trigger = styled.Pressable<{ disabled?: boolean }>((props) => ({
  borderWidth: 1,
  borderColor: props.theme.colors.neutral.gray.light,
  backgroundColor: props.theme.colors.neutral.white,
  paddingInline: props.theme.spacing.md,
  borderRadius: props.theme.borderRadius.square,
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
  width: '100%',
  height: 42,
  opacity: props.disabled ? 0.5 : 1,
}));

// Texte du trigger : occupe l'espace restant entre l'icône et le chevron
export const TriggerText = styled(Text)({
  flex: 1,
});

// Fond plein écran capturant le clic extérieur pour fermer la liste
export const Backdrop = styled.Pressable({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

// Conteneur flottant des options, positionné en absolu au-dessus/en dessous du trigger
export const ListContainer = styled.View((props) => ({
  position: 'absolute',
  backgroundColor: props.theme.colors.neutral.white,
  borderRadius: props.theme.borderRadius.square,
  borderWidth: 1,
  borderColor: props.theme.colors.neutral.gray.light,
  overflow: 'hidden',
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 8,
}));

// Ligne d'option : disposition gauche/droite, fond surligné si sélectionnée
export const ItemRow = styled.Pressable<{ selected?: boolean }>((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
  paddingVertical: props.theme.spacing.md,
  paddingHorizontal: props.theme.spacing.md,
  backgroundColor: props.selected
    ? props.theme.colors.secondary.lightest
    : props.theme.colors.neutral.white,
}));

// Zone gauche extensible de l'option
export const ItemLeft = styled.View({
  flex: 1,
});
