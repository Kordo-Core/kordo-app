import styled from '@emotion/native';
import { KordoTheme } from 'kordo-ui';

// 96 px de photo + 2 × 5 px de liseré (la maquette compte le liseré en plus)
const AVATAR_SIZE = 106;

export const Container = styled.View((props) => ({
  gap: props.theme.spacing.md + 2,
}));

// Avatar carré arrondi, bordé de la couleur de fond pour se détacher de la couverture
export const Avatar = styled.Image((props) => ({
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: 12,
  borderWidth: 5,
  borderColor: props.theme.colors.background,
  backgroundColor: props.theme.colors.surfaceAlt,
}));

// Compteurs alignés dans une carte ; chacun ouvre la liste correspondante
export const StatsCard = styled.View((props) => ({
  flexDirection: 'row',
  paddingVertical: props.theme.spacing.md + 2,
  paddingHorizontal: props.theme.spacing.xs,
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.surface,
  boxShadow: props.theme.shadows.sm,
}));

export const StatCell = styled.Pressable(() => ({
  flex: 1,
  alignItems: 'center',
  gap: 2,
}));

export const ActionsRow = styled.View((props) => ({
  flexDirection: 'row',
  gap: props.theme.spacing.sm,
}));

export const buttonFlex = { flex: 1 } as const;

// Objet de style passé en `containerStyle` à un Button : le thème arrive en argument.
export const followingTint = (theme: KordoTheme) => ({
  backgroundColor: theme.colors.soft,
  borderWidth: 1.5,
  borderColor: theme.colors.secondary.base,
  boxShadow: 'none',
});

// Boutons d'action du profil : 46 px, arrondi 7 (maquette « sport »)
export const actionButton = { height: 46, borderRadius: 7 } as const;
