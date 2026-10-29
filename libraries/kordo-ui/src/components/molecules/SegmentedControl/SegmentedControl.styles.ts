import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { SegmentedControlProps } from './SegmentedControl.types';
import { Text } from '../../atoms/Text/Text';

const segment = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
} as const;

// Segment décoratif : sert de gabarit à la couche masquée (texte blanc), sans interaction.
export const SegmentItem = styled.View(() => segment);

// Segment cliquable de la couche de base. Un `Pressable` et non une View avec `onTouchEnd` :
// un événement tactile ne part jamais d'une souris, le contrôle était donc inerte sur le web.
export const SegmentButton = styled.Pressable(() => segment);

export const CustomText = styled(Text)<{ size?: SegmentedControlProps['size'] }>((props) => ({
  height: props.size === 'lg' ? 60 : 40,
  lineHeight: props.size === 'lg' ? 60 : 40,
  fontSize: props.size ? props.theme.fontSizes[props.size] : props.theme.fontSizes.md,
  textAlign: 'center',
}));

export const SegmentedContainer = styled(BlurView)<{ borderRadius: string }>((props) => ({
  flexDirection: 'row',
  backgroundColor: 'transparent',
  padding: props.theme.spacing.xs,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
  gap: props.theme.spacing.xs,
  position: 'relative',
  alignItems: 'center',
  flex: 1,
  overflow: 'hidden',
}));

// L'indicateur tient la hauteur du conteneur moins son padding : bornes haute et basse plutôt
// qu'une hauteur en pourcentage, qui vaut 100 % du conteneur padding compris et débordait donc
// vers le bas — coin arrondi rogné à la clé.
//
// Il est posé *au-dessus* de la couche de texte noir et porte lui-même le texte blanc, qu'il
// rogne à ses propres bords (`overflow: 'hidden'`). C'est ce rognage qui produit l'inversion de
// couleur au passage de l'indicateur — auparavant confiée à un MaskedView, dont l'implémentation
// web se contente d'afficher le masque en jetant les enfants.
//
// `pointerEvents: 'none'` : le clic doit traverser jusqu'aux segments qu'il recouvre.
export const Pointer = styled(Animated.View)<{ borderRadius: string; color?: string }>((props) => ({
  position: 'absolute',
  top: props.theme.spacing.xs,
  bottom: props.theme.spacing.xs,
  backgroundColor: props.color ?? props.theme.colors.primary.base,
  zIndex: 1,
  pointerEvents: 'none',
  overflow: 'hidden',
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
}));

// Rangée de libellés blancs, copie exacte de la couche de base, décalée en sens inverse du
// déplacement de l'indicateur : elle reste ainsi immobile à l'écran pendant que l'indicateur
// glisse, et seule la portion qu'il recouvre reste visible.
export const RevealRow = styled(Animated.View)<{ width: number }>((props) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: props.width,
  flexDirection: 'row',
  gap: props.theme.spacing.xs,
}));
