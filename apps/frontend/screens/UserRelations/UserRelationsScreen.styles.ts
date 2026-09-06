import styled from '@emotion/native';
import { KordoTheme } from 'kordo-ui';

// Barre de pivots collée sous le header, sur fond plein pour rester lisible sur le topo.
export const PivotsBar = styled.View((props) => ({
  backgroundColor: props.theme.colors.neutral.white,
  boxShadow: props.theme.shadows.md,
  paddingBlock: props.theme.spacing.md,
}));

// Zone d'onglet : surface blanche qui occupe toute la hauteur restante, même quand la liste
// est courte. Le scroll est géré par chaque onglet.
export const Content = styled.View((props) => ({
  flex: 1,
  marginTop: props.theme.spacing.sm,
  backgroundColor: props.theme.colors.neutral.white,
}));

// Espacement de la barre de recherche, fixée au-dessus de la liste. Il vit ici et pas dans
// `SearchToolbar` pour caler la barre sur `listContent` : même retrait horizontal, donc même
// alignement que les lignes qu'elle filtre. Pas de padding sur `Content`, l'onglet Activités
// affiche ses cartes bord à bord.
export const ToolbarBar = styled.View((props) => ({
  padding: props.theme.spacing.md,
}));

// Intitulé au-dessus d'une liste : "Tous les abonnements (56)".
export const Caption = styled.View((props) => ({
  paddingHorizontal: props.theme.spacing.md,
  paddingBottom: props.theme.spacing.sm,
}));

// État vide commun aux quatre onglets.
export const Empty = styled.View((props) => ({
  paddingTop: props.theme.spacing.xxl,
  alignItems: 'center',
}));

// Contenu des listes "plates" (utilisateurs, salles). `flexGrow` fait remplir la hauteur
// restante à la surface blanche même avec deux lignes, plutôt que de la laisser s'arrêter
// au dernier élément.
export const listContent = (theme: KordoTheme) => ({
  flexGrow: 1,
  paddingHorizontal: theme.spacing.md,
  paddingBottom: theme.spacing.xxl,
  gap: theme.spacing.sm,
});

// Contenu de la liste d'activités : cartes autonomes, séparées d'un fin liseré de fond.
export const cardsContent = (theme: KordoTheme) => ({
  flexGrow: 1,
  paddingBottom: theme.spacing.xxl,
  gap: theme.spacing.xs,
});

// La liste elle-même prend la hauteur restante sous la barre de recherche.
export const list = { flex: 1 };
