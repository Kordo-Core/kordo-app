import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

export const CustomSafeAreaView = styled.View((props) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 3,
  backgroundColor: props.theme.colors.neutral.white,
}));

export const Header = styled(Animated.View)((props) => ({
  zIndex: 2,
  width: '100%',
  backgroundColor: props.theme.colors.neutral.white,
}));

export const Row = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 8,
  gap: 16,
});

export const ChildrenWrapper = styled.View({
  flex: 1,
});

export const ChildrenGhost = styled.View({
  flex: 1,
  opacity: 0,
});

export const ChildrenOverlay = styled.View({
  position: 'absolute',
  left: 0,
  right: 0,
  alignItems: 'center',
});
