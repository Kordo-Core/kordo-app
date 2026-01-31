import React, { useState } from 'react';
import * as Styled from './Input.style';
import { InputProps } from './Input.types';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';
import { Shake, ShakeRef } from '../../../animations/Shake/Shake';
import { Fade, FadeRef } from '../../../animations/Fade/Fade';
import { Icon } from '../Icon/Icon';
import { StatusType } from 'types/theme.types';

const inputTypeMap: Record<string, string> = {
  email: 'email',
  password: 'password',
  number: 'number',
  phone: 'tel',
  default: 'text',
};

export const Input: React.FC<InputProps> = (props) => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [borderColor, setBorderColor] = useState(theme.colors.neutral.gray.base);

  const inputType = inputTypeMap[props.type ?? 'default'];

  const shakeRef = React.useRef<ShakeRef>(null);
  const fadeRef = React.useRef<FadeRef>(null);

  const validate = (val: string): { state: StatusType | 'default'; message: string } => {
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
    <div>
      {(props.label || props.required) && (
        <Text appearance="gray" size="md">
          {props.label}
          {props.required ? ' *' : ''}
        </Text>
      )}
      <Shake ref={shakeRef} duration={50} amplitude={5}>
        <Styled.InputContainer borderColor={borderColor}>
          {props.iconPosition === 'left' && props.icon && <Icon name={props.icon.name} size={20} />}

          <Styled.Input
            type={inputType}
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e) => props.onChangeText?.(e.target.value)}
            onFocus={() => {
              fadeRef.current?.trigger('out');
              setBorderColor(theme.colors.neutral.gray.base);
            }}
            onBlur={() => {
              const { state, message } = validate(props.value);
              setErrorMessage(message);

              if (state === 'error') {
                shakeRef.current?.trigger();
                fadeRef.current?.trigger('in');
                setBorderColor(theme.colors.error.base);
              } else {
                setBorderColor(theme.colors.neutral.gray.base);
              }
            }}
            iconPosition={props.iconPosition}
          />

          {props.iconPosition !== 'left' && props.icon && <Icon name={props.icon.name} size={20} />}
        </Styled.InputContainer>
      </Shake>

      <Fade ref={fadeRef} direction="down" duration={200} distance={6}>
        <Styled.ErrorText appearance="error" size="sm">
          {errorMessage || ' '}
        </Styled.ErrorText>
      </Fade>
    </div>
  );
};
