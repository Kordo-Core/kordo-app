import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';


export const Container = styled.View(() => ({
  flex: 1,
  backgroundColor: theme.colors.primary.lightest,
}));

// Scroll fantôme plein écran : pilote scrollY, placé sous la card et le hero (zIndex 1)
export const GhostScroll = styled(Animated.ScrollView)({
  flex: 1,
  zIndex: 1,
});

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
export const SegmentedWrapper = styled(View)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 4,
  flexDirection: 'row',
  padding: theme.spacing.xxl,
}));

// Podium en fond (sous la carte) : remonte doucement puis dézoome/disparaît au scroll
export const PodiumContainer = styled(Animated.View)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 2,
}));

export const Podium = styled(View)(() => ({
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  gap: theme.spacing.md,
  paddingInline: theme.spacing.lg,
}));

export const PodiumColumn = styled(View)(() => ({
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing.md,
}));

export const PodiumBar = styled(Animated.View)(() => ({
  width: '100%',
  backgroundColor: theme.colors.secondary.light,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));

// Carte des secteurs : placée comme le podium (sous la card), remonte/disparaît au scroll
export const MapContainer = styled(Animated.View)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 2,
  paddingInline: theme.spacing.lg,
}));

// Cadre figé de la carte : monte par-dessus le sélecteur jusque sous le header puis reste en place (overflow clippe la liste)
export const CardFrame = styled(Animated.View)({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 5,
  backgroundColor: theme.colors.neutral.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  overflow: 'hidden',
  // Padding horizontal seulement : la FlatList interne occupe toute la hauteur,
  // le padding vertical est dans son contentContainerStyle (sinon les lignes
  // se font couper avant le bas de la card)
  paddingInline: theme.spacing.lg,
  boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.05)',
});

// En-tête de date dans la liste des blocs
export const SectionHeader = styled(View)({
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.xs,
});
