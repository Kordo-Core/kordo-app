import React, { useState } from 'react';
import * as Styled from './Input.styles';
import { InputProps } from './Input.types';
import { useTheme } from '@emotion/react';
import { Text } from '../../atoms/Text/Text';
import { Shake, ShakeRef } from '../../../animations/Shake/Shake';
import { Fade, FadeRef } from '../../../animations/Fade/Fade';
import { Icon } from '../../atoms/Icon/Icon';
import { StatusType } from 'types/theme.types';

// Table de correspondance entre le type logique de l'input et l'attribut HTML type natif
const inputTypeMap: Record<string, string> = {
  email: 'email',
  password: 'password',
  number: 'number',
  phone: 'tel',
  default: 'text',
};

export const Input: React.FC<InputProps> = (props) => {
  // Accès au thème pour les couleurs de bordure et les styles dynamiques
  const theme = useTheme();
  // Stocke le message d'erreur de validation affiché sous le champ lorsque la saisie est invalide
  const [errorMessage, setErrorMessage] = useState<string>('');
  // Gère la couleur de bordure du champ pour refléter visuellement l'état de validation (erreur ou normal)
  const [borderColor, setBorderColor] = useState(theme.colors.neutral.gray.base);

  // Résolution du type HTML natif selon le type d'input demandé
  const inputType = inputTypeMap[props.type ?? 'default'];

  // Référence vers l'animation Shake pour déclencher un tremblement visuel en cas d'erreur
  const shakeRef = React.useRef<ShakeRef>(null);
  // Référence vers l'animation Fade pour afficher/masquer le message d'erreur avec un fondu
  const fadeRef = React.useRef<FadeRef>(null);

  // Valide la valeur saisie selon le type d'input (email, password, number) et renvoie l'état + message d'erreur éventuel
  const validate = (val: string): { state: StatusType | 'default'; message: string } => {
    if (!val) {
      return props.required
        ? { state: 'error', message: 'This field is required.' }
        : { state: 'default', message: '' };
    }

    switch (props.type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          ? { state: 'success', message: '' }
          : { state: 'error', message: 'Please enter a valid email address.' };

      case 'password': {
        const min = props.minLength ?? 8;
        const max = props.maxLength ?? 32;
        if (val.length < min) return { state: 'error', message: `Minimum ${min} characters.` };
        if (val.length > max) return { state: 'error', message: `Maximum ${max} characters.` };
        return { state: 'success', message: '' };
      }

      case 'number':
        return !isNaN(Number(val))
          ? { state: 'success', message: '' }
          : { state: 'error', message: 'Please enter a valid number.' };

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
            // Au focus : masquer le message d'erreur et remettre la bordure à sa couleur neutre
            onFocus={() => {
              fadeRef.current?.trigger('out');
              setBorderColor(theme.colors.neutral.gray.base);
            }}
            // Au blur : valider la saisie, et si erreur déclencher le shake + afficher le message + bordure rouge
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
