import styled from '@emotion/native';
import { TextProps } from './Text.types';
import { getColor } from '../../..//utils/getColors';

export const Text = styled.Text<Omit<TextProps, 'children'>>((props) => {
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
    fontFamily: props.bold ? props.theme.fonts.medium : props.theme.fonts.regular,
    color: getColor(props.appearance ?? 'black'),
  };
});
