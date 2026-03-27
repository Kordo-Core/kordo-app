import React, { useState } from 'react';
import { BounceProps } from './Bounce.types';

// Composant d'animation de rebond pour le web, utilise les transitions CSS pour simuler un enfoncement au clic
export const Bounce: React.FC<BounceProps> = (props) => {
  const { children, onPress, scaleTo = 0.95, duration = 200, style, disabled = false } = props;
  // Suit si le bouton de la souris est enfoncé pour appliquer la transformation d'échelle via CSS
  const [isPressed, setIsPressed] = useState(false);

  // Transmet le clic au callback parent uniquement si le composant n'est pas désactivé
  const handleClick = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <div
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      style={{
        ...style,
        transform: isPressed && !disabled ? `scale(${scaleTo})` : 'scale(1)',
        transition: `transform ${duration}ms ease-out`,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {children}
    </div>
  );
};
