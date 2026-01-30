import styled from '@emotion/styled';
import { TextProps } from './Text.types';
import { getColor } from '../../../utils/getColors';

export const Text = styled.span<Omit<TextProps, 'children'>>((props) => {
  const fontSizesMap = {
    xxl: props.theme.fontSizes.xxl,
    xl: props.theme.fontSizes.xl,
    lg: props.theme.fontSizes.lg,
    md: props.theme.fontSizes.md,
    sm: props.theme.fontSizes.sm,
    xs: props.theme.fontSizes.xs,
  };

  const fontSize = fontSizesMap[props.size ?? 'md'];

  return {
    fontSize,
    fontFamily: props.theme.fonts.regular,
    fontWeight: props.bold ? 500 : 400,
    color: getColor(props.appearance ?? 'black'),
  };
});
