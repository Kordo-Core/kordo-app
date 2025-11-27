import { Text } from '../Text/Text';
import { ToastProps } from './Toast.types';
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
      setTimeout(() => props.delete(), 200);
    }
  }, [close]);

  return (
    <Fade ref={fadeRef} direction="up" distance={50} duration={200}>
      <Styled.ToastContainer type={props.type}>
        <Styled.ToastContent>
          {props.icon && <Styled.CustomIcon name={props.icon.name} size={20} />}
          <Text>{props.message}</Text>
          <Styled.CloseIcon
            name="x"
            color="gray"
            size={theme.iconSizes.md}
            onPress={() => setClose(true)}
          />
        </Styled.ToastContent>
        {props.showLoader && (
          <Styled.CustomLoader
            duration={props.duration}
            appearance={props.type ?? 'info'}
            type="bar"
            reverse
          />
        )}
      </Styled.ToastContainer>
    </Fade>
  );
};
