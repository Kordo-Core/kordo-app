import React from 'react';
import { toWebStyle } from './rn-style';

// Mappe les primitives react-native-svg sur les éléments SVG du DOM.
// Le `style` reçu est écrit en syntaxe RN (ex. `transform: [{ rotate }]` pour le spinner du
// Loader) : il doit être traduit, sinon React le rejette et la rotation ne part jamais.
type Props = { children?: React.ReactNode; style?: unknown; [key: string]: unknown };

const svgElement = (element: string, hasChildren = false): React.FC<Props> => {
  const Component: React.FC<Props> = ({ children, style, ...rest }) =>
    React.createElement(
      element,
      { ...rest, style: toWebStyle(style as never) },
      hasChildren ? children : undefined,
    );
  Component.displayName = `Svg.${element}`;
  return Component;
};

const Svg: React.FC<Props> = ({ children, style, width, height, viewBox, ...rest }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width,
      height,
      viewBox,
      ...rest,
      style: toWebStyle(style as never),
    },
    children,
  );

export default Svg;
export { Svg };

export const Path = svgElement('path');
export const Circle = svgElement('circle');
export const Rect = svgElement('rect');
export const Line = svgElement('line');
export const Ellipse = svgElement('ellipse');
export const Polyline = svgElement('polyline');
export const Polygon = svgElement('polygon');
export const G = svgElement('g', true);
export const Text = svgElement('text', true);
