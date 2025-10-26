import { Text } from '../Text/Text';
import { ToastProps } from './Toast.types';
import { Feather } from '@expo/vector-icons';
import * as Styled from './Toast.style';
import { useTheme } from '@emotion/react';
import React, { useRef, useEffect, useState } from 'react';
import { Fade, FadeRef } from '../../../animations/Fade/Fade';

export const Toast: React.FC<ToastProps> = (props) => {
  const theme = useTheme();
  const fadeRef = useRef<FadeRef>(null);
  const [close, setClose] = useState(false);

  useEffect(() => {
    fadeRef.current?.trigger('in');
    setTimeout(() => fadeRef.current?.trigger('out'), props.duration);
  }, []);

  useEffect(() => {
    if (close) {
      fadeRef.current?.trigger('out');
      props.delete();
    }
  }, [close]);

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
          color={theme.colors.neutral.grey}
          onPress={() => setClose(true)}
        />
      </Styled.ToastContainer>
    </Fade>
  );
};
