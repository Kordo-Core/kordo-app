import React, { useState, useEffect } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
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
  // Largeur intérieure du conteneur : la rangée de libellés blancs doit couvrir exactement la
  // même surface que la couche de base pour se superposer au pixel près.
  const [innerWidth, setInnerWidth] = useState(0);
  // Accès au thème pour les couleurs par défaut de l'indicateur
  const theme = useTheme();
  // Indicateur qui glisse sur la piste. Variante surface : la carte du thème (sombre en sombre,
  // comme la maquette). Variante glass sur photo : clair, couleurs inversées en sombre.
  const isDark = theme.mode === 'dark' && props.variant !== 'surface';
  const defaultColor = isDark ? theme.colors.text : theme.colors.surface;
  const selectedText = isDark ? theme.colors.background : theme.colors.text;
  // Padding du conteneur et écart entre segments : c'est la même valeur, et elle sert aussi
  // d'origine à l'indicateur. Elle était jusqu'ici recopiée en dur à quatre endroits.
  const SPACING = theme.spacing.xs;
  // Écart entre segments : nul en variante surface (segments jointifs)
  const GAP = props.variant === 'surface' ? 0 : SPACING;
  // Position horizontale animée de l'indicateur glissant
  const overlayLeft = useSharedValue(SPACING);
  // Largeur animée de l'indicateur, adaptée au segment sélectionné
  const overlayWidth = useSharedValue(0);
  // Échelle animée pour l'effet de rebond au clic
  const overlayScale = useSharedValue(1);
  // Progression de l'interpolation de couleur entre l'ancien et le nouveau segment (0 à 1)
  const colorProgress = useSharedValue(0);
  // Couleur de départ pour la transition (couleur du segment précédemment sélectionné)
  const currentColor = useSharedValue(props.segments[props.selectedIndex].color ?? defaultColor);
  // Couleur cible pour la transition (couleur du segment nouvellement sélectionné)
  const nextColor = useSharedValue(props.segments[props.selectedIndex].color ?? defaultColor);

  // Snap sans animation quand les largeurs sont mesurées (layout initial)
  useEffect(() => {
    if (!textWidths || textWidths.length === 0) return;
    const width = textWidths[props.selectedIndex] || 0;
    if (width === 0) return;
    const left =
      textWidths.reduce((acc, w, i) => (i < props.selectedIndex ? acc + w : acc), 0) +
      props.selectedIndex * GAP;
    overlayLeft.value = left + SPACING;
    overlayWidth.value = width;
  }, [textWidths]);

  // Animation quand l'utilisateur change de segment
  useEffect(() => {
    if (!textWidths || textWidths.length === 0) return;
    const width = textWidths[props.selectedIndex] || 0;
    if (width === 0) return;
    const left =
      textWidths.reduce((acc, w, i) => (i < props.selectedIndex ? acc + w : acc), 0) +
      props.selectedIndex * GAP;
    overlayLeft.value = withTiming(left + SPACING, { duration: 200 });
    overlayWidth.value = withTiming(width, { duration: 200 });
  }, [props.selectedIndex]);

  // Lance une transition de couleur fluide quand un nouveau segment est sélectionné
  useEffect(() => {
    nextColor.value = props.segments[props.selectedIndex].color ?? defaultColor;
    colorProgress.value = 0;
    colorProgress.value = withTiming(1, { duration: 200 });
  }, [props.selectedIndex, defaultColor]);

  // Génère le style animé de l'indicateur : position, taille, échelle et couleur interpolée
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    // Interpole la couleur de fond entre l'ancienne et la nouvelle couleur du segment
    const bgColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [currentColor.value ?? defaultColor, nextColor.value ?? defaultColor],
    );

    // Met à jour la couleur courante une fois la transition terminée pour le prochain changement
    if (colorProgress.value === 1) currentColor.value = nextColor.value ?? defaultColor;

    return {
      left: overlayLeft.value,
      width: overlayWidth.value,
      transform: [{ scale: overlayScale.value }],
      backgroundColor: bgColor,
    };
  });

  // Décalage inverse de la rangée blanche, exprimé dans le repère de l'indicateur : celui-ci
  // commence à `overlayLeft`, alors que la rangée doit démarrer au bord intérieur du conteneur.
  const revealAnimatedStyle = useAnimatedStyle(() => ({
    left: SPACING - overlayLeft.value,
  }));

  // `glass` : posé sur une photo (voile sombre, libellés blancs) ; `surface` : sur le fond
  // clair d'une page (piste gris clair, libellés gris)
  const surface = props.variant === 'surface';
  // Variante surface : simple View (pas de flou) ; sinon fond flouté
  const Container = surface ? Styled.SurfaceContainer : Styled.SegmentedContainer;

  return (
    <Container
      borderRadius={props.borderRadius ?? 'rounded'}
      surface={surface}
      style={[surface && { backgroundColor: theme.colors.surfaceAlt }, props.style]}
      {...(surface ? {} : { intensity: 14, tint: 'dark' as const })}
      onLayout={(event: LayoutChangeEvent) =>
        setInnerWidth(event.nativeEvent.layout.width - SPACING * 2)
      }
    >
      {surface && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.surfaceAlt,
          }}
        />
      )}
      {/* Couche de base : libellés blancs sur le fond translucide, sélection et mesure */}
      {props.segments.map((segment, index) => (
        <Styled.SegmentButton
          key={segment.text + '-base'}
          onPress={() => {
            props.onSelect(index);

            // Effet de rebond visuel sur l'indicateur pour confirmer la sélection à l'utilisateur
            overlayScale.value = withTiming(0.95, { duration: 100 }, () => {
              overlayScale.value = withTiming(1, { duration: 100 });
            });
          }}
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
          <Styled.CustomText
            size={props.size ?? 'lg'}
            surface={surface}
            heavy={props.extraBoldLabels}
            extraBold={!surface}
            appearance={surface ? 'gray' : 'white'}
          >
            {segment.text}
          </Styled.CustomText>
        </Styled.SegmentButton>
      ))}

      {/* Indicateur clair glissant, posé par-dessus la couche de base : il porte la copie
          foncée des libellés et n'en laisse voir que ce qu'il recouvre. */}
      <Styled.Pointer
        borderRadius={props.borderRadius ?? 'rounded'}
        style={[overlayAnimatedStyle, surface && { boxShadow: theme.shadows.sm }]}
      >
        <Styled.RevealRow width={innerWidth} surface={surface} style={revealAnimatedStyle}>
          {props.segments.map((segment) => (
            <Styled.SegmentItem key={segment.text}>
              <Styled.CustomText
                size={props.size ?? 'lg'}
                surface={surface}
                heavy={props.extraBoldLabels}
                extraBold={!surface}
                style={{ color: selectedText }}
              >
                {segment.text}
              </Styled.CustomText>
            </Styled.SegmentItem>
          ))}
        </Styled.RevealRow>
      </Styled.Pointer>
    </Container>
  );
};
