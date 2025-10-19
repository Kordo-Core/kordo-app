import React from 'react';
import { Feather } from '@expo/vector-icons';
import * as Styled from './Input.style';
import { InputProps } from './Input.types';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { View } from 'react-native';
import { keyboardTypeMap, textContentTypeMap } from './utils/inputMaps';
import { State } from './utils/TState';
import { Shake, ShakeRef } from '../../../animations/Shake/Shake';
import { Fade, FadeRef } from '../../../animations/Fade/Fade';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const Input: React.FC<InputProps> = (props) => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const keyboardType = keyboardTypeMap[props.type ?? 'default'];
  const textContentType = textContentTypeMap[props.type ?? 'default'];

  const shakeRef = React.useRef<ShakeRef>(null);
  const fadeRef = React.useRef<FadeRef>(null);
  const borderColor = useSharedValue(theme.colors.neutral.grey);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    borderWidth: 1,
    borderRadius: 8,
  }));

  const validate = (val: string): { state: State; message: string } => {
    if (!val) {
      return props.required
        ? { state: 'error', message: 'Ce champ est requis.' }
        : { state: 'default', message: '' };
    }

    switch (props.type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          ? { state: 'success', message: '' }
          : { state: 'error', message: 'Veuillez entrer un email valide.' };

      case 'password': {
        const min = props.minLength ?? 8;
        const max = props.maxLength ?? 32;
        if (val.length < min) return { state: 'error', message: `Minimum ${min} caractères.` };
        if (val.length > max) return { state: 'error', message: `Maximum ${max} caractères.` };
        return { state: 'success', message: '' };
      }

      case 'number':
        return !isNaN(Number(val))
          ? { state: 'success', message: '' }
          : { state: 'error', message: 'Veuillez entrer un nombre valide.' };

      default:
        return { state: 'success', message: '' };
    }
  };

  return (
    <View>
      {(props.label || props.required) && (
        <Text appearance="grey" size="md">
          {props.label}
          {props.required ? ' *' : ''}
        </Text>
      )}
      <Shake ref={shakeRef} duration={50} amplitude={5}>
        <Styled.InputContainer style={animatedBorderStyle}>
          {props.icon?.position === 'left' && <Feather name={props.icon.name} size={20} />}

          <Styled.Input
            {...props}
            keyboardType={keyboardType}
            textContentType={textContentType}
            secureTextEntry={props.type === 'password'}
            onFocus={() => {
              fadeRef.current?.trigger('out');
              borderColor.value = withTiming(theme.colors.neutral.grey, { duration: 250 });
            }}
            onBlur={() => {
              const { state, message } = validate(props.value);
              setErrorMessage(message);

              if (state === 'error') {
                shakeRef.current?.trigger();
                fadeRef.current?.trigger('in');
                borderColor.value = withTiming(theme.colors.type.error, { duration: 250 });
              } else {
                borderColor.value = withTiming(theme.colors.neutral.grey, { duration: 250 });
              }
            }}
          />

          {props.icon?.position === 'right' && <Feather name={props.icon.name} size={20} />}
        </Styled.InputContainer>
      </Shake>

      <Fade ref={fadeRef} direction="down" duration={200} distance={6}>
        <Styled.ErrorText appearance="error" size="sm">
          {errorMessage || ' '}
        </Styled.ErrorText>
      </Fade>
    </View>
  );
};
