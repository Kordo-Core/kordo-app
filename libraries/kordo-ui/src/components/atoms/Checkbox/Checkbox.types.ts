import { ReactNode } from 'react';

export interface CheckboxProps {
  // État coché (contrôlé par le parent)
  checked: boolean;
  // Notifie le parent du nouvel état au clic
  onChange: (checked: boolean) => void;
  // Libellé optionnel rendu à gauche, la case s'aligne alors à droite
  label?: ReactNode;
  disabled?: boolean;
}
