import styled from '@emotion/native';
import { View } from 'react-native';

export const Screen = styled(View)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.background,
}));

// Photo plein cadre en haut, coins inférieurs arrondis (design D)
export const Hero = styled(View)({
  height: '58%',
  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 40,
  overflow: 'hidden',
});

export const HeroShade = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(19, 32, 27, 0.22)',
});

export const HeroTop = styled(View)({
  position: 'absolute',
  top: 64,
  left: 20,
});

export const LiveChip = styled(View)({
  position: 'absolute',
  left: 20,
  bottom: 22,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 999,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
});

export const LiveDot = styled(View)({
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#6FD3A0',
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
