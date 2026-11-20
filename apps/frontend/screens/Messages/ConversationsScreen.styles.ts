import styled from '@emotion/native';

// Carte d'une conversation : avatar, nom et heure, aperçu et pastille de non-lus
export const Row = styled.Pressable((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.md,
  paddingVertical: props.theme.spacing.md + 4,
  paddingHorizontal: 14,
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));

export const rowAvatar = { width: 50, height: 50, borderRadius: 6 };
export const onlineAvatar = { width: 56, height: 56, borderRadius: 6 };
export const requestAvatar = { width: 40, height: 40, borderRadius: 5 };

// Pastille verte « en ligne », cerclée du fond de page
export const OnlineDot = styled.View((props) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  // 14 px de pastille + 2 × 3 px de liseré (la maquette compte le liseré en plus)
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 3,
  borderColor: props.theme.colors.background,
  backgroundColor: '#1FD18A',
}));

// Bloc vert doux des demandes de message
export const Requests = styled.View((props) => ({
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.soft,
  overflow: 'hidden',
}));

export const RequestRow = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderTopWidth: 1,
  borderTopColor: 'rgba(127, 127, 127, 0.18)',
}));

// État vide
export const Empty = styled.View((props) => ({
  paddingTop: props.theme.spacing.xxl,
  alignItems: 'center',
}));

// --- Nouveau message ---

// Champ destinataire « À : »
export const ToField = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  height: 50,
  paddingHorizontal: props.theme.spacing.lg,
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));

export const ContactRow = styled.Pressable((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.md,
  paddingVertical: 14,
  paddingHorizontal: props.theme.spacing.md,
  borderRadius: 9,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));

export const contactAvatar = { width: 46, height: 46, borderRadius: 6 };

export const ContactOnlineDot = styled.View((props) => ({
  position: 'absolute',
  right: -2,
  bottom: -2,
  // 12 px de pastille + 2 × 2 px de liseré
  width: 16,
  height: 16,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: props.theme.colors.surface,
  backgroundColor: '#1FD18A',
}));

// Raccourci « écrire » à droite d'un contact
export const ContactAction = styled.View((props) => ({
  width: 36,
  height: 36,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.soft,
}));
