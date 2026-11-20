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
  // Place réservée sous les toasts (barre de navigation affichée) ; null = marge par défaut
  const [bottomInset, setBottomInset] = React.useState<number | null>(null);

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
    <ToastContext.Provider value={{ addToast, setBottomInset }}>
      {children}
      <Styled.ToastContainer style={bottomInset !== null ? { bottom: bottomInset } : undefined}>
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

// Variante tolérante : renvoie undefined hors du ToastProvider (composants de kordo-ui affichés
// seuls, dans Storybook par exemple) au lieu de lever une erreur
export const useOptionalToast = () => React.useContext(ToastContext);

// Réserve une hauteur sous les toasts tant que le composant appelant est affiché (barre de
// navigation) : les toasts apparaissent au-dessus. null = rien à réserver.
export const useToastBottomInset = (inset: number | null) => {
  const context = React.useContext(ToastContext);
  const setBottomInset = context?.setBottomInset;
  React.useEffect(() => {
    if (!setBottomInset) return;
    setBottomInset(inset);
    return () => setBottomInset(null);
  }, [inset, setBottomInset]);
};
