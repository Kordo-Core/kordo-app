import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

// Carte des secteurs : placée comme le podium (sous la card), remonte/disparaît au scroll
export const MapContainer = styled(Animated.View)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 2,
  paddingInline: theme.spacing.lg,
}));

// En-tête de date dans la liste des blocs
export const SectionHeader = styled(View)({
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.xs,
  paddingInline: theme.spacing.lg,
});
