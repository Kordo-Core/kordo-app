import { ToastProps } from '../../atoms/Toast/Toast.types';

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastContextProps {
  addToast: (toast: Omit<ToastProps, 'id' | 'delete'>) => void;
}
