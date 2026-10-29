import styled from '@emotion/native';
import { TextProps } from './Text.types';
import { getColor } from '../../../utils/getColors';
import { KordoTheme } from '../../../theme';

// Couleur d'un texte. Les teintes de marque sont trop claires pour du texte sur fond clair :
// un texte « primary » prend l'orange foncé lisible, un texte « secondary » le vert du thème
// (plus clair en mode sombre). Les fonds, eux, continuent d'utiliser `getColor`.
const textColor = (theme: KordoTheme, appearance: TextProps['appearance']) => {
  if (appearance === 'primary') return theme.colors.accentText;
  if (appearance === 'secondary') return theme.colors.softText;
  return getColor(theme, appearance ?? 'black');
};

export const Text = styled.Text<Omit<TextProps, 'children'>>((props) => {
  const fontSizesMap = {
    xxl: props.theme.fontSizes.xxl,
    xl: props.theme.fontSizes.xl,
    lg: props.theme.fontSizes.lg,
    md: props.theme.fontSizes.md,
    sm: props.theme.fontSizes.sm,
    xs: props.theme.fontSizes.xs,
  };

  if (props.variant === 'display') {
    const size = props.size ?? 'lg';
    const fontSize = typeof size === 'number' ? size : props.theme.displaySizes[size];
    return {
      fontSize,
      lineHeight: Math.round(fontSize * 0.98),
      letterSpacing: -fontSize * 0.035,
      textTransform: 'uppercase',
      fontFamily: props.theme.fonts.display,
      color: textColor(props.theme, props.appearance),
    };
  }

  if (props.variant === 'eyebrow') {
    const size = props.size ?? 'xs';
    return {
      fontSize: typeof size === 'number' ? size : fontSizesMap[size],
      letterSpacing: 1.6,
      textTransform: 'uppercase',
      fontFamily: props.theme.fonts.extraBold,
      color: textColor(props.theme, props.appearance ?? 'gray'),
    };
  }

  const size = props.size ?? 'md';
  const fontSize = typeof size === 'number' ? size : fontSizesMap[size];

  return {
    fontSize,
    fontFamily: props.extraBold
      ? props.theme.fonts.extraBold
      : props.bold
        ? props.theme.fonts.bold
        : props.theme.fonts.medium,
    color: textColor(props.theme, props.appearance),
  };
});
