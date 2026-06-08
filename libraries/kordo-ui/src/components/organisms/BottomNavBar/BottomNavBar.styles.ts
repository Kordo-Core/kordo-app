import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View((props) => ({
  position: 'absolute',
  bottom: 20,
  width: '92%',
  left: '4%',
  height: 72,
  paddingHorizontal: 16,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.neutral.white,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  // iOS shadow
  shadowColor: props.theme.colors.neutral.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,

  // Android shadow
  elevation: 3,
}));

export const Tab = styled.TouchableOpacity<{ isAction?: boolean }>((props) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const highlightedBar = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: 0,
  height: 4,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.primary.base,
}));
