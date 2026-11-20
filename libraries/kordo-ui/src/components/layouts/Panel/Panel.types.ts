export interface PanelProps {
  /** Content rendered inside the panel */
  children: React.ReactNode;
  /** Title displayed in the panel header */
  title?: string;
  /** Controls whether the panel is open */
  isOpen?: boolean;
  /** Callback fired when the panel is closed (overlay click or close button) */
  onClose?: () => void;
  /** Fond du panneau : blanc (défaut) ou gris clair de l'écran (fiche d'un bloc, filtres) */
  tone?: 'surface' | 'background';
}
