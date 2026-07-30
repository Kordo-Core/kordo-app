import React, { createContext, useContext } from 'react';
import { useWindowDimensions as useBrowserDimensions } from 'react-native-web';

// `useWindowDimensions` renvoie la taille du cadre téléphone quand la story en a un.
//
// Panel, CommentsPanel, VideoStories et Dropdown calculent leur position à partir de la
// hauteur de « l'écran ». Dans Storybook, cet écran est le cadre du décorateur, pas la fenêtre
// du navigateur : sans cette redirection, un panneau ancré en bas d'un écran de 780 px se
// plaçait d'après une fenêtre de 900 px et sortait du cadre. C'est ce qui imposait jusqu'ici
// un cadre à la hauteur exacte de la fenêtre.

export type ViewportSize = { width: number; height: number };

const ViewportContext = createContext<ViewportSize | null>(null);

export const ViewportProvider: React.FC<{
  size: ViewportSize;
  children: React.ReactNode;
}> = ({ size, children }) =>
  React.createElement(ViewportContext.Provider, { value: size }, children);

export const useWindowDimensions = () => {
  // Les deux hooks sont toujours appelés : l'ordre des hooks doit rester stable.
  const frame = useContext(ViewportContext);
  const browser = useBrowserDimensions() as ViewportSize & { scale: number; fontScale: number };
  return frame ? { ...browser, ...frame } : browser;
};
