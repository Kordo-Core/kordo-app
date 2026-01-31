import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { AppearanceType } from '../../../types/theme.types';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const progress = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
`;

export const ProgressBar = styled.div<{ appearance?: AppearanceType }>((props) => ({
  width: '100%',
  height: 4,
  backgroundColor: props.theme.colors[props.appearance ?? 'primary'].lighter,
  borderRadius: 2,
  overflow: 'hidden',
  position: 'relative',
}));

export const Bar = styled.div<{ appearance?: AppearanceType; infinite?: boolean }>((props) => ({
  width: props.infinite ? '20%' : '100%',
  height: '100%',
  backgroundColor: props.theme.colors[props.appearance ?? 'primary'].base,
  borderRadius: 2,
  animation: props.infinite ? `${progress} 1.5s ease-in-out infinite` : 'none',
  transformOrigin: 'left',
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
