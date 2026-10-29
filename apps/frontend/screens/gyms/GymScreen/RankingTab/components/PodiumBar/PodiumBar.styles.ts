import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

// Marche du podium : orange pour la première place, voile clair pour les autres (posé sur
// le dégradé vert du hero).
export const PodiumBar = styled(Animated.View)<{ first?: boolean }>((props) => ({
  width: '100%',
  backgroundColor: props.first ? props.theme.colors.primary.base : 'rgba(255, 255, 255, 0.16)',
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));
