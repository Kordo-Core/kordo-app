import styled from '@emotion/native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

export const Container = styled.View((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.primary.lightest,
}));

// Image de fond (topo) en plein écran, derrière tout le contenu
export const Background = styled(View)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  opacity: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

// Conteneur du sélecteur : figé sous le header, sous la carte (la carte le recouvre en remontant)
export const SegmentedWrapper = styled(View)((props) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 4,
  flexDirection: 'row',
  padding: props.theme.spacing.xxl,
}));

// ── Coquille partagée par les deux onglets ──

// Scroll fantôme plein écran : pilote scrollY, placé sous la card et le hero (zIndex 1)
export const GhostScroll = styled(Animated.ScrollView)({
  flex: 1,
  zIndex: 1,
});

// Cadre figé de la carte : monte par-dessus le sélecteur jusque sous le header puis reste
// en place (overflow clippe la liste). Pas de padding horizontal : les lignes de blocs vont
// bord à bord (bandeaux de swipe pleine largeur) ; le padding du contenu est porté par chaque
// ligne / en-tête (et par le contentContainer de la liste classement).
export const CardFrame = styled(Animated.View)((props) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 5,
  backgroundColor: props.theme.colors.neutral.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  overflow: 'hidden',
  boxShadow: props.theme.shadows.up,
}));
