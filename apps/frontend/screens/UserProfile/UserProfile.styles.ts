import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { View } from 'react-native';

export const Container = styled.View(() => ({
  flex: 1,
  backgroundColor: theme.colors.primary.lightest,
}));

// Image de fond (topo) en plein écran, derrière tout le contenu — identique à Home / Notifications
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

// Séparateur fin entre les lignes de la liste de navigation.
export const Separator = styled(View)(() => ({
  height: 1,
  backgroundColor: theme.colors.neutral.gray.light,
}));

// Le composant Card a `alignSelf: flex-start` : sans largeur explicite il se rétracte au contenu.
export const cardFull = { width: '100%' as const };
