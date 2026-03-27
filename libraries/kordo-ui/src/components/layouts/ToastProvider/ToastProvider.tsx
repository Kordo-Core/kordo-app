import { Toast } from '../../atoms/Toast/Toast';
import { ToastProps } from '../../atoms/Toast/Toast.types';
import React from 'react';
import { ToastContextProps, ToastProviderProps } from './ToastProvider.types';
import * as Styled from './ToastProvider.styles';

// Contexte React qui permet aux composants enfants d'accéder à la fonction d'ajout de toast via le hook useToast()
const ToastContext = React.createContext<ToastContextProps | undefined>(undefined);

// Fournisseur global qui gère la file de toasts et les affiche par-dessus le contenu de l'application
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  // Stocke la liste des toasts actuellement affichés à l'écran
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  // Supprime un toast de la liste par son identifiant unique, utilisé à la fois pour la suppression manuelle et automatique
  const deleteToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Crée un nouveau toast avec un identifiant unique et programme sa suppression automatique après expiration
  const addToast = (toast: Omit<ToastProps, 'id' | 'delete'>) => {
    const id = Math.random().toString();
    const newToast: ToastProps = {
      ...toast,
      id,
      delete: () => deleteToast(id),
    };

    setToasts((prev) => [...prev, newToast]);

    // Supprime automatiquement le toast après sa durée d'affichage plus un délai tampon pour laisser l'animation de sortie se terminer
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

// Hook personnalisé qui donne accès au contexte des toasts ; lève une erreur si utilisé en dehors du ToastProvider
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
