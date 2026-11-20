import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

/** Côté des pastilles carrées (onglet actif, bouton « + ») */
export const PILL_SIZE = 48;
/** Hauteur de la barre flottante (maquette : 66 px) */
export const BAR_HEIGHT = 66;
/** Écart minimal entre la barre et le bas de l'écran (maquette : 24 px), zone sûre comprise */
export const FLOAT_BOTTOM = 24;
/** Écart entre la barre et les bords gauche et droit de l'écran */
export const FLOAT_SIDE = 14;

// Barre flottante (maquette « sport ») : posée à 14 px des bords et 24 px du bas, coins
// arrondis et ombre portée. En sombre, un filet de 1 px la détache du fond.
export const Container = styled.View((props) => ({
  position: 'absolute',
  left: FLOAT_SIDE,
  right: FLOAT_SIDE,
  borderRadius: props.theme.borderRadius.card,
  backgroundColor: props.theme.colors.navBar,
  borderWidth: props.theme.mode === 'dark' ? 1 : 0,
  borderColor: props.theme.colors.navBarBorder,
  boxShadow: '0px 14px 30px rgba(0, 0, 0, 0.28)',
}));

// Rangée des onglets : seule la hauteur utile, la marge basse est ajoutée par le conteneur.
export const Row = styled.View({
  height: BAR_HEIGHT,
  flexDirection: 'row',
  alignItems: 'center',
});

export const Tab = styled.Pressable({
  flex: 1,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});

// Zone de l'icône : les deux calques (inactif / actif) s'y superposent.
export const IconSlot = styled.View({
  width: PILL_SIZE,
  height: PILL_SIZE,
});

export const layerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
} as const;

// Bouton « + » : carré orange incliné, comme un dossard.
export const AccentPill = styled.View((props) => ({
  width: PILL_SIZE + 2,
  height: PILL_SIZE + 2,
  borderRadius: 7,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.primary.base,
  boxShadow: '0px 6px 16px rgba(255, 122, 26, 0.35)',
  transform: [{ skewX: '-8deg' }],
}));

// Carré vert qui glisse sous l'onglet actif, souligné d'un trait néon. `left: 0` est
// explicite : sans lui, l'origine d'un enfant absolu diffère entre Yoga et le web.
export const highlightedBar = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: (BAR_HEIGHT - PILL_SIZE) / 2,
  left: 0,
  width: PILL_SIZE,
  height: PILL_SIZE,
  borderRadius: 7,
  backgroundColor: props.theme.colors.navBarActive,
  boxShadow: `inset 0px -3px 0px ${props.theme.colors.navBarActiveLine}`,
}));
