import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

/** Côté des pastilles carrées (onglet actif, bouton « + ») */
export const PILL_SIZE = 48;

// Barre flottante foncée (design D) : posée au-dessus du contenu, à 14 px des bords.
export const Container = styled.View((props) => ({
  position: 'absolute',
  bottom: 24,
  left: 14,
  right: 14,
  height: 66,
  paddingHorizontal: 8,
  borderRadius: 22,
  backgroundColor: props.theme.colors.navBar,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  boxShadow: '0px 14px 30px rgba(0, 0, 0, 0.28)',
}));

export const Tab = styled.TouchableOpacity({
  flex: 1,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});

// Fond orange fixe du bouton « + »
export const AccentPill = styled.View((props) => ({
  width: PILL_SIZE + 2,
  height: PILL_SIZE + 2,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.primary.base,
  boxShadow: '0px 6px 16px rgba(243, 178, 78, 0.35)',
}));

// Carré vert qui glisse sous l'onglet actif. `left: 0` est explicite : sans lui, l'origine
// d'un enfant absolu diffère entre Yoga (bord de la barre) et le web (zone de contenu).
export const highlightedBar = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: (66 - PILL_SIZE) / 2,
  left: 0,
  width: PILL_SIZE,
  height: PILL_SIZE,
  borderRadius: 16,
  backgroundColor: props.theme.colors.secondary.base,
}));
