import styled from '@emotion/native';
import Animated from 'react-native-reanimated';
import { theme } from 'theme';

export const Container = styled.View(({ theme }) => ({
  position: 'absolute',
  bottom: 20,
  width: '92%',
  left: '4%',
  height: 72,
  paddingHorizontal: 16,
  borderRadius: theme.borderRadius.rounded,
  backgroundColor: theme.colors.neutral.white,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  // iOS shadow
  shadowColor: theme.colors.neutral.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,

  // Android shadow
  elevation: 3,
}));

export const Tab = styled.TouchableOpacity<{ isAction?: boolean }>(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const highlightedBar = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  height: 4,
  borderRadius: theme.borderRadius.rounded,
  backgroundColor: theme.colors.primary.base,
}));
