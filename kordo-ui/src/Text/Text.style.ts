import styled from '@emotion/native';
import { TextProps } from './Text.types';

export const Text = styled.Text<{
  size: TextProps['size'];
  bold?: boolean;
  appearance: TextProps['appearance'];
}>`
  font-size: ${(props) => {
    if (!props.size) return props.theme.fontSizes.md;
    switch (props.size) {
      case 'xxl':
        return props.theme.fontSizes.xxl;
      case 'xl':
        return props.theme.fontSizes.xl;
      case 'lg':
        return props.theme.fontSizes.lg;
      case 'md':
        return props.theme.fontSizes.md;
      case 'sm':
        return props.theme.fontSizes.sm;
      case 'xs':
        return props.theme.fontSizes.xs;
    }
  }};
  font-family: ${(props) => (props.bold ? props.theme.fonts.medium : props.theme.fonts.regular)};
  color: ${(props) => {
    switch (props.appearance) {
      case 'primary':
        return props.theme.colors.primary.color500;
      case 'secondary':
        return props.theme.colors.secondary.color500;
      case 'white':
        return props.theme.colors.neutral.white;
      case 'grey':
        return props.theme.colors.neutral.grey;
      default:
        return props.theme.colors.neutral.black;
    }
  }};
`;
