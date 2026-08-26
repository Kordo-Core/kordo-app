import styled from '@emotion/native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

// Racine de la ligne : pleine largeur, overflow hidden pour clipper les bandeaux d'action
export const BlocRow = styled(View)({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
});

// Premier plan opaque : glisse horizontalement pour révéler le bandeau d'action
export const BlocForeground = styled(Animated.View)((props) => ({
  backgroundColor: props.theme.colors.neutral.white,
  paddingInline: props.theme.spacing.lg,
}));

// Icônes d'action épinglées aux bords (restent en place quand le bandeau s'étire)
export const BlocActionIconLeft = styled(View)({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 88,
  alignItems: 'center',
  justifyContent: 'center',
});

export const BlocActionIconRight = styled(View)({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  width: 88,
  alignItems: 'center',
  justifyContent: 'center',
});
