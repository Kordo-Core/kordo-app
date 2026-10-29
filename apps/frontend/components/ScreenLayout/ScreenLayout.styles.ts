import styled from '@emotion/native';
import { View } from 'react-native';

export const Container = styled.View((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.primary.lightest,
}));

// Image de fond (topo) en plein écran, derrière tout le contenu.
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
