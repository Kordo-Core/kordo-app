import React from 'react';

// Stub du lecteur vidéo pour Storybook (expo-video est un module natif, indisponible sur le web Vite).
export const useVideoPlayer = () => ({
  play: () => {},
  pause: () => {},
  replace: (_source: unknown) => {},
  addListener: (_event: string, _cb: () => void) => ({ remove: () => {} }),
});

type Props = { [key: string]: unknown };
export const VideoView: React.FC<Props> = ({ style }) =>
  React.createElement('div', { style });
