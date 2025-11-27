import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { SliderProps } from './Slider.types';
import * as Styled from './Slider.styles';

export const Slider: FC<SliderProps> = (props) => {
  return (
    <Styled.SliderContainer height={props.height ?? 0}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (props.gap ?? 0) / 2,
        }}
      >
        {React.Children.map(props.children, (child, index) => (
          <Styled.ItemWrapper
            key={index}
            gap={props.gap ?? 0}
            index={index}
            lastChild={props.children.length}
          >
            {child as React.ReactElement}
          </Styled.ItemWrapper>
        ))}
      </ScrollView>
    </Styled.SliderContainer>
  );
};
