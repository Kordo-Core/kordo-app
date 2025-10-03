import styled from '@emotion/native';
import { ButtonProps } from './Button.types';
import { FontAwesome as FontAwesome6 } from '@expo/vector-icons';
import { KordoTheme } from 'theme';
import { Pressable, Animated } from 'react-native';

const getColor = (appearance: ButtonProps['appearance'], theme: KordoTheme): string => {
  switch (appearance) {
    case 'primary':
      return theme.colors.primary.color500;
    case 'secondary':
      return theme.colors.secondary.color500;
    case 'black':
      return theme.colors.neutral.black;
    default:
      return theme.colors.neutral.black;
  }
};

export const ButtonContainer = styled.View<Exclude<ButtonProps, 'onClick'>>((props) => ({
  backgroundColor: props.inverted
    ? props.theme.colors.neutral.white
    : getColor(props.appearance, props.theme),

  borderWidth: props.inverted ? 1 : 0,
  borderColor: props.inverted ? getColor(props.appearance, props.theme) : 'transparent',

  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.md,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: props.theme.spacing.sm,

  height: props.size === 'lg' ? 60 : 36,

  width:
    props.icon && !props.title
      ? props.size === 'lg'
        ? 70
        : 40
      : props.width === 'full'
        ? '100%'
        : undefined,

  paddingHorizontal:
    props.icon && !props.title
      ? 0
      : props.size === 'lg'
        ? props.theme.spacing.xxl
        : props.theme.spacing.md,
}));

export const Icon = styled(FontAwesome6)<{
  appearance: ButtonProps['appearance'];
  inverted?: boolean;
}>((props) => ({
  color: props.inverted
    ? getColor(props.appearance, props.theme)
    : props.theme.colors.neutral.white,
}));
