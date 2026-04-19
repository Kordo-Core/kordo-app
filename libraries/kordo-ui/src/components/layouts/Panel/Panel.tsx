import React, { useEffect, useState } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PanelProps } from './Panel.types';
import * as Styled from './Panel.styles';

// Seuil en pixels au-delà duquel un glissement vers le bas déclenche la fermeture du panneau
const CLOSE_THRESHOLD = 150;
// Durée de l'animation de fermeture en millisecondes
const CLOSE_DURATION = 250;

// Composant panneau coulissant (bottom sheet)
export const Panel: React.FC<PanelProps> = ({ title, children, isOpen = false, onClose }) => {
  // Hauteur totale de la fenêtre, utilisée pour positionner le panneau hors-écran initialement et calculer le seuil de fermeture par glissement
  const { height } = useWindowDimensions();
  // Contrôle le montage/démontage du composant dans le DOM pour éviter de rendre un panneau invisible
  const [visible, setVisible] = useState(isOpen);

  // Valeur animée pour le décalage vertical du panneau (0 = ouvert, height = hors écran)
  const translateY = useSharedValue(height);
  // Valeur animée pour l'opacité du fond sombre derrière le panneau
  const overlayOpacity = useSharedValue(0);

  // Synchronise l'état d'ouverture externe avec la visibilité interne : monte le composant à l'ouverture, anime la fermeture puis démonte
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      translateY.value = withTiming(height, { duration: CLOSE_DURATION }, (finished) => {
        if (finished) runOnJS(setVisible)(false);
      });
      overlayOpacity.value = withTiming(0, { duration: CLOSE_DURATION });
    }
  }, [isOpen]);

  // Déclenche l'animation d'entrée une fois le composant monté, pour garantir que le panneau est dans le DOM avant d'animer
  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      overlayOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [visible]);

  // Geste de glissement vertical pour permettre à l'utilisateur de fermer le panneau en le tirant vers le bas
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Ne suit le doigt que vers le bas (translationY > 0) pour empêcher de glisser le panneau vers le haut
      if (e.translationY > 0) {
        translateY.value = e.translationY;
        // Réduit progressivement l'opacité de l'overlay proportionnellement au déplacement vers le bas
        overlayOpacity.value = interpolate(
          e.translationY,
          [0, height * 0.5],
          [1, 0],
          Extrapolation.CLAMP,
        );
      }
    })
    .onEnd((e) => {
      // Ferme le panneau si l'utilisateur a dépassé le seuil de distance ou la vélocité minimale
      if (e.translationY > CLOSE_THRESHOLD || e.velocityY > 800) {
        translateY.value = withTiming(height, { duration: CLOSE_DURATION }, (finished) => {
          if (finished) {
            runOnJS(setVisible)(false);
            if (onClose) runOnJS(onClose)();
          }
        });
        overlayOpacity.value = withTiming(0, { duration: CLOSE_DURATION });
      } else {
        // Le glissement n'est pas assez fort : on ramène le panneau à sa position ouverte
        translateY.value = withTiming(0, { duration: 200 });
        overlayOpacity.value = withTiming(1, { duration: 200 });
      }
    });

  // Style animé qui applique la translation verticale au panneau
  const panelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Style animé qui applique l'opacité à l'overlay sombre
  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  // Ne rend rien si le panneau n'est pas visible, pour éviter un rendu inutile
  if (!visible) return null;

  return (
    <Styled.Container>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          overlayAnimatedStyle,
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[{ position: 'absolute', bottom: 0, left: 0, right: 0 }, panelAnimatedStyle]}
      >
        <Styled.Sheet>
          <GestureDetector gesture={panGesture}>
            <Styled.HandleArea>
              <Styled.Handle />
            </Styled.HandleArea>
          </GestureDetector>
          <Styled.Panel>
            <Styled.Title>{title}</Styled.Title>
            {children}
          </Styled.Panel>
        </Styled.Sheet>
      </Animated.View>
    </Styled.Container>
  );
};
