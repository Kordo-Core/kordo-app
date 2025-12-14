import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

export const Header = styled(Animated.View)((props) => ({
  zIndex: 2,
  paddingVertical: 4,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: props.theme.colors.neutral.white,
  shadowColor: '#000',
}));
