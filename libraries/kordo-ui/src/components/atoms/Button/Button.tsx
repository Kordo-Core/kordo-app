import React from 'react';
import { ButtonProps } from './Button.types';
import * as Styled from './Button.style';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';
import { Icon } from '../Icon/Icon';

export const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();
  return (
    <Bounce onPress={props.onPress}>
      <Styled.ButtonContainer
        icon={props.icon}
        appearance={props.appearance}
        inverted={props.inverted}
        borderRadius={props.borderRadius}
        size={props.size}
        fullWidth={props.fullWidth}
        withoutBorder={props.withoutBorder}
        style={props.style}
        title={props.title}
        onLayout={props.onLayout}
      >
        {props.icon && props.iconPosition === 'left' && (
          <Icon
            name={props.icon.name}
            size={props.size == 'lg' ? theme.iconSizes.lg : theme.iconSizes.md}
            color={props.icon.color}
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
        {props.icon && props.iconPosition !== 'left' && (
          <Icon
            name={props.icon.name}
            size={props.size == 'lg' ? theme.iconSizes.lg : theme.iconSizes.md}
            color={props.icon.color}
          />
        )}
      </Styled.ButtonContainer>
    </Bounce>
  );
};
