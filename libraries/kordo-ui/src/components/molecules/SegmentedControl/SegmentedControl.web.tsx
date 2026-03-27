import React, { useState, useRef, useEffect } from 'react';
import { SegmentedControlProps } from './SegmentedControl.types';
import * as Styled from './SegmentedControl.styles';
import { useTheme } from '@emotion/react';

// Composant de contrôle segmenté web avec indicateur positionné dynamiquement
export const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  // Accès au thème pour la couleur par défaut de l'indicateur
  const theme = useTheme();
  // Stocke les largeurs mesurées de chaque segment pour calculer la position de l'indicateur
  const [segmentWidths, setSegmentWidths] = useState<number[]>([]);
  // Références DOM vers chaque élément de segment pour mesurer leur largeur réelle
  const segmentRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Mesure la largeur de chaque segment à partir du DOM lorsque la liste de segments change
  useEffect(() => {
    const widths = segmentRefs.current.map((ref) => ref?.offsetWidth || 0);
    setSegmentWidths(widths);
  }, [props.segments]);

  // Calcule la position gauche de l'indicateur en additionnant les largeurs des segments précédents
  const getPointerLeft = () => {
    let left = 4;
    for (let i = 0; i < props.selectedIndex; i++) {
      left += segmentWidths[i] || 0;
    }
    return left;
  };

  // Retourne la largeur du segment actuellement sélectionné pour dimensionner l'indicateur
  const getPointerWidth = () => {
    return segmentWidths[props.selectedIndex] || 0;
  };

  // Détermine la couleur de l'indicateur selon le segment sélectionné, avec fallback sur la couleur primaire du thème
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
