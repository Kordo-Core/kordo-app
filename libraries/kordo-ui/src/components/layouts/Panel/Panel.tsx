import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDecay,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PanelProps } from './Panel.types';
import * as Styled from './Panel.styles';

// Distance (en px) de glissement vers le bas au-delà de la position ouverte qui déclenche la fermeture
const CLOSE_THRESHOLD = 200;
// Vélocité minimale (px/s) vers le bas pour fermer d'un coup ; élevée pour exiger un geste franc
const CLOSE_VELOCITY = 1200;
// Durée de l'animation de fermeture en millisecondes
const CLOSE_DURATION = 250;
// Fraction de l'écran visible à l'ouverture quand le contenu est plus grand que l'écran
const OPEN_RATIO = 0.75;

// Composant panneau coulissant (bottom sheet) : le bloc entier (handle + contenu) glisse pour révéler le contenu qui dépasse
export const Panel: React.FC<PanelProps> = ({ title, children, isOpen = false, onClose }) => {
  // Hauteur de la fenêtre, base de tous les calculs de position
  const { height } = useWindowDimensions();
  // Contrôle le montage/démontage pour éviter de rendre un panneau invisible
  const [visible, setVisible] = useState(isOpen);
  // Hauteur réelle du bloc une fois mesurée (handle + contenu), peut dépasser la hauteur de l'écran
  const [sheetHeight, setSheetHeight] = useState(0);
  // Empêche de rejouer l'animation d'entrée à chaque changement de mesure
  const didOpen = useRef(false);

  // Position du haut du bloc au repos : ancré en bas pour un petit contenu, sinon top à 25% pour montrer 75% de l'écran
  const restTop = Math.max(height * (1 - OPEN_RATIO), height - sheetHeight);
  // Position la plus haute atteignable : le bas du bloc aligné sur le bas de l'écran (révèle la fin du contenu)
  const topMin = height - sheetHeight;

  // Décalage vertical du haut du bloc (0 = collé en haut, height = entièrement hors écran en bas)
  const translateY = useSharedValue(height);
  // Position du bloc au début d'un geste, pour suivre le doigt de façon relative
  const startY = useSharedValue(height);
  // Opacité du fond sombre derrière le panneau
  const overlayOpacity = useSharedValue(0);

  // Synchronise l'ouverture externe : monte le composant à l'ouverture, anime la sortie puis démonte à la fermeture
  useEffect(() => {
    if (isOpen) {
      didOpen.current = false;
      // Réinitialise la mesure : l'animation d'entrée doit se baser sur la hauteur
      // du contenu courant, pas sur celle (périmée) de l'ouverture précédente
      setSheetHeight(0);
      setVisible(true);
    } else {
      translateY.value = withTiming(height, { duration: CLOSE_DURATION }, (finished) => {
        if (finished) runOnJS(setVisible)(false);
      });
      overlayOpacity.value = withTiming(0, { duration: CLOSE_DURATION });
    }
  }, [isOpen]);

  // Anime l'entrée une fois le bloc mesuré, pour partir vers la bonne position de repos (dépend de sheetHeight)
  useEffect(() => {
    if (visible && sheetHeight > 0 && !didOpen.current) {
      didOpen.current = true;
      translateY.value = withTiming(restTop, { duration: 300 });
      overlayOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [visible, sheetHeight, restTop]);

  // Mesure la hauteur du bloc pour calculer les bornes de glissement
  const handleLayout = (e: LayoutChangeEvent) => {
    setSheetHeight(e.nativeEvent.layout.height);
  };

  // Geste de glissement : déplace tout le bloc entre topMin (révèle la fin) et la fermeture
  const panGesture = Gesture.Pan()
    // Ne capture que les mouvements verticaux : s'active après 10px en Y, et abandonne dès
    // 15px en X pour laisser les scrolls horizontaux internes (Slider, carrousels) fonctionner.
    .activeOffsetY([-10, 10])
    .failOffsetX([-15, 15])
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      // Suit le doigt en bornant en haut à topMin et en bas à la sortie totale d'écran
      const next = startY.value + e.translationY;
      translateY.value = Math.min(Math.max(next, topMin), height);
      // Atténue l'overlay uniquement quand on descend sous la position de repos (vers la fermeture)
      overlayOpacity.value = interpolate(
        translateY.value,
        [restTop, height],
        [1, 0],
        Extrapolation.CLAMP,
      );
    })
    .onEnd((e) => {
      // La fermeture n'est possible que si le bloc est réellement descendu SOUS sa position de repos :
      // un glissement vers le haut (lecture du contenu) ne doit jamais fermer, même avec une vélocité résiduelle
      const draggedDown = translateY.value > restTop;
      // Ferme uniquement si descendu sous le repos ET assez bas, ou avec une vélocité franche vers le bas
      if (
        draggedDown &&
        (translateY.value > restTop + CLOSE_THRESHOLD || e.velocityY > CLOSE_VELOCITY)
      ) {
        translateY.value = withTiming(height, { duration: CLOSE_DURATION }, (finished) => {
          if (finished) {
            runOnJS(setVisible)(false);
            if (onClose) runOnJS(onClose)();
          }
        });
        overlayOpacity.value = withTiming(0, { duration: CLOSE_DURATION });
      } else if (draggedDown) {
        // Tiré vers le bas sans aller jusqu'à fermer : on revient à la position de repos
        translateY.value = withTiming(restTop, { duration: 200 });
        overlayOpacity.value = withTiming(1, { duration: 200 });
      } else {
        // Plage de lecture : on prolonge le geste par inertie (momentum) borné entre topMin et le repos, pour un scroll fluide
        translateY.value = withDecay({ velocity: e.velocityY, clamp: [topMin, restTop] });
      }
    });

  // Applique la translation verticale au bloc
  const panelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Applique l'opacité à l'overlay sombre
  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  // Ne rend rien si le panneau n'est pas visible
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
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onLayout={handleLayout}
          style={[{ position: 'absolute', top: 0, left: 0, right: 0 }, panelAnimatedStyle]}
        >
          <Styled.Sheet>
            <Styled.HandleArea>
              <Styled.Handle />
            </Styled.HandleArea>
            <Styled.Content>
              {title && <Styled.Title>{title}</Styled.Title>}
              {children}
            </Styled.Content>
          </Styled.Sheet>
        </Animated.View>
      </GestureDetector>
    </Styled.Container>
  );
};
