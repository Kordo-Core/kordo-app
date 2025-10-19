import { Text } from '../Text/Text';
import { ToastProps } from './Toast.types';
import { Feather } from '@expo/vector-icons';
import * as Styled from './Toast.style';
import { useTheme } from '@emotion/react';
import React, { useRef, useEffect } from 'react';
import { Fade, FadeRef } from '../../../animations/Fade/Fade';

export const Toast: React.FC<ToastProps> = (props) => {
  const theme = useTheme();
  const fadeRef = useRef<FadeRef>(null);

  useEffect(() => {
    fadeRef.current?.trigger('in');
    setTimeout(() => fadeRef.current?.trigger('out'), 2800);
  }, []);

  return (
    <Fade ref={fadeRef} direction="up" distance={50} duration={200}>
      <Styled.ToastContainer type={props.type}>
        {props.icon && props.icon.position !== 'right' && (
          <Styled.Icon name={props.icon.name} size={20} position={props.icon?.position} />
        )}
        <Text>{props.message}</Text>
        <Styled.CloseIcon
          name="x"
          size={20}
          position={props.icon?.position}
          color={theme.colors.neutral.grey}
        />
      </Styled.ToastContainer>
    </Fade>
  );
};
