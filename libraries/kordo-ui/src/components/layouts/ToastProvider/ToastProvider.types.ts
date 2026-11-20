import { ToastProps } from '../../atoms/Toast/Toast.types';

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastContextProps {
  addToast: (toast: Omit<ToastProps, 'id' | 'delete'>) => void;
  /** Hauteur (px) à laisser libre sous les toasts, par ex. la barre de navigation ; null = marge par défaut */
  setBottomInset: (inset: number | null) => void;
}
