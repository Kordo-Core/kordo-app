import React, { useState } from 'react';
import { BounceProps } from './Bounce.types';

export const Bounce: React.FC<BounceProps> = (props) => {
  const { children, onPress, scaleTo = 0.95, duration = 200, style } = props;
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onPress}
      style={{
        ...style,
        transform: isPressed ? `scale(${scaleTo})` : 'scale(1)',
        transition: `transform ${duration}ms ease-out`,
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
};
