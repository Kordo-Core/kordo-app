import React, { useState, useRef, useEffect } from 'react';
import { SegmentedControlProps } from './SegmentedControl.types';
import * as Styled from './SegmentedControl.styles';
import { useTheme } from '@emotion/react';

export const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  const theme = useTheme();
  const [segmentWidths, setSegmentWidths] = useState<number[]>([]);
  const segmentRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const widths = segmentRefs.current.map((ref) => ref?.offsetWidth || 0);
    setSegmentWidths(widths);
  }, [props.segments]);

  const getPointerLeft = () => {
    let left = 4;
    for (let i = 0; i < props.selectedIndex; i++) {
      left += segmentWidths[i] || 0;
    }
    return left;
  };

  const getPointerWidth = () => {
    return segmentWidths[props.selectedIndex] || 0;
  };

  const currentColor =
    props.segments[props.selectedIndex]?.color || theme.colors.primary.base;

  return (
    <Styled.SegmentedContainer borderRadius={props.borderRadius ?? 'rounded'}>
      <Styled.Pointer
        borderRadius={props.borderRadius ?? 'rounded'}
        left={getPointerLeft()}
        width={getPointerWidth()}
        color={currentColor}
      />

      {props.segments.map((segment, index) => (
        <Styled.CustomText
          key={segment.text}
          ref={(el: HTMLSpanElement | null) => {
            segmentRefs.current[index] = el;
          }}
          size={props.size ?? 'lg'}
          bold
          isSelected={index === props.selectedIndex}
          onClick={() => props.onSelect(index)}
        >
          {segment.text}
        </Styled.CustomText>
      ))}
    </Styled.SegmentedContainer>
  );
};
