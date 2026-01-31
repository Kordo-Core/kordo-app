export interface BounceProps {
  children: React.ReactNode;
  /** Échelle quand pressé (0.8 - 1) */
  scaleTo?: number;
  /** Durée de l'animation en ms */
  duration?: number;
  /** Callback au clic */
  onPress?: () => void;
  /** Styles personnalisés */
  style?: any;
  /** Désactive l'interaction */
  disabled?: boolean;
}
