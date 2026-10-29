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

export const Tab = styled.TouchableOpacity<{ isAction?: boolean }>({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

// `left: 0` est explicite : sans lui, l'origine d'un enfant absolu diffère entre Yoga (bord
// de la barre) et le web (début de la zone de contenu, padding compris), et l'indicateur se
// retrouvait décalé d'un padding sur le web.
export const highlightedBar = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: 4,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.primary.base,
}));
