import React from 'react';
import { ButtonProps } from './Button.types';
import * as Styled from './Button.styles';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';
import { Icon } from '../Icon/Icon';
import { getColor, getOnColor } from '../../../utils/getColors';

// Composant bouton universel (web + native) avec animation de rebond au clic
export const Button: React.FC<ButtonProps> = (props) => {
  // Accès au thème pour déterminer dynamiquement les tailles d'icônes
  const theme = useTheme();
  const appearance = props.appearance ?? 'primary';
  // Couleur du contenu : couleur de l'apparence en mode inversé, couleur « sur » sinon
  // (encre foncée sur l'orange, blanc sur le vert).
  const contentColor = props.inverted
    ? appearance === 'black'
      ? theme.colors.text
      : getColor(theme, appearance)
    : getOnColor(theme, appearance);

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
        {/* Affiche l'icône optionnelle en adaptant sa taille selon la taille du bouton
            et sa couleur selon le mode inversé */}
        {props.icon && (
          <Icon
            name={props.icon.name}
            size={props.icon.size ?? 'md'}
            color={props.icon.color ?? contentColor}
          />
        )}
        {/* Libellé toujours en extra-gras, dans la couleur de contenu */}
        {props.title ? (
          <Text size={props.size === 'lg' ? 'md' : 'sm'} extraBold style={{ color: contentColor }}>
            {props.title}
          </Text>
        ) : null}
      </Styled.ButtonContainer>
    </Bounce>
  );
};
