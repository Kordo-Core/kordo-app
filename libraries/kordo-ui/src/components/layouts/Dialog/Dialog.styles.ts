import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

// Couvre l'écran : le voile occupe tout, la boîte est centrée par-dessus.
export const Container = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
});

export const Overlay = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: props.theme.colors.overlay.dark,
}));

// Largeur bornée : la boîte suit la largeur de l'écran sans jamais s'étaler sur une tablette.
export const Box = styled(Animated.View)((props) => ({
  width: '85%',
  maxWidth: 400,
  gap: props.theme.spacing.md,
  padding: props.theme.spacing.xl,
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.neutral.white,
  boxShadow: props.theme.shadows.lg,
}));
