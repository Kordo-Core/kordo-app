import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { FadeProps } from './Fade.types';

export type FadeRef = {
  trigger: (type: 'in' | 'out') => void;
};

// Composant d'animation de fondu pour le web, utilise les transitions CSS pour opacité et translation
export const Fade = forwardRef<FadeRef, FadeProps>(
  ({ children, duration = 300, delay = 0, distance = 20, direction = 'up' }, ref) => {
    // Suit la phase d'animation en cours ('in', 'out' ou 'idle') pour déterminer le comportement de la transformation
    const [animState, setAnimState] = useState<'in' | 'out' | 'idle'>('idle');
    // Contrôle la visibilité effective de l'élément pour piloter l'opacité et la position CSS
    const [isVisible, setIsVisible] = useState(false);

    // Calcule la valeur CSS transform selon la direction, la distance et l'état de visibilité actuel
    const getTransform = () => {
      if (animState === 'idle') return 'none';

      const offset = isVisible ? 0 : distance;
      const sign = direction === 'down' || direction === 'right' ? -1 : 1;

      if (direction === 'up' || direction === 'down') {
        return `translateY(${sign * offset}px)`;
      }
      return `translateX(${sign * offset}px)`;
    };

    // Expose la fonction trigger au parent via la ref ; le setTimeout de 10ms permet au navigateur
    // d'appliquer d'abord l'état initial avant de lancer la transition CSS (nécessaire pour que le navigateur détecte le changement)
    useImperativeHandle(ref, () => ({
      trigger: (type: 'in' | 'out') => {
        setAnimState(type);
        setTimeout(() => {
          setIsVisible(type === 'in');
        }, 10);
      },
    }));

    return (
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: getTransform(),
          transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        }}
      >
        {children}
      </div>
    );
  },
);
