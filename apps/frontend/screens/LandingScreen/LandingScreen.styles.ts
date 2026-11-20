import styled from '@emotion/native';
import { View } from 'react-native';

export const Screen = styled(View)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.background,
}));

// Photo plein cadre en haut, coins inférieurs arrondis : 500 px sur un écran de 844 px
export const Hero = styled(View)({
  height: '59.24%',
  borderBottomLeftRadius: 17,
  borderBottomRightRadius: 17,
  overflow: 'hidden',
});

export const HeroTop = styled(View)({
  position: 'absolute',
  top: 70,
  left: 20,
});

export const LiveChip = styled(View)({
  position: 'absolute',
  left: 20,
  bottom: 22,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  paddingVertical: 8,
  paddingLeft: 8,
  paddingRight: 14,
  borderRadius: 999,
  backgroundColor: 'rgba(255, 255, 255, 0.18)',
  // Flou d'arrière-plan de la maquette (web ; ignoré en natif)
  ...({ backdropFilter: 'blur(14px)' } as object),
});

export const LiveDot = styled(View)({
  width: 7,
  height: 7,
  borderRadius: 4,
  backgroundColor: '#3DFFA8',
});

export const Bottom = styled(View)((props) => ({
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 26,
  paddingBottom: 40,
  gap: props.theme.spacing.lg,
}));

export const Dot = styled(View)<{ active: boolean }>((props) => ({
  width: props.active ? 28 : 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: props.active ? props.theme.colors.secondary.base : props.theme.colors.border,
}));

export const Actions = styled(View)((props) => ({
  marginTop: 'auto',
  flexDirection: 'row',
  gap: props.theme.spacing.sm + 2,
}));
