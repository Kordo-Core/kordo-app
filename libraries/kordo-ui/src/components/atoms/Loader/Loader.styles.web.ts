import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { AppearanceType } from '../../../types/theme.types';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pingpong = keyframes`
  from { left: 0%; }
  to { left: 80%; }
`;

const fill = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const fillReverse = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

export const ProgressBar = styled.div<{ appearance?: AppearanceType }>((props) => ({
  width: '100%',
  height: 4,
  backgroundColor: props.theme.colors[props.appearance ?? 'primary'].lighter,
  borderRadius: 2,
  overflow: 'hidden',
  position: 'relative',
}));

export const Bar = styled.div<{
  appearance?: AppearanceType;
  infinite?: boolean;
  reverse?: boolean;
  duration?: number;
}>((props) => ({
  position: 'absolute',
  left: 0,
  height: '100%',
  backgroundColor: props.theme.colors[props.appearance ?? 'primary'].base,
  borderRadius: 2,
  ...(props.infinite
    ? {
        width: '20%',
        animation: `${pingpong} ${props.duration ?? 1500}ms ease-in-out infinite alternate`,
      }
    : {
        width: '0%',
        animation: `${props.reverse ? fillReverse : fill} ${props.duration ?? 1000}ms ease-in-out forwards`,
      }),
}));

export const Spinner = styled.div<{ size: number; appearance?: AppearanceType }>((props) => ({
  width: props.size,
  height: props.size,
  border: `4px solid ${props.theme.colors[props.appearance ?? 'primary'].lighter}`,
  borderTop: `4px solid ${props.theme.colors[props.appearance ?? 'primary'].base}`,
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
  boxSizing: 'border-box',
}));
