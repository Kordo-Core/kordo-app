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
import { StatusType } from '../../../types/theme.types';

export const Input: React.FC<InputProps> = (props) => {
  // Accès au thème pour les couleurs de bordure et les styles dynamiques
  const theme = useTheme();
  // Stocke le message d'erreur de validation affiché sous le champ lorsque la saisie est invalide
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  // Mot de passe affiché en clair (bouton œil, quand `revealable` est actif)
  const [revealed, setRevealed] = React.useState(false);
  const rightIcon = props.revealable
    ? {
        name: revealed ? 'EyeOffRegular' : 'EyeRegular',
        color: theme.colors.textMuted,
        onPress: () => setRevealed((r) => !r),
      }
    : props.rightIcon;

  // Résolution du type de clavier natif et du type de contenu pour l'autocomplétion selon le type d'input
  const keyboardType = keyboardTypeMap[props.type ?? 'default'];
  const textContentType = textContentTypeMap[props.type ?? 'default'];

  // Référence vers l'animation Shake pour déclencher un tremblement visuel en cas d'erreur
  const shakeRef = React.useRef<ShakeRef>(null);
  // Référence vers l'animation Fade pour afficher/masquer le message d'erreur avec un fondu
  const fadeRef = React.useRef<FadeRef>(null);
  // Valeur partagée Reanimated pour animer la couleur de bordure du champ selon l'état de validation
  const borderColor = useSharedValue('transparent');

  // Style animé appliqué au conteneur du champ pour refléter visuellement l'état courant (erreur ou normal)
  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
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

  fadeRef.current?.trigger('in');

  // Variante « formulaire » (écran Publier) : libellé en capitales espacées au-dessus d'une
  // saisie pleine largeur, compteur de caractères optionnel à droite du libellé.
  if (props.variant === 'form') {
    const lineHeight = 21.75;
    return (
      <Styled.FormField>
        <Styled.FocusRing
          pointerEvents="none"
          style={[animatedBorderStyle, { borderRadius: Styled.FORM_RADIUS }]}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="eyebrow" size={11}>
            {props.label}
          </Text>
          {props.counter !== undefined && (
            <Text size={11} bold appearance="gray">
              {props.value.length} / {props.counter}
            </Text>
          )}
        </View>
        <Styled.Input
          value={props.value}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
          placeholderTextColor={theme.colors.textMuted}
          editable={props.editable}
          maxLength={props.counter ?? props.maxLength}
          multiline={props.multiline}
          style={
            props.multiline
              ? {
                  height: lineHeight * 3,
                  lineHeight,
                  textAlignVertical: 'top',
                  fontFamily: theme.fonts.medium,
                }
              : props.emphasis
                ? { fontSize: 17, fontFamily: theme.fonts.extraBold }
                : undefined
          }
          onFocus={() => {
            borderColor.value = withTiming(theme.colors.secondary.base, { duration: 250 });
          }}
          onBlur={() => {
            borderColor.value = withTiming('transparent', { duration: 250 });
          }}
        />
      </Styled.FormField>
    );
  }

  return (
    <View>
      <Shake ref={shakeRef} duration={50} amplitude={5}>
        <Styled.InputContainer
          multiline={props.multiline}
          hasLabel={!!(props.label || props.required)}
        >
          <Styled.FocusRing pointerEvents="none" style={animatedBorderStyle} />
          {props.leftIcon && (
            <Icon
              name={props.leftIcon.name}
              size={props.leftIcon.size ?? 20}
              color={props.leftIcon.color}
              onPress={props.leftIcon.onPress}
            />
          )}

          {/* Libellé dans le champ, au-dessus de la saisie (design D) */}
          <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', gap: 2 }}>
            {(props.label || props.required) && (
              <Text size={11} bold appearance="gray" style={{ letterSpacing: 0.3 }}>
                {props.label}
                {props.required ? ' *' : ''}
              </Text>
            )}
            <Styled.Input
              value={props.value}
              onChangeText={props.onChange}
              placeholder={props.placeholder}
              placeholderTextColor={theme.colors.textMuted}
              editable={props.editable}
              maxLength={props.maxLength}
              multiline={props.multiline}
              style={
                props.multiline
                  ? { flex: 1, textAlignVertical: 'top', alignSelf: 'stretch' }
                  : // Sans libellé (recherche) : saisie en graisse normale, comme la maquette
                    !(props.label || props.required)
                    ? { fontFamily: theme.fonts.regular }
                    : undefined
              }
              hasLeftIcon={!!props.leftIcon}
              keyboardType={keyboardType}
              textContentType={textContentType}
              secureTextEntry={props.type === 'password' && !revealed}
              autoFocus={props.autoFocus}
              // Au focus : masquer le message d'erreur et passer la bordure au vert d'action
              onFocus={() => {
                fadeRef.current?.trigger('out');
                borderColor.value = withTiming(theme.colors.secondary.base, { duration: 250 });
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
                  borderColor.value = withTiming('transparent', { duration: 250 });
                }
              }}
            />
          </View>

          {rightIcon &&
            (props.revealable ? (
              // Bouton œil : cible de 36 px autour de l'icône, comme sur la maquette
              <View
                style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon
                  name={rightIcon.name}
                  size={rightIcon.size ?? 20}
                  color={rightIcon.color}
                  onPress={rightIcon.onPress}
                />
              </View>
            ) : (
              <Icon
                name={rightIcon.name}
                size={rightIcon.size ?? 20}
                color={rightIcon.color}
                onPress={rightIcon.onPress}
              />
            ))}
        </Styled.InputContainer>
      </Shake>
      {errorMessage ? (
        <Fade ref={fadeRef} direction="down" duration={200} distance={6}>
          <Styled.ErrorText appearance="error" size="sm">
            {errorMessage}
          </Styled.ErrorText>
        </Fade>
      ) : null}
    </View>
  );
};
