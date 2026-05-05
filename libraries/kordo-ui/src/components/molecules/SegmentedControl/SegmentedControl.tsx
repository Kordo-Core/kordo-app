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

// Composant de contrôle segmenté avec indicateur animé et transition de couleurs
export const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  // Stocke les largeurs mesurées de chaque segment pour positionner l'indicateur correctement
  const [textWidths, setTextWidths] = useState<number[]>([]);
  // Accès au thème pour les couleurs par défaut de l'indicateur
  const theme = useTheme();
  // Position horizontale animée de l'indicateur glissant
  const overlayLeft = useSharedValue(4);
  // Largeur animée de l'indicateur, adaptée au segment sélectionné
  const overlayWidth = useSharedValue(0);
  // Échelle animée pour l'effet de rebond au clic
  const overlayScale = useSharedValue(1);
  // Progression de l'interpolation de couleur entre l'ancien et le nouveau segment (0 à 1)
  const colorProgress = useSharedValue(0);
  // Couleur de départ pour la transition (couleur du segment précédemment sélectionné)
  const currentColor = useSharedValue(props.segments[props.selectedIndex].color);
  // Couleur cible pour la transition (couleur du segment nouvellement sélectionné)
  const nextColor = useSharedValue(props.segments[props.selectedIndex].color);

  // Snap sans animation quand les largeurs sont mesurées (layout initial)
  useEffect(() => {
    if (!textWidths || textWidths.length === 0) return;
    const width = textWidths[props.selectedIndex] || 0;
    if (width === 0) return;
    const left =
      textWidths.reduce((acc, w, i) => (i < props.selectedIndex ? acc + w : acc), 0) +
      props.selectedIndex * 4;
    overlayLeft.value = left + 4;
    overlayWidth.value = width;
  }, [textWidths]);

  // Animation quand l'utilisateur change de segment
  useEffect(() => {
    if (!textWidths || textWidths.length === 0) return;
    const width = textWidths[props.selectedIndex] || 0;
    if (width === 0) return;
    const left =
      textWidths.reduce((acc, w, i) => (i < props.selectedIndex ? acc + w : acc), 0) +
      props.selectedIndex * 4;
    overlayLeft.value = withTiming(left + 4, { duration: 200 });
    overlayWidth.value = withTiming(width, { duration: 200 });
  }, [props.selectedIndex]);

  // Lance une transition de couleur fluide quand un nouveau segment est sélectionné
  useEffect(() => {
    nextColor.value = props.segments[props.selectedIndex].color;
    colorProgress.value = 0;
    colorProgress.value = withTiming(1, { duration: 200 });
  }, [props.selectedIndex]);

  // Génère le style animé de l'indicateur : position, taille, échelle et couleur interpolée
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    // Interpole la couleur de fond entre l'ancienne et la nouvelle couleur du segment
    const bgColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [
        currentColor.value ?? theme.colors.primary.base,
        nextColor.value ?? theme.colors.primary.base,
      ],
    );

    // Met à jour la couleur courante une fois la transition terminée pour le prochain changement
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
      {/* Indicateur coloré glissant qui suit le segment sélectionné */}
      <Styled.Pointer
        borderRadius={props.borderRadius ?? 'rounded'}
        style={[overlayAnimatedStyle]}
      />

      {/* Couche masquée pour afficher le texte en blanc uniquement au-dessus de l'indicateur coloré */}
      <Styled.MaskedContainer maskElement={<Styled.MaskOverlay style={[overlayAnimatedStyle]} />}>
        {props.segments.map((segment, index) => (
          <Styled.SegmentItem
            key={segment.text}
            onTouchEnd={() => {
              props.onSelect(index);

              // Effet de rebond visuel sur l'indicateur pour confirmer la sélection à l'utilisateur
              overlayScale.value = withTiming(0.95, { duration: 100 }, () => {
                overlayScale.value = withTiming(1, { duration: 100 });
              });
            }}
          >
            <Styled.CustomText size={props.size ?? 'lg'} bold appearance="white">
              {segment.text}
            </Styled.CustomText>
          </Styled.SegmentItem>
        ))}
      </Styled.MaskedContainer>

      {/* Couche de texte noir de base — mesure aussi la largeur de chaque segment pour positionner l'indicateur */}
      {props.segments.map((segment, index) => (
        <Styled.SegmentItem
          key={segment.text + '-base'}
          // Capture la largeur rendue de chaque segment pour positionner l'indicateur
          onLayout={(event: LayoutChangeEvent) => {
            const { width } = event.nativeEvent.layout;
            setTextWidths((prev) => {
              const newWidths = [...prev];
              newWidths[index] = width;
              return newWidths;
            });
          }}
        >
          <Styled.CustomText size={props.size ?? 'lg'} bold appearance="black">
            {segment.text}
          </Styled.CustomText>
        </Styled.SegmentItem>
      ))}
    </Styled.SegmentedContainer>
  );
};
