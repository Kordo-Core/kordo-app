import styled from '@emotion/native';
import { KordoTheme } from 'kordo-ui';

// Rangée d'onglets en pastilles, sous l'en-tête
export const PivotsBar = styled.View((props) => ({
  paddingBottom: props.theme.spacing.sm,
}));

export const PivotChip = styled.View<{ active: boolean }>((props) => ({
  height: 40,
  paddingHorizontal: props.theme.spacing.md + 2,
  borderRadius: props.theme.borderRadius.square,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  backgroundColor: props.active ? props.theme.colors.text : props.theme.colors.surface,
  boxShadow: props.active ? undefined : props.theme.shadows.sm,
}));

export const PivotCount = styled.View<{ active: boolean }>((props) => ({
  height: 20,
  minWidth: 20,
  paddingHorizontal: 6,
  borderRadius: 7,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.active ? 'rgba(127, 127, 127, 0.3)' : props.theme.colors.surfaceAlt,
}));

// Zone d'onglet : occupe toute la hauteur restante. Le scroll est géré par chaque onglet.
export const Content = styled.View(() => ({
  flex: 1,
}));

// Espacement de la barre de recherche, calé sur le retrait des lignes de la liste.
export const ToolbarBar = styled.View((props) => ({
  paddingHorizontal: props.theme.spacing.md + 2,
  paddingTop: props.theme.spacing.xs,
  paddingBottom: props.theme.spacing.md,
}));

// Intitulé au-dessus d'une liste : "Tous les abonnés (56)".
export const Caption = styled.View((props) => ({
  paddingHorizontal: props.theme.spacing.lg + 2,
  paddingBottom: props.theme.spacing.sm,
}));

// État vide commun aux quatre onglets.
export const Empty = styled.View((props) => ({
  paddingTop: props.theme.spacing.xxl,
  alignItems: 'center',
}));

// Contenu des listes de cartes (utilisateurs, salles)
export const listContent = (theme: KordoTheme) => ({
  flexGrow: 1,
  paddingHorizontal: theme.spacing.md + 2,
  paddingBottom: theme.spacing.xxl,
  gap: theme.spacing.sm,
});

// Contenu de la liste d'activités : les cartes portent déjà leur marge latérale.
export const cardsContent = (theme: KordoTheme) => ({
  flexGrow: 1,
  paddingBottom: theme.spacing.xxl,
  gap: theme.spacing.md,
});

// La liste elle-même prend la hauteur restante sous la barre de recherche.
export const list = { flex: 1 };
