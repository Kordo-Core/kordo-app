import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { FadeProps } from './Fade.types';

export type FadeRef = {
  trigger: (type: 'in' | 'out') => void;
};

export const Fade = forwardRef<FadeRef, FadeProps>(
  ({ children, duration = 300, delay = 0, distance = 20, direction = 'up' }, ref) => {
    const [animState, setAnimState] = useState<'in' | 'out' | 'idle'>('idle');
    const [isVisible, setIsVisible] = useState(false);

    const getTransform = () => {
      if (animState === 'idle') return 'none';

      const offset = isVisible ? 0 : distance;
      const sign = direction === 'down' || direction === 'right' ? -1 : 1;

      if (direction === 'up' || direction === 'down') {
        return `translateY(${sign * offset}px)`;
      }
      return `translateX(${sign * offset}px)`;
    };

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
