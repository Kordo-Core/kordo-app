import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// Remplaçant du Modal de react-native-web pour Storybook.
//
// Celui de react-native-web se téléporte dans `document.body` avec `position: fixed` sur les
// quatre côtés : il recouvre donc toute la fenêtre du navigateur et sort du cadre téléphone,
// alors que sur mobile il ne couvre jamais plus que l'écran (visionneuse vidéo, panneaux).
//
// Ici on garde la téléportation — indispensable pour passer au-dessus de tout, et pour que les
// composants qui se positionnent en coordonnées de fenêtre (`measureInWindow`, `Dropdown`)
// restent justes — mais on borne la surface au cadre téléphone le plus proche, repéré par
// l'attribut `data-phone-frame` posé par les décorateurs. Hors cadre, on retombe sur la fenêtre.

const FRAME_SELECTOR = '[data-phone-frame]';

type Rect = { top: number; left: number; width: number; height: number };

const VIEWPORT: Rect = { top: 0, left: 0, width: 0, height: 0 };

type ModalProps = {
  visible?: boolean;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export const Modal: React.FC<ModalProps> = ({ visible = true, children }) => {
  // Ancre restée à la place d'origine dans l'arbre : elle sert à retrouver le cadre englobant.
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    if (!visible) return;

    const frame = anchorRef.current?.closest(FRAME_SELECTOR) as HTMLElement | null;

    const measure = () => {
      if (!frame) {
        setRect(VIEWPORT);
        return;
      }
      const box = frame.getBoundingClientRect();
      setRect({ top: box.top, left: box.left, width: box.width, height: box.height });
    };

    measure();
    // Le cadre bouge avec le défilement de la page et le redimensionnement de la fenêtre.
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [visible]);

  const anchor = React.createElement('span', {
    ref: anchorRef,
    style: { display: 'none' },
    'aria-hidden': true,
  });

  if (!visible || !rect) return anchor;

  const isViewport = rect === VIEWPORT;
  const overlay = React.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: isViewport ? '100%' : rect.width,
        height: isViewport ? '100%' : rect.height,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1000,
      },
    },
    children,
  );

  return React.createElement(
    React.Fragment,
    null,
    anchor,
    ReactDOM.createPortal(overlay, document.body),
  );
};
