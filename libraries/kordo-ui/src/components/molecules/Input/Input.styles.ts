import styled from '@emotion/native';
import { Text } from '../../atoms/Text/Text';
import Animated from 'react-native-reanimated';

export const InputContainer = styled(Animated.View)<{ multiline?: boolean }>((props) => ({
  borderWidth: 1,
  backgroundColor: props.theme.colors.neutral.white,
  paddingInline: props.theme.spacing.md,
  borderRadius: props.theme.borderRadius.square,
  flexDirection: 'row',
  alignItems: props.multiline ? 'flex-start' : 'center',
  width: '100%',
  ...(props.multiline ? { minHeight: 96 } : { height: 42 }),
  // marginTop: 4,
}));

export const Input = styled.TextInput<{ hasLeftIcon?: boolean }>((props) => ({
  flex: 1,
  paddingLeft: props.hasLeftIcon ? props.theme.spacing.sm : 0,
  // Un champ de saisie n'hérite pas de la typographie : sans ces trois règles il rend avec
  // la police du système (natif) ou celle du navigateur (web), et pas avec Outfit.
  fontFamily: props.theme.fonts.regular,
  fontSize: props.theme.fontSizes.md,
  color: props.theme.colors.neutral.black,
}));

export const ErrorText = styled(Text)({
  marginBottom: 2,
  marginTop: 2,
  marginLeft: 0,
});
