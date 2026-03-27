import { forwardRef, useImperativeHandle, useState } from 'react';
import { ShakeProps } from './Shake.types';

export type ShakeRef = {
  trigger: () => void;
};

// Composant d'animation de secousse pour le web, utilise des keyframes CSS injectés dynamiquement
export const Shake = forwardRef<ShakeRef, ShakeProps>(
  ({ children, amplitude = 10, duration = 50 }, ref) => {
    // Contrôle si l'animation de secousse est en cours pour appliquer ou retirer l'animation CSS
    const [isShaking, setIsShaking] = useState(false);

    // Lance la secousse en activant l'état, puis le désactive après la durée totale (5 étapes)
    // pour que l'animation CSS se joue une seule fois par déclenchement
    const trigger = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), duration * 5);
    };

    // Expose la fonction trigger au composant parent via la ref pour un déclenchement impératif
    useImperativeHandle(ref, () => ({ trigger }));

    // Définition dynamique des keyframes CSS avec l'amplitude configurée,
    // crée 5 étapes de translation horizontale alternée pour reproduire l'effet de secousse
    const keyframes = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-${amplitude}px); }
        40% { transform: translateX(${amplitude}px); }
        60% { transform: translateX(-${amplitude}px); }
        80% { transform: translateX(${amplitude}px); }
      }
    `;

    return (
      <>
        <style>{keyframes}</style>
        <div
          style={{
            width: '100%',
            animation: isShaking ? `shake ${duration * 5}ms ease-in-out` : 'none',
          }}
        >
          {children}
        </div>
      </>
    );
  },
);
