import React, { useState } from 'react';
import { BounceProps } from './Bounce.types';

export const Bounce: React.FC<BounceProps> = (props) => {
  const { children, onPress, scaleTo = 0.95, duration = 200, style, disabled = false } = props;
  const [isPressed, setIsPressed] = useState(false);

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
