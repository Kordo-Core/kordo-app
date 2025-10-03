import React from 'react';
import { ButtonProps } from './Button.types';
import * as Styled from './Button.style';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';

export const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();

  return (
    <Bounce onPress={props.onClick}>
      <Styled.ButtonContainer {...props}>
        {props.icon && props.icon.position === 'left' && (
          <Styled.Icon
            appearance={props.appearance}
            inverted={props.inverted}
            name={props.icon.name}
            size={props.size == 'lg' ? theme.iconSizes.lg : theme.iconSizes.md}
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
        {props.icon && props.icon.position !== 'left' && (
          <Styled.Icon
            appearance={props.appearance}
            inverted={props.inverted}
            name={props.icon.name}
            size={props.size == 'lg' ? 30 : 20}
          />
        )}
      </Styled.ButtonContainer>
    </Bounce>
  );
};
