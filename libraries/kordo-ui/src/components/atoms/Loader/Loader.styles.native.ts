import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import { LoaderProps } from './Loader.types';
import Svg, { Circle } from 'react-native-svg';
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

export const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export const AnimatedCircle = styled(Animated.createAnimatedComponent(Circle))<{
  appearance?: LoaderProps['appearance'];
}>((props) => ({
  backgroundColor: getColor(props.appearance ?? 'primary'),
}));
