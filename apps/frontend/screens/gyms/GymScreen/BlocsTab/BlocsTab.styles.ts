import styled from '@emotion/native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

// Carte des secteurs : placée comme le podium (sous la card), remonte/disparaît au scroll
export const MapContainer = styled(Animated.View)((props) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 2,
  paddingInline: props.theme.spacing.lg,
}));

// En-tête de date dans la liste des blocs
export const SectionHeader = styled(View)((props) => ({
  paddingTop: props.theme.spacing.md,
  paddingBottom: props.theme.spacing.xs,
  paddingInline: props.theme.spacing.lg,
}));
