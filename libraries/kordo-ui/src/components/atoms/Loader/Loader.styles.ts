import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import { LoaderProps } from './Loader.types';
import { Circle } from 'react-native-svg';
import { getColor } from '../../../utils/getColors';

export const ProgressBar = styled.View<{
  appearance: LoaderProps['appearance'];
}>((props) => ({
  height: 4,
  width: '100%',
  borderRadius: props.theme.borderRadius.md,
  backgroundColor: props.theme.colors[props.appearance ?? 'primary'].lighter,
}));

export const Bar = styled(Animated.View)<{
  appearance: LoaderProps['appearance'];
  infinite: boolean;
}>((props) => ({
  height: 4,
  width: props.infinite ? '20%' : '100%',
  borderRadius: props.theme.borderRadius.md,
  backgroundColor: getColor(props.appearance ?? 'primary'),
}));

// La rotation porte sur une vue englobante, non sur le `Svg` : le `setNativeProps` de
// react-native-svg refusionne son propre `style` dans le style du nœud DOM, et y recopierait
// l'objet interne que renvoie `useAnimatedStyle`.
export const SpinnerRotation = Animated.View;
export const AnimatedCircle = styled(Animated.createAnimatedComponent(Circle))<{
  appearance?: LoaderProps['appearance'];
}>((props) => ({
  backgroundColor: getColor(props.appearance ?? 'primary'),
}));
