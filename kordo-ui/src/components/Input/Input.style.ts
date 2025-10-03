import styled from '@emotion/native';
import { IconProps } from 'types/Icon';
import { Text } from '../Text/Text';

export const InputWrapper = styled.View((props) => ({
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

export const Input = styled.TextInput<{ icon?: IconProps }>((props) => ({
  flex: 1,
  paddingLeft: props.icon?.position === 'left' ? props.theme.spacing.sm : 0,
}));

export const ErrorText = styled(Text)({
  marginBottom: 4,
  marginLeft: 12,
});
