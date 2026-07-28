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

// Contenu sous le header : occupe toute la hauteur restante, sans scroll.
export const Content = styled.View(() => ({
  flex: 1,
}));

// Espacement vertical du contenu, proportionnel à la hauteur d'écran.
export const contentSpacing = (gap: number) => ({ gap, paddingBlock: gap });

// Padding/gap interne des sections, mis à l'échelle de la hauteur d'écran.
export const sectionSpacing = (padding: number, gap: number) => ({ padding, gap });

// Section élastique : absorbe l'espace restant pour que la page fasse pile 100%.
export const filler = {
  flex: 1,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
};

