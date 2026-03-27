import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PanelProps } from './Panel.types';
import * as Styled from './Panel.styles.web';

// Durée des transitions CSS d'ouverture et fermeture en millisecondes
const DURATION = 300;

// Composant panneau coulissant (bottom sheet) pour la plateforme web, rendu via un portail dans le body
export const Panel: React.FC<PanelProps> = ({ title, children, isOpen = false, onClose }) => {
  // Contrôle le montage/démontage du portail dans le DOM pour ne pas rendre un panneau invisible
  const [visible, setVisible] = useState(isOpen);
  // Déclenche la transition CSS d'ouverture (séparé de visible pour permettre l'animation en deux temps)
  const [open, setOpen] = useState(false);

  // Gère le cycle ouverture/fermeture : bloque le scroll du body à l'ouverture, attend la fin de la transition avant de démonter à la fermeture
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setOpen(false);
      document.body.style.overflow = '';
      // Attend la fin de l'animation de fermeture avant de retirer le composant du DOM
      const timer = setTimeout(() => setVisible(false), DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Déclenche l'animation d'entrée au prochain frame après le montage, pour que le navigateur applique d'abord l'état initial puis anime vers l'état ouvert
  useEffect(() => {
    if (visible && isOpen) {
      requestAnimationFrame(() => setOpen(true));
    }
  }, [visible, isOpen]);

  // Ne rend rien si le panneau n'est pas visible, pour éviter un portail vide dans le DOM
  if (!visible) return null;

  return createPortal(
    <Styled.Container>
      <Styled.Overlay isOpen={open} onClick={onClose} />
      <Styled.Sheet isOpen={open}>
        <Styled.PanelHeader>
          <Styled.Title>{title}</Styled.Title>
          <Styled.CloseButton onClick={onClose}>✕</Styled.CloseButton>
        </Styled.PanelHeader>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Sheet>
    </Styled.Container>,
    document.body,
  );
};
