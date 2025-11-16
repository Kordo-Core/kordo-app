import { Toast } from '../../atoms/Toast/Toast';
import { ToastProps } from '../../atoms/Toast/Toast.types';
import React from 'react';
import { ToastContextProps, ToastProviderProps } from './ToastProvider.types';
import * as Styled from './ToastProvider.style';

const ToastContext = React.createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const deleteToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (toast: Omit<ToastProps, 'id' | 'delete'>) => {
    const id = Math.random().toString();
    const newToast: ToastProps = {
      ...toast,
      id,
      delete: () => deleteToast(id),
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => deleteToast(id), toast.duration + 200);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Styled.ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
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
