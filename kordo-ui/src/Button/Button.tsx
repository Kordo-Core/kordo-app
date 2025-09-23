import React from 'react';
import { ButtonProps } from './Button.types';
import * as Styled from './Button.style';
import { Animated, Text } from 'react-native';
import { useTheme } from '@emotion/react';

export const Button: React.FC<ButtonProps> = (props) => {
  const scale = new Animated.Value(1);
  const theme = useTheme();

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onClick?.();
    });
  };
 
  return (
    <Styled.ButtonContainer
      style={{ transform: [{ scale }] }}
      appearance={props.appearance}
      inverted={props.inverted}
      borderRadius={props.borderRadius}
      size={props.size}
      width={props.width}
      iconName={props.iconName}
      title={props.title}
      onPress={handlePress} 
    >
      {props.iconName && props.iconPosition === 'left' && (
        <Styled.Icon appearance={props.appearance} inverted={props.inverted} name={props.iconName} size={props.size == 'lg' ? theme.iconSizes.lg : theme.iconSizes.md} />
      )}
      {props.title && (
        <Styled.ButtonText appearance={props.appearance} size={props.size} inverted={props.inverted}>
          <Text>{props.title}</Text>
        </Styled.ButtonText>
      )}
      {props.iconName && props.iconPosition !== 'left' && (
        <Styled.Icon appearance={props.appearance} inverted={props.inverted} name={props.iconName} size={props.size == 'lg' ? 30 : 20} />
      )}
    </Styled.ButtonContainer>
  );
};
