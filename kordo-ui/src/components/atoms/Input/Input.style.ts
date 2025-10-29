import styled from '@emotion/native';
import { Text } from '../Text/Text';
import Animated from 'react-native-reanimated';
import { IconPosition } from '../Icon/Icon.types';

export const InputContainer = styled(Animated.View)((props) => ({
  borderWidth: 1,
  backgroundColor: props.theme.colors.neutral.white,
  paddingInline: props.theme.spacing.md,
  borderRadius: props.theme.borderRadius.md,
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 48,
  marginTop: 4,
}));

export const Input = styled.TextInput<{ iconPosition?: IconPosition }>((props) => ({
  flex: 1,
  paddingLeft: props.iconPosition === 'left' ? props.theme.spacing.sm : 0,
}));

export const ErrorText = styled(Text)({
  marginBottom: 4,
  marginLeft: 12,
});
