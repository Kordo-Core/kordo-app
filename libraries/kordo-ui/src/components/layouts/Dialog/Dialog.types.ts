export interface DialogProps {
  /** Contenu libre du dialogue : texte, boutons, formulaire… */
  children: React.ReactNode;
  /** Titre affiché en tête, au-dessus des children */
  title?: string;
  /** Contrôle l'ouverture */
  isOpen?: boolean;
  /** Fermeture demandée : clic sur le voile ou bouton retour Android */
  onClose?: () => void;
  /** Un clic sur le voile ferme le dialogue (défaut : true) */
  dismissOnOverlayPress?: boolean;
}
