export interface VideoStoriesProps {
  /** Liste des vidéos à lire dans la visionneuse */
  videos: { id: string; url: string }[];
  /** Index de la vidéo affichée à l'ouverture */
  initialIndex?: number;
  /** Callback de fermeture (croix, tap au-delà de la dernière vidéo) */
  onClose: () => void;
}
