import styled from '@emotion/native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

// Podium en fond (sous la carte) : remonte doucement puis dézoome/disparaît au scroll
export const PodiumContainer = styled(Animated.View)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 2,
}));

export const Podium = styled(View)((props) => ({
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  gap: props.theme.spacing.md,
  paddingInline: props.theme.spacing.lg,
}));

export const PodiumColumn = styled(View)((props) => ({
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: props.theme.spacing.md,
}));
