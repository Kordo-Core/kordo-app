import styled from '@emotion/native';
import { TextProps } from './Text.types';

export const Text = styled.Text<Omit<TextProps, 'children'>>((props) => {
  const fontSizesMap = {
    xxl: props.theme.fontSizes.xxl,
    xl: props.theme.fontSizes.xl,
    lg: props.theme.fontSizes.lg,
    md: props.theme.fontSizes.md,
    sm: props.theme.fontSizes.sm,
    xs: props.theme.fontSizes.xs,
  };

  const colorsMap = {
    primary: props.theme.colors.primary.color500,
    secondary: props.theme.colors.secondary.color500,
    white: props.theme.colors.neutral.white,
    grey: props.theme.colors.neutral.grey,
    black: props.theme.colors.neutral.black,
    error: props.theme.colors.error,
  };

  const fontSize = fontSizesMap[props.size ?? 'md'];
  const color = colorsMap[props.appearance ?? 'black'];

  return {
    fontSize,
    fontFamily: props.bold ? props.theme.fonts.medium : props.theme.fonts.regular,
    color,
  };
});
