import { Toast } from '../../atoms/Toast/Toast';
import { ToastProps } from '../../atoms/Toast/Toast.types';
import React from 'react';
import { ToastContextProps, ToastProviderProps } from './ToastProvider.types';
import * as Styled from './ToastProvider.style';

const ToastContext = React.createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = (props) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration + 200);
  };

  const deleteToast = (id: string) => {
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 200);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {props.children}
      <Styled.ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            delete={() => {
              deleteToast(toast.id);
            }}
          />
        ))}
      </Styled.ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
