import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

// Podium en fond (sous la carte) : remonte doucement puis dézoome/disparaît au scroll
export const PodiumContainer = styled(Animated.View)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 2,
}));

export const Podium = styled(View)(() => ({
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  gap: theme.spacing.md,
  paddingInline: theme.spacing.lg,
}));

export const PodiumColumn = styled(View)(() => ({
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing.md,
}));
