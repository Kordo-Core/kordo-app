import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { View } from 'react-native';

export const Container = styled.View(() => ({
  flex: 1,
  backgroundColor: theme.colors.primary.lightest,
}));

// Image de fond (topo) en plein écran, derrière tout le contenu — identique au profil.
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

// Barre de pivots collée sous le header, sur fond plein pour rester lisible sur le topo.
export const PivotsBar = styled.View(() => ({
  backgroundColor: theme.colors.neutral.white,
  paddingBlock: theme.spacing.md,
}));

// Zone d'onglet : surface blanche qui occupe toute la hauteur restante, même quand la liste
// est courte. Le scroll est géré par chaque onglet.
export const Content = styled.View(() => ({
  flex: 1,
  marginTop: theme.spacing.sm,
  backgroundColor: theme.colors.neutral.white,
}));

// Intitulé au-dessus d'une liste : "Tous les abonnements (56)".
export const Caption = styled.View(() => ({
  paddingHorizontal: theme.spacing.md,
  paddingBottom: theme.spacing.sm,
}));

// État vide commun aux quatre onglets.
export const Empty = styled.View(() => ({
  paddingTop: theme.spacing.xxl,
  alignItems: 'center',
}));

// Contenu des listes "plates" (utilisateurs, salles). `flexGrow` fait remplir la hauteur
// restante à la surface blanche même avec deux lignes, plutôt que de la laisser s'arrêter
// au dernier élément.
export const listContent = {
  flexGrow: 1,
  paddingHorizontal: theme.spacing.md,
  paddingBottom: theme.spacing.xxl,
  gap: theme.spacing.sm,
};

// Contenu de la liste d'activités : cartes autonomes, séparées d'un fin liseré de fond.
export const cardsContent = {
  flexGrow: 1,
  paddingBottom: theme.spacing.xxl,
  gap: theme.spacing.xs,
};

// La liste elle-même prend la hauteur restante sous la barre de recherche.
export const list = { flex: 1 };
