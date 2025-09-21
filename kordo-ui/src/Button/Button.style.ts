import styled from '@emotion/native';
import { ButtonProps } from './Button.types';
import { FontAwesome } from '@expo/vector-icons';
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

export const ButtonContainer = styled(Animated.createAnimatedComponent(Pressable))<{
  appearance: ButtonProps['appearance'];
  inverted?: boolean;
  borderRadius: ButtonProps['borderRadius'];
  size?: ButtonProps['size'];
  width?: ButtonProps['width'];
  iconName?: ButtonProps['iconName'];
  title?: ButtonProps['title'];
}>`
  background-color: ${(props) =>
    props.inverted ? props.theme.colors.neutral.white : getColor(props.appearance, props.theme)};
  border: ${(props) =>
    props.inverted ? `1px solid ${getColor(props.appearance, props.theme)}` : 'none'};
  border-radius: ${(props) =>
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.md};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  height: ${(props) => (props.size === 'lg' ? '70px' : '40px')};
  width: ${(props) =>
    props.iconName && !props.title
      ? props.size === 'lg'
        ? '70px'
        : '40px'
      : props.width === 'full'
        ? '100%'
        : 'min-content'};
  padding-inline: ${(props) =>
    props.iconName && !props.title
      ? '0'
      : props.size === 'lg'
        ? props.theme.spacing.xlg
        : props.theme.spacing.md};
`;

export const ButtonText = styled.Text<{
  appearance: ButtonProps['appearance'];
  size?: ButtonProps['size'];
  inverted?: boolean;
}>`
  color: ${(props) =>
    props.inverted ? getColor(props.appearance, props.theme) : props.theme.colors.neutral.white};
  font-size: ${(props) =>
    props.size === 'lg' ? props.theme.fontSizes.lg : props.theme.fontSizes.md};
  font-family: ${(props) =>
    props.size === 'lg' ? props.theme.fonts.medium : props.theme.fonts.regular};
`;

export const Icon = styled(FontAwesome)<{
  appearance: ButtonProps['appearance'];
  inverted?: boolean;
}>`
  color: ${(props) =>
    props.inverted ? getColor(props.appearance, props.theme) : props.theme.colors.neutral.white};
`;
