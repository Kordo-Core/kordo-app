import React from 'react';
import styled from '@emotion/styled';
import { createRNPrimitive } from './rn-primitives';
import { toWebStyle, viewDefaults } from './rn-style';

// Stub de @react-native-masked-view/masked-view pour Storybook.
//
// L'ancien stub renvoyait `children` directement : la classe emotion du conteneur
// (`styled(MaskedView)`, positionnement absolu) n'atterrissait sur aucun élément, et la
// couche masquée se retrouvait dans le flux — d'où les libellés affichés en double.
//
// Les masques utilisés dans la librairie sont des rectangles horizontaux animés
// (l'indicateur du SegmentedControl) : un `clip-path: inset(...)` les reproduit fidèlement.

type MaskProps = {
  children?: React.ReactNode;
  maskElement?: React.ReactElement<{ style?: unknown }>;
  style?: unknown;
  [key: string]: unknown;
};

const toLength = (value: unknown): string | undefined => {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') return value;
  return undefined;
};

const maskToClipPath = (maskElement: MaskProps['maskElement']): string | undefined => {
  const style = toWebStyle(maskElement?.props?.style as never);
  const left = toLength(style.left);
  const width = toLength(style.width);
  if (left === undefined || width === undefined) return undefined;
  return `inset(0 calc(100% - ${left} - ${width}) 0 ${left})`;
};

// Côté natif c'est une View : sans les défauts react-native-web, la div retombe en
// `display: block` et le `flexDirection: 'row'` de la couche masquée reste sans effet.
// Ils passent par une classe emotion, et non par le style en ligne, pour que les règles du
// composant qui enveloppe MaskedView continuent de l'emporter.
const Base = styled(createRNPrimitive('div', 'view'))(viewDefaults);

const MaskedView: React.FC<MaskProps> = ({ children, maskElement, style, ...rest }) =>
  React.createElement(
    Base,
    { ...rest, style: [style, { clipPath: maskToClipPath(maskElement) }] },
    children,
  );

export default MaskedView;
