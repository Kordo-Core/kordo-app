import styled from '@emotion/styled';
import { Text } from '../../atoms/Text/Text';
import { IconPosition } from '../../atoms/Icon/Icon.types';

export const InputContainer = styled.div<{ borderColor?: string }>((props) => ({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: props.borderColor || props.theme.colors.neutral.gray.light,
  backgroundColor: props.theme.colors.neutral.white,
  paddingLeft: props.theme.spacing.md,
  paddingRight: props.theme.spacing.md,
  borderRadius: props.theme.borderRadius.square,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 48,
  marginTop: 4,
  boxSizing: 'border-box',
}));

export const Input = styled.input<{ iconPosition?: IconPosition }>((props) => ({
  flex: 1,
  height: '100%',
  paddingLeft: props.iconPosition === 'left' ? props.theme.spacing.sm : 0,
  border: 'none',
  outline: 'none',
  fontSize: props.theme.fontSizes.md,
  fontFamily: props.theme.fonts.regular,
  backgroundColor: 'transparent',
  color: props.theme.colors.neutral.black,
  '&::placeholder': {
    color: props.theme.colors.neutral.gray.base,
  },
}));

export const ErrorText = styled(Text)({
  marginBottom: 4,
  marginLeft: 12,
});
