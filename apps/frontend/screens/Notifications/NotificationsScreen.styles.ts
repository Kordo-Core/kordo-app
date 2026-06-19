import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { View } from 'react-native';

export const Container = styled.View(() => ({
  flex: 1,
  backgroundColor: theme.colors.primary.lightest,
}));

// Image de fond (topo) en plein écran, derrière tout le contenu — identique à Home / Gym
export const Background = styled(View)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  opacity: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));
