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
  borderRadius: 6,
}));

export const Presence = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.xs,
}));

// Point de présence posé sur l'avatar (maquette) : 12 px + liseré de 2 px couleur du fond
export const PresenceDot = styled.View<{ online: boolean }>((props) => ({
  position: 'absolute',
  right: -1,
  bottom: -1,
  width: 16,
  height: 16,
  borderWidth: 2,
  borderColor: props.theme.colors.background,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.online ? '#1FD18A' : props.theme.colors.textMuted,
}));

// Contenu de la liste de messages : l'espace vertical sépare les bulles.
export const messagesContent = (theme: KordoTheme) => ({
  flexGrow: 1,
  padding: 14,
  gap: 6,
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

// Bouton d'appel de l'entête (vert doux, comme les IconButton `soft`)
export const CallButton = styled.Pressable((props) => ({
  width: 44,
  height: 44,
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.soft,
}));
