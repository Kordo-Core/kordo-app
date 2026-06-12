import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import Animated from 'react-native-reanimated';

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
