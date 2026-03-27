import React from 'react';
import { ButtonProps } from './Button.types';
import * as Styled from './Button.styles';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';
import { Icon } from '../Icon/Icon';

// Composant bouton universel (web + native) avec animation de rebond au clic
export const Button: React.FC<ButtonProps> = (props) => {
  const { disabled = false, onPress, ...rest } = props;
  // Accès au thème pour déterminer dynamiquement les tailles d'icônes
  const theme = useTheme();

  // Garde qui empêche le déclenchement de l'action si le bouton est désactivé
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <Bounce onPress={handlePress} disabled={disabled}>
      <Styled.ButtonContainer {...rest} disabled={disabled}>
        {/* Affiche l'icône optionnelle en adaptant sa taille selon la taille du bouton
            et sa couleur selon le mode inversé */}
        {props.icon && (
          <Icon
            name={props.icon.name}
            size={
              props.icon.size
                ? props.icon.size
                : props.size === 'lg'
                  ? theme.iconSizes.lg
                  : theme.iconSizes.md
            }
            color={props.inverted ? (props.icon.color ?? props.appearance) : 'white'}
          />
        )}
        {/* Affiche le libellé du bouton avec une apparence inversée ou blanche
            et un style gras uniquement pour la grande taille */}
        {props.title ? (
          <Text
            appearance={props.inverted ? props.appearance : 'white'}
            size={props.size}
            bold={props.size === 'lg'}
          >
            {props.title}
          </Text>
        ) : null}
      </Styled.ButtonContainer>
    </Bounce>
  );
};
