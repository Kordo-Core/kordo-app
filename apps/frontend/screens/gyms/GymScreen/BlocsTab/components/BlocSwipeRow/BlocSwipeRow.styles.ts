import styled from '@emotion/native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

// Racine mesurée de la ligne : porte l'espacement entre cartes (inclus dans la hauteur
// mesurée, dont dépend le repérage du doigt dans useBlocSwipe).
export const BlocRow = styled(View)((props) => ({
  width: '100%',
  paddingHorizontal: props.theme.spacing.md + 2,
  paddingBottom: props.theme.spacing.sm,
}));

// Carte arrondie (design D) : clippe les bandeaux d'action révélés par le swipe
export const Card = styled(View)((props) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 20,
  boxShadow: props.theme.shadows.sm,
}));

// Premier plan opaque : glisse horizontalement pour révéler le bandeau d'action
export const BlocForeground = styled(Animated.View)((props) => ({
  backgroundColor: props.theme.colors.surface,
  paddingInline: props.theme.spacing.md + 2,
}));

// Icônes d'action épinglées aux bords (restent en place quand le bandeau s'étire)
export const BlocActionIconLeft = styled(View)({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 80,
  alignItems: 'center',
  justifyContent: 'center',
});

export const BlocActionIconRight = styled(View)({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  width: 80,
  alignItems: 'center',
  justifyContent: 'center',
});
