import React, { FC } from 'react';
import { SliderProps } from './Slider.types';
import * as Styled from './Slider.styles';

// Composant de défilement horizontal web, utilise un conteneur de scroll stylisé avec espacement configurable
export const Slider: FC<SliderProps> = (props) => {
  return (
    <Styled.SliderContainer height={props.height ?? 0}>
      <Styled.ScrollContainer gap={props.gap ?? 0}>
        {/* Itère sur chaque enfant pour l'envelopper individuellement avec l'espacement approprié */}
        {React.Children.map(props.children, (child, index) => (
          <Styled.ItemWrapper
            key={index}
            gap={props.gap ?? 0}
            index={index}
            lastChild={React.Children.count(props.children)}
          >
            {child as React.ReactElement}
          </Styled.ItemWrapper>
        ))}
      </Styled.ScrollContainer>
    </Styled.SliderContainer>
  );
};
