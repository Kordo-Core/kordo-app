export interface BounceProps {
  children: React.ReactNode;
  scaleTo?: number; // échelle quand pressé
  duration?: number; // vitesse d’anim
  onPress?: () => void;
}
