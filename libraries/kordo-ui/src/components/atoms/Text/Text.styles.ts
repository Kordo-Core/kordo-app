import styled from '@emotion/native';
import { TextProps } from './Text.types';
import { getColor } from '../../../utils/getColors';

export const Text = styled.Text<Omit<TextProps, 'children'>>((props) => {
  const fontSizesMap = {
    xxl: props.theme.fontSizes.xxl,
    xl: props.theme.fontSizes.xl,
    lg: props.theme.fontSizes.lg,
    md: props.theme.fontSizes.md,
    sm: props.theme.fontSizes.sm,
    xs: props.theme.fontSizes.xs,
  };

  const size = props.size ?? 'md';
  const fontSize = typeof size === 'number' ? size : fontSizesMap[size];

  return {
    fontSize,
    fontFamily: props.extraBold
      ? props.theme.fonts.bold
      : props.bold
        ? props.theme.fonts.medium
        : props.theme.fonts.regular,
    color: getColor(props.theme, props.appearance ?? 'black'),
  };
});
