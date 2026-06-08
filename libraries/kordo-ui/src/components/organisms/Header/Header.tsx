import { useState } from 'react';
import { View } from 'react-native';
import { HeaderProps } from './Header.types';
import * as Styled from './Header.styles';
import { useEffect, useRef } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutChangeEvent } from 'react-native';

// Composant Header avec comportement "smart" : se masque au scroll vers le bas et réapparaît au scroll vers le haut
export const Header: React.FC<HeaderProps & { scrollY?: number }> = (props) => {
  // Récupère les marges de la zone sûre (encoche, barre de statut) pour positionner le header correctement
  const insets = useSafeAreaInsets();
  // Stocke la hauteur mesurée du header afin de calculer le décalage vertical pour le masquer entièrement
  const [height, setHeight] = useState(0);
  // Valeur partagée Reanimated pour piloter la translation verticale du header de manière performante sur le thread UI
  const translateY = useSharedValue(0);
  // Garde en mémoire la dernière position de scroll pour calculer le delta entre deux événements de scroll
  const lastY = useRef(0);

  // Seuil minimum de scroll vers le haut (px) avant de réafficher le header — évite les déclenchements intempestifs
  const UP_THRESHOLD = 80;
  // Seuil minimum de scroll vers le bas (px) avant de masquer le header — plus bas pour une réactivité rapide
  const DOWN_THRESHOLD = 30;
  // Position de scroll en dessous de laquelle le header est toujours visible (l'utilisateur est en haut de la page)
  const FORCE_SHOW_SCROLL = 100;

  // Réagit aux changements de position de scroll pour décider si le header doit être visible ou masqué
  useEffect(() => {
    if (props.scrollY === undefined || height === 0) return;

    // Calcule la différence de scroll depuis la dernière mise à jour pour déterminer la direction et l'amplitude
    const diffY = props.scrollY - lastY.current;

    // Logique de visibilité : forcer l'affichage en haut de page, masquer lors du scroll descendant, réafficher lors du scroll montant
    if (props.scrollY < FORCE_SHOW_SCROLL) {
      translateY.value = withTiming(0, { duration: 200 });
    } else if (diffY > 0 && diffY >= DOWN_THRESHOLD) {
      translateY.value = withTiming(-height, { duration: 200 });
    } else if (diffY < 0 && Math.abs(diffY) >= UP_THRESHOLD) {
      translateY.value = withTiming(0, { duration: 200 });
    }

    lastY.current = props.scrollY;
  }, [props.scrollY, height]);

  // Génère le style animé appliqué au header — relie la valeur partagée translateY à la propriété CSS transform
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const smartStyle = props.smart
    ? { position: 'absolute' as const, top: 0, left: 0, right: 0 }
    : undefined;

  return (
    <>
      {props.smart && <Styled.CustomSafeAreaView style={{ height: insets.top }} />}
      <Styled.Header
        style={[
          { paddingTop: insets.top },
          smartStyle,
          props.smart ? animatedStyle : undefined,
          props.style,
        ]}
        onLayout={(e: LayoutChangeEvent) => {
          setHeight(e.nativeEvent.layout.height);
          props.onLayout?.(e);
        }}
      >
        <Styled.Row>
          {props.left && <View>{props.left}</View>}
          {!props.centerChildren && (
            <Styled.ChildrenWrapper>{props.children}</Styled.ChildrenWrapper>
          )}
          {props.centerChildren && (
            <Styled.ChildrenGhost pointerEvents="none">{props.children}</Styled.ChildrenGhost>
          )}
          {props.right ?? null}
          {props.centerChildren && (
            <Styled.ChildrenOverlay pointerEvents="none">{props.children}</Styled.ChildrenOverlay>
          )}
        </Styled.Row>
      </Styled.Header>
    </>
  );
};
