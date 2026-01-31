import React, { FC } from 'react';
import { SliderProps } from './Slider.types';
import * as Styled from './Slider.styles';

export const Slider: FC<SliderProps> = (props) => {
  return (
    <Styled.SliderContainer height={props.height ?? 0}>
      <Styled.ScrollContainer gap={props.gap ?? 0}>
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
