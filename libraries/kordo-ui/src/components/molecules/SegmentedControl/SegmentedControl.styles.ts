import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
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
export const Pointer = styled(Animated.View)<{ borderRadius: string; color?: string }>((props) => ({
  position: 'absolute',
  top: props.theme.spacing.xs,
  bottom: props.theme.spacing.xs,
  backgroundColor: props.color ?? props.theme.colors.primary.base,
  zIndex: 0,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
}));

// Couche purement visuelle, posée par-dessus la couche de base : `pointerEvents: 'none'` pour
// qu'elle ne capte pas les clics destinés aux segments qu'elle recouvre.
export const MaskedContainer = styled(MaskedView)((props) => ({
  flexDirection: 'row',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: props.theme.spacing.xs,
  gap: props.theme.spacing.xs,
  zIndex: 1,
  pointerEvents: 'none',
}));

export const MaskOverlay = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: props.theme.spacing.xs,
  bottom: props.theme.spacing.xs,
  backgroundColor: 'black',
}));
