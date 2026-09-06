export interface MessageComposerProps {
  value: string;
  onChange: (text: string) => void;
  /** Envoi du texte saisi. Le composer ne se vide pas lui-même : l'écran tient la saisie */
  onSend: () => void;
  /** Prise d'une photo avec l'appareil */
  onPressCamera: () => void;
  /** Choix d'une image ou d'une vidéo dans la galerie */
  onPressGallery: () => void;
}
