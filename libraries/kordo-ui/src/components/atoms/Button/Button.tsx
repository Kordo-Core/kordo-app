import React from 'react';
import { ButtonProps } from './Button.types';
import * as Styled from './Button.styles';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';
import { Icon } from '../Icon/Icon';
import { getColor, getOnColor } from '../../../utils/getColors';
import { getToneColors, isSurfaceTone } from '../../../utils/surfaceTones';
import { CENTERED_TEXT } from '../../../utils/centeredText';

// Composant bouton universel (web + native) avec animation de rebond au clic
export const Button: React.FC<ButtonProps> = (props) => {
  // Accès au thème pour déterminer dynamiquement les tailles d'icônes
  const theme = useTheme();
  const appearance = props.appearance ?? 'primary';
  // Couleur du contenu : couleur de l'apparence en mode inversé, couleur « sur » sinon
  // (encre foncée sur l'orange, blanc sur le vert).
  const contentColor = isSurfaceTone(appearance)
    ? getToneColors(theme, appearance).content
    : props.inverted
      ? appearance === 'black'
        ? theme.colors.text
        : appearance === 'secondary'
          ? theme.colors.softText
          : getColor(theme, appearance)
      : getOnColor(theme, appearance);

  // Icône optionnelle, à gauche ou à droite du libellé, à la couleur du contenu
  const iconPosition = props.iconPosition ?? 'left';
  const icon = props.icon && (
    <Icon
      name={props.icon.name}
      size={props.icon.size ?? 'md'}
      color={props.icon.color ?? contentColor}
    />
  );

  // Garde qui empêche le déclenchement de l'action si le bouton est désactivé
  const handlePress = () => {
    if (!props.disabled && props.onPress) {
      props.onPress();
    }
  };

  return (
    <Bounce
      onPress={handlePress}
      disabled={props.disabled}
      style={[props.fullWidth ? { width: '100%' } : undefined, props.style]}
    >
      <Styled.ButtonContainer {...props} disabled={props.disabled} style={props.containerStyle}>
        {iconPosition === 'left' && icon}
        {/* Libellé toujours en extra-gras, dans la couleur de contenu */}
        {props.title ? (
          <Text
            size={
              props.textSize ?? (props.size === 'lg' ? 'md' : props.size === 'sm' ? 'xs' : 'sm')
            }
            extraBold
            style={[{ color: contentColor }, CENTERED_TEXT]}
          >
            {props.title}
          </Text>
        ) : null}
        {iconPosition === 'right' && icon}
      </Styled.ButtonContainer>
    </Bounce>
  );
};
