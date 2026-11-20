import styled from '@emotion/native';
import { Theme } from '@emotion/react';
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

export const CustomText = styled(Text)<{
  size?: SegmentedControlProps['size'];
  surface?: boolean;
  heavy?: boolean;
}>((props) => ({
  height: props.size === 'lg' ? 44 : 38,
  lineHeight: props.size === 'lg' ? 44 : 38,
  // Variante surface (maquette « sport ») : 14 px gras
  fontSize: props.surface
    ? 14
    : props.size === 'lg'
      ? props.theme.fontSizes.md
      : props.theme.fontSizes.sm,
  ...(props.surface
    ? { fontFamily: props.heavy ? props.theme.fonts.extraBold : props.theme.fonts.bold }
    : {}),
  textAlign: 'center',
}));

const containerStyle = (props: { theme: Theme; borderRadius: string; surface?: boolean }) => ({
  flexDirection: 'row' as const,
  backgroundColor: 'rgba(255, 255, 255, 0.14)',
  padding: props.theme.spacing.xs,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
  // Segments jointifs en variante surface, comme la maquette
  gap: props.surface ? 0 : props.theme.spacing.xs,
  position: 'relative' as const,
  alignItems: 'center' as const,
  // flexGrow et non `flex: 1` : en natif, `flex: 1` donne une base de hauteur nulle dans un
  // parent sans hauteur fixe (en-têtes d'écran) et le contrôle s'écrasait. flexGrow garde la
  // hauteur du contenu et occupe toujours toute la largeur disponible dans une rangée.
  flexGrow: 1,
  flexShrink: 1,
  alignSelf: 'stretch' as const,
  overflow: 'hidden' as const,
});

export const SegmentedContainer = styled(BlurView)<{ borderRadius: string; surface?: boolean }>(
  containerStyle,
);

// Variante surface : fond opaque, aucun flou utile. Une View simple, car le BlurView natif
// (Android surtout) ne rogne pas toujours ses enfants à ses coins arrondis.
export const SurfaceContainer = styled.View<{ borderRadius: string; surface?: boolean }>(
  containerStyle,
);

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
  backgroundColor: props.color ?? props.theme.colors.surface,
  zIndex: 1,
  pointerEvents: 'none',
  overflow: 'hidden',
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
}));

// Rangée de libellés foncés, copie exacte de la couche de base, décalée en sens inverse du
// déplacement de l'indicateur : elle reste ainsi immobile à l'écran pendant que l'indicateur
// glisse, et seule la portion qu'il recouvre reste visible.
export const RevealRow = styled(Animated.View)<{ width: number; surface?: boolean }>((props) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: props.width,
  flexDirection: 'row',
  gap: props.surface ? 0 : props.theme.spacing.xs,
}));
