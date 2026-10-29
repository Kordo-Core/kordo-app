import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  paddingHorizontal: props.theme.spacing.md,
  position: 'relative',
}));

// Trait de sélection : positionné en absolu dans le conteneur, qui est en `position: relative`
// et sert donc de repère aux `x` relevés sur chaque pivot.
//
// `left` et `width` sont laissés au style animé — ils changent à chaque frame et n'ont rien à
// faire ici. La largeur vaut 0 tant qu'aucune mesure n'est arrivée, ce qui rend le trait
// invisible sans avoir à le démonter.
export const Line = styled(Animated.View)((props) => ({
  position: 'absolute',
  bottom: -12,
  height: 3,
  backgroundColor: props.theme.colors.primary.base,
  borderRadius: props.theme.borderRadius.rounded,
}));
