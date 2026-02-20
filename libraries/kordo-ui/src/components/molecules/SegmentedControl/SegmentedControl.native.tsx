import React, { useState, useEffect } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { SegmentedControlProps } from './SegmentedControl.types';
import * as Styled from './SegmentedControl.styles';
import { useTheme } from '@emotion/react';

export const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  const [textWidths, setTextWidths] = useState<number[]>([]);
  const theme = useTheme();
  const overlayLeft = useSharedValue(4);
  const overlayWidth = useSharedValue(0);
  const overlayScale = useSharedValue(1);
  const colorProgress = useSharedValue(0);
  const currentColor = useSharedValue(props.segments[props.selectedIndex].color);
  const nextColor = useSharedValue(props.segments[props.selectedIndex].color);

  // 👇 Gère le déplacement et largeur de l’overlay
  useEffect(() => {
    if (!textWidths || textWidths.length === 0) return;

    const left =
      textWidths.reduce(
        (acc, width, index) => (index < props.selectedIndex ? acc + width : acc),
        0,
      ) +
      props.selectedIndex * 4;

    const width = textWidths[props.selectedIndex] || 0;

    overlayLeft.value = withTiming(left + 4, { duration: 200 });
    overlayWidth.value = withTiming(width, { duration: 200 });
  }, [props.selectedIndex, textWidths]);

  // 👇 Gère la transition de couleur douce
  useEffect(() => {
    nextColor.value = props.segments[props.selectedIndex].color;
    colorProgress.value = 0;
    colorProgress.value = withTiming(1, { duration: 200 });
  }, [props.selectedIndex]);

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [
        currentColor.value ?? theme.colors.primary.base,
        nextColor.value ?? theme.colors.primary.base,
      ],
    );

    if (colorProgress.value === 1)
      currentColor.value = nextColor.value ?? theme.colors.primary.base;

    return {
      left: overlayLeft.value,
      width: overlayWidth.value,
      transform: [{ scale: overlayScale.value }],
      backgroundColor: bgColor,
    };
  });

  return (
    <Styled.SegmentedContainer borderRadius={props.borderRadius ?? 'rounded'}>
      {/* Overlay animé */}
      <Styled.Pointer
        borderRadius={props.borderRadius ?? 'rounded'}
        style={[overlayAnimatedStyle]}
      />

      {/* Masque du texte blanc */}
      <Styled.MaskedContainer maskElement={<Styled.MaskOverlay style={[overlayAnimatedStyle]} />}>
        {props.segments.map((segment, index) => (
          <Styled.SegmentItem key={segment.text}>
            <Styled.CustomText
              size={props.size ?? 'lg'}
              bold
              appearance="white"
              onPress={() => {
                props.onSelect(index);

                // Animation de rebond
                overlayScale.value = withTiming(0.95, { duration: 100 }, () => {
                  overlayScale.value = withTiming(1, { duration: 100 });
                });
              }}
            >
              {segment.text}
            </Styled.CustomText>
          </Styled.SegmentItem>
        ))}
      </Styled.MaskedContainer>

      {/* Texte noir de base */}
      {props.segments.map((segment, index) => (
        <Styled.SegmentItem
          key={segment.text + '-base'}
          onLayout={(event: LayoutChangeEvent) => {
            const { width } = event.nativeEvent.layout;
            setTextWidths((prev) => {
              const newWidths = [...prev];
              newWidths[index] = width;
              return newWidths;
            });
          }}
        >
          <Styled.CustomText
            size={props.size ?? 'lg'}
            bold
            appearance="black"
            onPress={() => {
              props.onSelect(index);
            }}
          >
            {segment.text}
          </Styled.CustomText>
        </Styled.SegmentItem>
      ))}
    </Styled.SegmentedContainer>
  );
};
