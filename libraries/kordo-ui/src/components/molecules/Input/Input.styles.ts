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
}));

export const ErrorText = styled(Text)({
  marginBottom: 2,
  marginTop: 2,
  marginLeft: 0,
});
