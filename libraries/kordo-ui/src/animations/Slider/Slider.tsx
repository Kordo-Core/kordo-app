import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { SliderProps } from './Slider.types';
import * as Styled from './Slider.styles';

// Composant de défilement horizontal, affiche les enfants dans un carrousel avec espacement configurable
export const Slider: FC<SliderProps> = (props) => {
  return (
    <Styled.SliderContainer height={props.height ?? 0}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: props.gap ?? 0,
        }}
      >
        {/* Itère sur chaque enfant pour l'envelopper individuellement avec l'espacement approprié */}
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
