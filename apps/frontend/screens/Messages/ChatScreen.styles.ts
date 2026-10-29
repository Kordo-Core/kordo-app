import styled from '@emotion/native';
import { KordoTheme } from 'kordo-ui';

// Entête : avatar et nom côte à côte, la présence sous le nom. Cliquable, comme partout
// ailleurs où un nom d'utilisateur est affiché : elle mène au profil du contact.
export const HeaderIdentity = styled.Pressable((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.sm,
}));

export const HeaderAvatar = styled.Image((props) => ({
  width: 42,
  height: 42,
  borderRadius: 14,
}));

export const Presence = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.xs,
}));

// Point de présence, vert quand le contact est connecté, gris sinon.
export const PresenceDot = styled.View<{ online: boolean }>((props) => ({
  width: 8,
  height: 8,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.online ? '#3BB273' : props.theme.colors.textMuted,
}));

// Contenu de la liste de messages : l'espace vertical sépare les bulles.
export const messagesContent = (theme: KordoTheme) => ({
  flexGrow: 1,
  padding: theme.spacing.md + 2,
  gap: theme.spacing.sm + 2,
});

// Miniature d'un média, dans une bulle qui a retiré son rembourrage.
export const Media = styled.Image({
  width: 220,
  height: 275,
});

// Badge de lecture posé au centre d'une vidéo — inerte tant que la lecture n'est pas gérée.
export const PlayBadge = styled.View((props) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.overlay.dark,
}));

// Barre du bas quand la conversation n'est pas encore acceptée : elle remplace la saisie.
export const RequestBar = styled.View((props) => ({
  gap: props.theme.spacing.md,
  margin: props.theme.spacing.md,
  padding: props.theme.spacing.lg,
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.soft,
}));

export const RequestActions = styled.View((props) => ({
  flexDirection: 'row',
  gap: props.theme.spacing.sm,
}));

export const Empty = styled.View((props) => ({
  flex: 1,
  paddingTop: props.theme.spacing.xxl,
  alignItems: 'center',
}));
