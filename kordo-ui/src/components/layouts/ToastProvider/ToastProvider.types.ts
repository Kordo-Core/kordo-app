import { ToastProps } from 'components/atoms/Toast/Toast.types';

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastContextProps {
  showToast: (toast: Omit<ToastProps, 'id'>) => void;
}
