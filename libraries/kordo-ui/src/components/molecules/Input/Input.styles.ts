import styled from '@emotion/native';
import { Platform, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text/Text';
import Animated from 'react-native-reanimated';

export const InputContainer = styled(Animated.View)<{ multiline?: boolean; hasLabel?: boolean }>(
  (props) => ({
    backgroundColor: props.theme.colors.surface,
    paddingInline: 14,
    // Champ à libellé : 12 px entre icône et texte ; barre de recherche : 10 px
    gap: props.hasLabel ? 12 : 10,
    borderRadius: props.theme.borderRadius.square,
    boxShadow: props.theme.shadows.sm,
    flexDirection: 'row',
    alignItems: props.multiline ? 'flex-start' : 'center',
    width: '100%',
    ...(props.multiline
      ? { minHeight: 104, paddingVertical: props.theme.spacing.md }
      : { height: props.hasLabel ? 62 : 48 }),
  }),
);

// Anneau de focus / d'erreur : posé par-dessus le champ, il ne décale pas son contenu.
export const FocusRing = styled(Animated.View)((props) => ({
  ...StyleSheet.absoluteFillObject,
  borderWidth: 2,
  borderRadius: props.theme.borderRadius.square,
}));

// Pas de `flex: 1` : sous le libellé, le champ garderait toute la hauteur restante et
// décentrerait le bloc libellé + saisie.
export const Input = styled.TextInput<{ hasLeftIcon?: boolean }>((props) => ({
  padding: 0,
  // Un champ de saisie n'hérite pas de la typographie : sans ces trois règles il rend avec
  // la police du système (natif) ou celle du navigateur (web), et pas avec Outfit.
  fontFamily: props.theme.fonts.semiBold,
  fontSize: props.theme.fontSizes.md,
  color: props.theme.colors.text,
  // Web : le navigateur dessine son propre contour noir au focus, à l'intérieur du champ ;
  // c'est le cadre du champ qui signale le focus. Sans effet en natif.
  ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
}));

export const ErrorText = styled(Text)({
  marginBottom: 2,
  marginTop: 2,
  marginLeft: 0,
});

/** Arrondi des champs de formulaire de l'écran Publier (maquette : 9 px) */
export const FORM_RADIUS = 9;

// Champ « formulaire » : colonne libellé + saisie, 14 × 16 px de marge intérieure.
export const FormField = styled.View((props) => ({
  gap: 6,
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: FORM_RADIUS,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));
