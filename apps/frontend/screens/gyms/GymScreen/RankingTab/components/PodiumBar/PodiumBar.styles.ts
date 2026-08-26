import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

export const PodiumBar = styled(Animated.View)((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.secondary.light,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));
