import React from 'react';
import { Text } from 'react-native';
import { ButtonProps } from './Button.types';
import * as Styled  from './Button.style';

export const Button: React.FC<ButtonProps> = (props) => {
  console.log(props)
  return (
    <Styled.ButtonContainer color={props.color}>
      <Styled.ButtonText color={props.color}>{props.title}</Styled.ButtonText>
      {props.icon && props.icon}
    </Styled.ButtonContainer>
  );
};
