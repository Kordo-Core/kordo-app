import { forwardRef, useImperativeHandle, useState } from 'react';
import { ShakeProps } from './Shake.types';

export type ShakeRef = {
  trigger: () => void;
};

export const Shake = forwardRef<ShakeRef, ShakeProps>(
  ({ children, amplitude = 10, duration = 50 }, ref) => {
    const [isShaking, setIsShaking] = useState(false);

    const trigger = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), duration * 5);
    };

    useImperativeHandle(ref, () => ({ trigger }));

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
