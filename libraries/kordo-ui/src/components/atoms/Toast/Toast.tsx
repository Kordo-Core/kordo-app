import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { Loader } from '../Loader/Loader';
import { ToastProps } from './Toast.types';
import * as Styled from './Toast.styles';
import { useTheme } from '@emotion/react';
import React, { useRef, useEffect, useState } from 'react';
import { Fade, FadeRef } from '../../../animations/Fade/Fade';

// Notification éphémère avec apparition/disparition animée et fermeture manuelle possible
export const Toast: React.FC<ToastProps> = (props) => {
  // Accès au thème pour la taille de l'icône de fermeture
  const theme = useTheme();
  // Référence impérative vers l'animation Fade pour déclencher entrée/sortie à la demande
  const fadeRef = useRef<FadeRef>(null);
  // Drapeau local indiquant que l'utilisateur a demandé la fermeture manuelle
  const [close, setClose] = useState(false);

  // Au montage : déclenche le fondu d'entrée puis planifie le fondu de sortie automatique après la durée configurée
  useEffect(() => {
    fadeRef.current?.trigger('in');
    setTimeout(() => fadeRef.current?.trigger('out'), props.duration);
  }, []);

  // Réagit à la fermeture manuelle : lance le fondu de sortie puis supprime le toast du state parent après l'animation
  useEffect(() => {
    if (close) {
      fadeRef.current?.trigger('out');
      setTimeout(() => props.delete(), 200);
    }
  }, [close]);

  return (
    <Fade ref={fadeRef} direction="up" distance={50} duration={200}>
      <Styled.ToastContainer type={props.type}>
        <Styled.ToastContent>
          <Styled.DataContent>
            {props.icon && <Icon name={props.icon.name} size={20} color={props.type ?? 'info'} />}
            <Text>{props.message}</Text>
          </Styled.DataContent>
          <Styled.CloseIcon
            name="DismissRegular"
            color="theme.colors.neutral.gray"
            size={theme.iconSizes.md}
            onPress={() => setClose(true)}
          />
        </Styled.ToastContent>
        {props.showLoader && (
          <Styled.LoaderWrapper>
            <Loader
              duration={props.duration}
              appearance={props.type ?? 'info'}
              type="bar"
              reverse
            />
          </Styled.LoaderWrapper>
        )}
      </Styled.ToastContainer>
    </Fade>
  );
};
