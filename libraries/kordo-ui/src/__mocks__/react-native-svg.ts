import React from 'react';

type Props = { children?: React.ReactNode; [key: string]: any };

const Svg: React.FC<Props> = ({ children, width, height, viewBox, style, ...rest }) =>
  React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width, height, viewBox, style, ...rest }, children);

export default Svg;
export { Svg };
export const Path: React.FC<Props> = (props) => React.createElement('path', props);
export const Circle: React.FC<Props> = (props) => React.createElement('circle', props);
export const Rect: React.FC<Props> = (props) => React.createElement('rect', props);
export const G: React.FC<Props> = ({ children, ...props }) => React.createElement('g', props, children);
export const Line: React.FC<Props> = (props) => React.createElement('line', props);
export const Ellipse: React.FC<Props> = (props) => React.createElement('ellipse', props);
export const Polyline: React.FC<Props> = (props) => React.createElement('polyline', props);
export const Polygon: React.FC<Props> = (props) => React.createElement('polygon', props);
export const Text: React.FC<Props> = ({ children, ...props }) => React.createElement('text', props, children);
