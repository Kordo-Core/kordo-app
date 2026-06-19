import styled from '@emotion/native';
import { theme } from 'kordo-ui';

// Avatar de profil : plus grand que les tokens d'avatar (usage dédié à l'en-tête de profil).
const AVATAR_SIZE = 84;

export const Container = styled.View(() => ({
  gap: theme.spacing.lg,
}));

export const TopRow = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.xl,
}));

export const Avatar = styled.Image(() => ({
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: theme.borderRadius.rounded,
  backgroundColor: theme.colors.neutral.gray.light,
}));

// Grille de stats 2 colonnes × 2 lignes à droite de l'avatar.
export const StatsGrid = styled.View(() => ({
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  rowGap: theme.spacing.md,
  columnGap: theme.spacing.sm,
}));

export const StatCell = styled.View(() => ({
  flexBasis: '40%',
  flexGrow: 1,
  gap: 2,
}));

export const ActionsRow = styled.View(() => ({
  flexDirection: 'row',
  gap: theme.spacing.sm,
}));

// Styles passés en `style`/`containerStyle` aux Button (regroupés ici pour éviter les styles inline).
export const buttonFlex = { flex: 1 } as const;
export const buttonFill = { width: '100%' as const };
export const followingTint = {
  backgroundColor: theme.colors.secondary.lighter,
  borderColor: theme.colors.secondary.base,
};
