import { useState, useEffect, useRef } from 'react';
import { ListRow } from '../../layouts/ListRow/ListRow';
import { HeaderProps } from './Header.types';
import * as Styled from './Header.styles';

// Composant Header web avec comportement "smart" : se masque au scroll descendant et réapparaît au scroll montant
export const Header: React.FC<HeaderProps> = (props) => {
  // Stocke la hauteur mesurée du header pour calculer le décalage de translation nécessaire à le masquer entièrement
  const [height, setHeight] = useState(0);
  // Contrôle la position verticale du header — 0 = visible, -height = masqué hors écran
  const [translateY, setTranslateY] = useState(0);
  // Mémorise la dernière position de scroll pour calculer le delta directionnel entre deux événements
  const lastY = useRef(0);
  // Référence DOM du header pour mesurer sa hauteur réelle après le montage
  const headerRef = useRef<HTMLElement>(null);

  // Seuil minimum de scroll vers le haut (px) avant de réafficher le header — évite les micro-scrolls parasites
  const UP_THRESHOLD = 80;
  // Seuil minimum de scroll vers le bas (px) avant de masquer le header — sensibilité plus élevée pour un masquage rapide
  const DOWN_THRESHOLD = 30;
  // Position de scroll en dessous de laquelle le header reste toujours affiché (utilisateur proche du haut de page)
  const FORCE_SHOW_SCROLL = 100;

  // Mesure la hauteur du header au montage initial pour pouvoir calculer la valeur de translation
  useEffect(() => {
    if (headerRef.current) {
      setHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Réagit à chaque changement de position de scroll pour décider si le header doit être visible ou masqué
  useEffect(() => {
    if (!props.smart || props.scrollY === undefined || height === 0) return;

    // Calcule le delta de scroll depuis la dernière mise à jour pour déterminer direction et amplitude
    const diffY = props.scrollY - lastY.current;

    // Logique de visibilité : forcer l'affichage en haut de page, masquer au scroll descendant, réafficher au scroll montant
    if (props.scrollY < FORCE_SHOW_SCROLL) {
      setTranslateY(0);
    } else if (diffY > 0 && diffY >= DOWN_THRESHOLD) {
      setTranslateY(-height);
    } else if (diffY < 0 && Math.abs(diffY) >= UP_THRESHOLD) {
      setTranslateY(0);
    }

    lastY.current = props.scrollY;
  }, [props.scrollY, props.smart, height]);

  return (
    <Styled.Header
      ref={headerRef}
      style={
        props.smart
          ? {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transform: `translateY(${translateY}px)`,
              transition: 'transform 200ms ease',
            }
          : undefined
      }
    >
      <ListRow {...props} />
    </Styled.Header>
  );
};
