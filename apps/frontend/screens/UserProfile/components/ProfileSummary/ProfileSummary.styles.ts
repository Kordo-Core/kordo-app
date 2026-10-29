import styled from '@emotion/native';
import { KordoTheme } from 'kordo-ui';

// Avatar de profil : plus grand que les tokens d'avatar (usage dédié à l'en-tête de profil).
const AVATAR_SIZE = 84;

export const Container = styled.View((props) => ({
  gap: props.theme.spacing.lg,
}));

export const TopRow = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.xl,
}));

export const Avatar = styled.Image((props) => ({
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.neutral.gray.light,
}));

// Grille de stats 2 colonnes × 2 lignes à droite de l'avatar.
export const StatsGrid = styled.View((props) => ({
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  rowGap: props.theme.spacing.md,
  columnGap: props.theme.spacing.sm,
}));

// Chaque cellule est pressable : elle ouvre la liste correspondante (abonnés, activités…).
export const StatCell = styled.Pressable(() => ({
  flexBasis: '40%',
  flexGrow: 1,
  gap: 2,
}));

export const ActionsRow = styled.View((props) => ({
  flexDirection: 'row',
  gap: props.theme.spacing.sm,
}));

// Styles passés en `style`/`containerStyle` aux Button (regroupés ici pour éviter les styles inline).
export const buttonFlex = { flex: 1 } as const;
export const buttonFill = { width: '100%' as const };
// Objet de style et non composant stylé : il est passé en `containerStyle` à un Button.
// Le thème arrive donc en argument, comme `props.theme` pour un styled.
export const followingTint = (theme: KordoTheme) => ({
  backgroundColor: theme.colors.secondary.lighter,
  borderColor: theme.colors.secondary.base,
});
