import React from 'react';
import { ButtonProps } from './Button.types';
import * as Styled from './Button.style';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';
import { Icon } from '../Icon/Icon';

export const Button: React.FC<ButtonProps> = (props) => {
  const { disabled = false, onPress, ...rest } = props;
  const theme = useTheme();

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <Bounce onPress={handlePress} disabled={disabled}>
      <Styled.ButtonContainer {...rest} disabled={disabled}>
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
        {props.title && (
          <Text
            appearance={props.inverted ? props.appearance : 'white'}
            size={props.size}
            bold={props.size === 'lg'}
          >
            {props.title}
          </Text>
        )}
      </Styled.ButtonContainer>
    </Bounce>
  );
};
