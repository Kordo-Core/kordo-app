import React from 'react';
import * as Styled from './Input.styles';
import { InputProps } from './Input.types';
import { useTheme } from '@emotion/react';
import { Text } from '../../atoms/Text/Text';
import { View } from 'react-native';
import { keyboardTypeMap, textContentTypeMap } from './utils/inputMaps';
import { Shake, ShakeRef } from '../../../animations/Shake/Shake';
import { Fade, FadeRef } from '../../../animations/Fade/Fade';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon } from '../../atoms/Icon/Icon';
import { StatusType } from 'types/theme.types';

export const Input: React.FC<InputProps> = (props) => {
  // Accès au thème pour les couleurs de bordure et les styles dynamiques
  const theme = useTheme();
  // Stocke le message d'erreur de validation affiché sous le champ lorsque la saisie est invalide
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // Résolution du type de clavier natif et du type de contenu pour l'autocomplétion selon le type d'input
  const keyboardType = keyboardTypeMap[props.type ?? 'default'];
  const textContentType = textContentTypeMap[props.type ?? 'default'];

  // Référence vers l'animation Shake pour déclencher un tremblement visuel en cas d'erreur
  const shakeRef = React.useRef<ShakeRef>(null);
  // Référence vers l'animation Fade pour afficher/masquer le message d'erreur avec un fondu
  const fadeRef = React.useRef<FadeRef>(null);
  // Valeur partagée Reanimated pour animer la couleur de bordure du champ selon l'état de validation
  const borderColor = useSharedValue(theme.colors.neutral.gray.base);

  // Style animé appliqué au conteneur du champ pour refléter visuellement l'état courant (erreur ou normal)
  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    borderWidth: 1,
    borderRadius: 8,
  }));

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
    <View>
      {(props.label || props.required) && (
        <Text appearance="gray" size="md">
          {props.label}
          {props.required ? ' *' : ''}
        </Text>
      )}
      <Shake ref={shakeRef} duration={50} amplitude={5}>
        <Styled.InputContainer style={animatedBorderStyle}>
          {props.iconPosition === 'left' && props.icon && <Icon name={props.icon.name} size={20} />}

          <Styled.Input
            value={props.value}
            onChangeText={props.onChange}
            placeholder={props.placeholder}
            editable={props.editable}
            maxLength={props.maxLength}
            multiline={props.multiline}
            iconPosition={props.iconPosition}
            keyboardType={keyboardType}
            textContentType={textContentType}
            secureTextEntry={props.type === 'password'}
            autoFocus={props.autoFocus}
            // Au focus : masquer le message d'erreur et remettre la bordure à sa couleur neutre
            onFocus={() => {
              fadeRef.current?.trigger('out');
              borderColor.value = withTiming(theme.colors.neutral.gray.base, { duration: 250 });
            }}
            // Au blur : valider la saisie, et si erreur déclencher le shake + afficher le message + bordure rouge
            onBlur={() => {
              const { state, message } = validate(props.value);
              setErrorMessage(message);

              if (state === 'error') {
                shakeRef.current?.trigger();
                fadeRef.current?.trigger('in');
                borderColor.value = withTiming(theme.colors.error.base, { duration: 250 });
              } else {
                borderColor.value = withTiming(theme.colors.neutral.gray.base, { duration: 250 });
              }
            }}
          />

          {props.iconPosition !== 'left' && props.icon && <Icon name={props.icon.name} size={20} />}
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
